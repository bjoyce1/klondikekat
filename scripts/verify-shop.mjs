// QA only. Usage: node scripts/verify-shop.mjs <CDP URL> [base URL] [output directory]
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const catalog = JSON.parse(
  execFileSync(
    process.env.BUN_EXE || "bun",
    [
      "-e",
      'import { products, productAliases, diamondDre, productCategories } from "./src/lib/site-data"; console.log(JSON.stringify({products, productAliases, diamondDre, productCategories}));',
    ],
    { encoding: "utf8" },
  ),
);
const { products, productAliases, diamondDre, productCategories } = catalog;
const price = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
const base = process.argv[3] || "http://127.0.0.1:5174";
const out = resolve(process.argv[4] || "../artifacts/shop");
await mkdir(out, { recursive: true });
const browser = await chromium.connectOverCDP(process.argv[2]);
const context = browser.contexts()[0];
const page = await context.newPage();
const errors = [];
let expected404 = false;
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error" && !(expected404 && message.text().includes("404")))
    errors.push(message.text());
});
// The built local Cloudflare worker lacks Lovable's catalog asset proxy.
if (process.env.SHOP_QA_REMOTE_ASSETS === "1")
  await page.route("**/__l5e/assets-v1/**", async (route) => {
    const response = await route.fetch({
      url: "https://klondikekat.lovable.app" + new URL(route.request().url()).pathname,
    });
    await route.fulfill({ response });
  });
const report = { base, layouts: [], products: [], filters: [], aliases: [], external: [], errors };
const go = async (path = "/shop", selector = ".shop-store[style]") => {
  const response = await page.goto(base + path);
  await page.locator(selector).waitFor({ state: "attached" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(250);
  return response;
};
const decode = async () =>
  page.locator(".shop-shell img").evaluateAll(async (images) =>
    Promise.all(
      images.map(async (img) => {
        img.loading = "eager";
        await img.decode();
        return { alt: img.alt, width: img.naturalWidth, height: img.naturalHeight };
      }),
    ),
  );
const move = async (selector) => {
  await page
    .locator(selector)
    .evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(550);
};
const screenshot = async (name) => page.screenshot({ path: resolve(out, name + ".png") });
const layout = async () => {
  const result = await page.evaluate(() => ({
    viewport: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    clipped: [...document.querySelectorAll(".shop-shell h1,.shop-shell h2,.shop-shell h3")]
      .filter((el) => el.scrollWidth > el.clientWidth + 1)
      .map((el) => el.textContent),
    loadedImages: [...document.querySelectorAll(".shop-shell img")].every(
      (img) => img.complete && img.naturalWidth > 0,
    ),
    fit: [...document.querySelectorAll(".shop-shell img")].every(
      (img) => getComputedStyle(img).objectFit === "contain",
    ),
  }));
  assert(result.documentWidth <= result.viewport, "No page overflow");
  assert.deepEqual(result.clipped, [], "Headings fit");
  assert(result.loadedImages, "Images decode");
  assert(result.fit, "Images preserve their proportions");
  return result;
};
const checkBar = async (width) => {
  const bar = page.locator(".shop-buy-bar");
  if (width >= 1024) {
    assert(!(await bar.isVisible()));
    return null;
  }
  const rect = await bar.boundingBox();
  const nav = page.getByRole("navigation", { name: "Primary", exact: true });
  const navRect = await nav.boundingBox();
  assert(rect && navRect && rect.y + rect.height < navRect.y, "Buy bar clears bottom navigation");
  assert(rect.x >= 0 && rect.x + rect.width <= width, "Buy bar stays inside viewport");
  assert(rect.height < 160, "Buy bar remains compact");
  const button = await bar.locator("a").boundingBox();
  assert(button.height >= 44, "Checkout touch target");
  assert(
    await nav.locator("a").evaluateAll((links) =>
      links.every((link) => {
        const rect = link.getBoundingClientRect();
        return link.contains(
          document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2),
        );
      }),
    ),
    "Bottom navigation remains clickable",
  );
  return rect;
};
const externalLinks = async (selector) =>
  page
    .locator(selector)
    .evaluateAll((links) => links.map((a) => ({ url: a.href, target: a.target, rel: a.rel })));
const assertExternal = (links, expected) => {
  assert(links.length > 0, "Checkout exists");
  assert(
    links.every(
      (link) =>
        link.url === expected &&
        link.target === "_blank" &&
        link.rel.includes("noopener") &&
        link.rel.includes("noreferrer"),
    ),
    "Unchanged checkout URL and external-link attributes",
  );
};
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["desktop-1280", 1280, 900],
    ["mobile", 390, 844],
    ["small-mobile", 320, 740],
    ["tablet", 768, 1024],
    ["wide-tablet", 1000, 900],
  ]) {
    await page.setViewportSize({ width, height });
    await go();
    await decode();
    const measurements = await layout();
    assert.equal(
      await page.locator(".shop-catalog [data-product-handle]").count(),
      products.length,
    );
    assert.equal(await page.locator("main").count(), 1);
    assert.equal(await page.locator("header").count(), 1);
    assert.equal(await page.locator("footer").count(), 1);
    await screenshot(name + "-hero");
    for (const category of ["albums", "merch", "tickets", "production"]) {
      await move(".shop-collection-" + category);
      await screenshot(name + "-" + category);
    }
    report.layouts.push({ name, width, height, ...measurements });
    // A purchase bar must work at all phone and tablet breakpoints.
    await go("/shop/signature-hoodie", ".shop-detail[style]");
    await decode();
    await layout();
    const bar = await checkBar(width);
    await screenshot(name + "-hoodie");
    await move(".shop-purchase-panel");
    await screenshot(name + "-options");
    report.layouts.at(-1).buyBar = bar;
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await go();
  assert.equal(await page.title(), "Shop — Music, Merch & Tickets | Klondike Kat");
  for (const category of productCategories) {
    const label = category === "All" ? "ALL GOODS" : category.toUpperCase();
    await page
      .locator(".shop-collection-controls button")
      .filter({ has: page.locator("span", { hasText: new RegExp("^" + label + "$") }) })
      .click();
    const expected =
      category === "All" ? products : products.filter((product) => product.category === category);
    await page.waitForFunction(
      (count) => document.querySelectorAll(".shop-catalog [data-product-handle]").length === count,
      expected.length,
    );
    assert.deepEqual(
      await page
        .locator(".shop-catalog [data-product-handle]")
        .evaluateAll((items) => items.map((item) => item.dataset.productHandle)),
      expected.map((product) => product.handle),
    );
    assert.equal(
      await page.locator(".shop-collection-controls button[aria-pressed=true] small").textContent(),
      String(expected.length).padStart(2, "0"),
    );
    assert.equal(
      new URL(page.url()).searchParams.get("category"),
      category === "All" ? null : category,
    );
    report.filters.push({ category, count: expected.length });
  }
  await page.goBack();
  await page.waitForFunction(
    () =>
      document.querySelector(".shop-collection-controls button[aria-pressed=true] span")
        ?.textContent === "TICKETS",
  );
  await page.goForward();
  await page.waitForFunction(
    () =>
      document.querySelector(".shop-collection-controls button[aria-pressed=true] span")
        ?.textContent === "PRODUCTION",
  );
  await go("/shop?category=Merch");
  assert.equal(await page.locator(".shop-catalog [data-product-handle]").count(), 3);
  await go("/shop?category=invalid");
  assert.equal(await page.locator(".shop-catalog [data-product-handle]").count(), products.length);
  for (const product of products) {
    await go();
    await page.locator(".shop-catalog [data-product-handle='" + product.handle + "'] a").click();
    await page.waitForURL("**/shop/" + product.handle);
    await page.locator(".shop-detail[style]").waitFor({ state: "attached" });
    assert.equal(await page.locator("#shop-product-title").textContent(), product.title);
    assert.equal(
      await page.title(),
      product.title + " — " + price(product.price) + " | Klondike Kat",
    );
    await decode();
    await layout();
    const expectedRelated = products
      .filter((item) => item.category === product.category && item.handle !== product.handle)
      .slice(0, 4);
    assert.deepEqual(
      await page
        .locator(".shop-related [data-product-handle]")
        .evaluateAll((items) => items.map((item) => item.dataset.productHandle)),
      expectedRelated.map((item) => item.handle),
    );
    if (product.handle !== diamondDre.handle) {
      assertExternal(
        await externalLinks(
          ".shop-purchase-panel>a[target='_blank'],.shop-buy-bar>a[target='_blank']",
        ),
        product.externalUrl,
      );
      assert.equal(
        await page.locator(".shop-purchase-panel>.shop-price strong").textContent(),
        price(product.price),
      );
      if (product.options) {
        assert.deepEqual(
          await page.locator(".shop-size-options button").allTextContents(),
          product.options.values,
        );
        await page.getByRole("button", { name: "XL", exact: true }).click();
        assert.equal(
          await page.getByRole("button", { name: "XL", exact: true }).getAttribute("aria-pressed"),
          "true",
        );
        await page.getByRole("button", { name: "M", exact: true }).focus();
        await page.keyboard.press("Enter");
        assert.equal(
          await page.getByRole("button", { name: "M", exact: true }).getAttribute("aria-pressed"),
          "true",
        );
        assert.match(
          await page.locator("#shop-size-note").innerText(),
          /Select your final size again/,
        );
        assertExternal(
          await externalLinks(".shop-purchase-panel>a[target='_blank']"),
          product.externalUrl,
        );
      }
    }
    if (
      [
        "the-lyrical-lion-cd",
        "signature-hoodie",
        "concert-ticket",
        "beats-for-days",
        "diamond-dre",
      ].includes(product.handle)
    )
      await screenshot("detail-" + product.handle);
    report.products.push({
      handle: product.handle,
      related: expectedRelated.length,
      price: product.price,
      url: product.externalUrl,
    });
  }
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await go("/shop/diamond-dre", ".shop-detail[style]");
    await decode();
    await layout();
    await checkBar(width);
    assertExternal(
      await externalLinks(".shop-format-checkout a,.shop-buy-bar>a"),
      diamondDre.cdUrl,
    );
    assert.equal(
      await page.locator(".shop-dre-formats button[aria-pressed=true] s").textContent(),
      price(diamondDre.cdCompareAt),
    );
    await page.locator(".shop-dre-formats button").nth(1).click();
    assertExternal(
      await externalLinks(".shop-format-checkout a,.shop-buy-bar>a"),
      diamondDre.albumUrl,
    );
    await page.locator(".shop-dre-formats button").nth(2).click();
    assert.equal(
      await page.locator(".shop-format-checkout a").getAttribute("href"),
      "#shop-tracklist",
    );
    assert.equal(await page.locator(".shop-dre-tracks li").count(), diamondDre.tracks.length);
    const songLinks = await externalLinks(".shop-song-buy");
    assert.deepEqual(
      songLinks.map((link) => link.url),
      diamondDre.tracks.map((track) => track.externalUrl),
    );
    assert(songLinks.every((link) => link.target === "_blank" && link.rel.includes("noopener")));
    assert.equal(
      await page.locator(".shop-track-play").count(),
      diamondDre.tracks.filter((track) => track.audioUrl).length,
    );
    await screenshot(name + "-diamond");
    await page.locator(".shop-format-checkout a").click();
    await page.waitForTimeout(400);
    await screenshot(name + "-tracks");
    await page.locator(".shop-dre-formats button").first().click();
    await move(".shop-purchase-panel");
    await screenshot(name + "-formats");
  }
  for (const alias of Object.keys(productAliases)) {
    await go("/shop/" + alias, ".shop-detail[style]");
    assert.equal(new URL(page.url()).pathname, "/shop/" + diamondDre.handle);
    report.aliases.push(alias);
  }
  expected404 = true;
  for (const handle of ["not-a-real-product", "toString", "constructor"]) {
    const response = await go("/shop/" + handle, ".shop-not-found");
    assert.equal(response.status(), 404);
    assert.equal(await page.locator(".shop-not-found h1").textContent(), "ITEM NOT FOUND.");
    assert.equal(await page.locator("meta[name=robots]").getAttribute("content"), "noindex");
  }
  await screenshot("item-not-found");
  expected404 = false;
  await page.emulateMedia({ reducedMotion: "reduce" });
  await go();
  const transform = await page
    .locator(".shop-hero-feature")
    .evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => scrollTo({ top: 300, behavior: "instant" }));
  await page.waitForTimeout(100);
  assert.equal(
    await page.locator(".shop-hero-feature").evaluate((el) => getComputedStyle(el).transform),
    transform,
  );
  assert(
    await page
      .locator(".shop-shell *")
      .evaluateAll((items) => items.every((el) => getComputedStyle(el).animationName === "none")),
  );
  report.reducedMotion = true;
  assert.deepEqual(errors, [], "No Shop runtime, hydration, or unexpected console errors");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  // Regression: shared artist pages retain their separate visual systems.
  await page.goto(base + "/music");
  await page.locator(".mv-page").waitFor();
  assert.equal(await page.locator(".shop-shell").count(), 0);
  await page.goto(base + "/");
  await page.locator("main").waitFor();
  assert.equal(await page.locator(".shop-shell").count(), 0);
  assert((await page.locator(".card-elevated").count()) > 0);
  assert.deepEqual(errors, [], "No runtime, hydration, or unexpected console errors");
  report.passed = true;
  // Read-only checks of the unchanged external product pages. Never submit an order.
  if (process.env.SHOP_QA_CHECK_EXTERNAL === "1") {
    const urls = [
      ...new Set([
        ...products.map((product) => product.externalUrl),
        diamondDre.cdUrl,
        ...diamondDre.tracks.map((track) => track.externalUrl),
      ]),
    ];
    for (let index = 0; index < urls.length; index += 4)
      report.external.push(
        ...(await Promise.all(
          urls.slice(index, index + 4).map(async (url) => {
            try {
              const response = await context.request.get(url, { timeout: 20000 });
              const html = await response.text();
              return {
                url,
                status: response.status(),
                finalUrl: response.url(),
                title: html.match(/<title[^>]*>(.*?)<\/title>/is)?.[1],
              };
            } catch (error) {
              return { url, error: error.message };
            }
          }),
        )),
      );
  }
} finally {
  await writeFile(resolve(out, "verification.json"), JSON.stringify(report, null, 2));
  await page.close();
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
