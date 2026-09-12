// Run against an existing Chromium CDP session. Playwright is a QA-only dependency.
// node scripts/verify-podcast.mjs <cdp-url> [site-url] [artifact-directory]
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.argv[3] || "http://127.0.0.1:5174";
const out = resolve(process.argv[4] || "artifacts/podcast");
await mkdir(out, { recursive: true });
const browser = await chromium.connectOverCDP(process.argv[2]);
const page = await browser.contexts()[0].newPage();
const errors = [];
const existingMusicAssetFailures = new Set();
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() !== "error") return;
  const url = message.location().url;
  // These unchanged Lovable asset-proxy URLs are unavailable in a plain local clone.
  if (url.includes("/__l5e/assets-v1/") && message.text().includes("404")) {
    existingMusicAssetFailures.add(url);
  } else errors.push(message.text());
});
const report = { site: base, layouts: [], motion: {}, audio: {}, navigation: {}, errors };
const sections = ["pillars", "signal", "redline", "log", "pride"];
const go = async (path = "/podcast") => {
  await page.goto(`${base}${path}`);
  await page.locator("h1").waitFor();
  if (path === "/podcast") {
    await page.waitForFunction(() => document.querySelector("[data-scene][style]"));
  }
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(500);
};
const scrollToSection = async (id) => {
  await page
    .locator(`#podcast-${id}`)
    .evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "start" }));
  await page.waitForTimeout(id === "redline" ? 2400 : 500);
};
const metadata = async () =>
  page.evaluate(() => ({
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    series: [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((el) => JSON.parse(el.textContent))
      .find((data) => data["@type"] === "PodcastSeries"),
  }));

try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
    ["small-mobile", 320, 740],
    ["tablet", 768, 1024],
  ]) {
    await page.setViewportSize({ width, height });
    await go();
    assert.equal(await page.locator("main").count(), 1, "One shared main landmark");
    assert.equal(await page.locator("header").count(), 1, "One shared header");
    assert.equal(await page.locator("footer").count(), 1, "One shared footer");
    const sizes = await page.evaluate(() => ({
      available: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    assert(sizes.document <= sizes.available, `${name}: document overflow`);
    assert(sizes.body <= sizes.available, `${name}: body overflow`);
    const clipped = await page
      .locator(".ld-page h1,.ld-page h2,.ld-page h3")
      .evaluateAll((items) =>
        items.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent),
      );
    assert.deepEqual(clipped, [], `${name}: headings fit`);
    const images = await page.locator(".ld-page img").evaluateAll(async (items) =>
      Promise.all(
        items.map(async (img) => {
          img.loading = "eager";
          await img.decode();
          return img.naturalWidth > 0;
        }),
      ),
    );
    assert(images.every(Boolean), `${name}: artwork loads`);
    const loadedFonts = await page.evaluate(() => [
      document.fonts.check('600 32px "Den Cinzel"'),
      document.fonts.check('400 17px "Den Barlow"'),
      document.fonts.check('700 16px "Den Barlow Condensed"'),
    ]);
    assert(loadedFonts.every(Boolean), "Local fonts load");
    assert.equal(await page.locator(".ld-transmission-list > li").count(), 3);
    assert.equal(await page.locator(".ld-chapters").isVisible(), width >= 1024);
    if (width < 1024) {
      const mobileNav = page.getByRole("navigation", { name: "Primary", exact: true });
      assert(await mobileNav.isVisible());
      const unobstructed = await mobileNav.locator("a").evaluateAll((links) =>
        links.every((link) => {
          const rect = link.getBoundingClientRect();
          return link.contains(
            document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2),
          );
        }),
      );
      assert(unobstructed, "Mobile navigation remains on top and clickable");
      const padding = await page
        .locator(".app-shell-pad")
        .evaluate((el) => parseFloat(getComputedStyle(el).paddingBottom));
      assert(
        padding + 2 >= (await mobileNav.boundingBox()).height,
        "Bottom navigation clearance, allowing the existing border and subpixel line box",
      );
    }
    report.layouts.push({ name, width, height, ...sizes, headingsFit: true, artworkLoaded: true });
    if (name === "desktop" || name === "mobile") {
      await page.screenshot({ path: `${out}/${name}-hero.png` });
      for (const section of sections) {
        await scrollToSection(section);
        await page.screenshot({ path: `${out}/${name}-${section}.png` });
      }
      await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await go();
  const initialMeta = await metadata();
  assert.equal(initialMeta.title, "The Lion’s Den Podcast | Klondike Kat");
  assert.equal(initialMeta.canonical, "https://klondikekat.lovable.app/podcast");
  assert.equal(initialMeta.series.author.name, "Klondike Kat");
  await scrollToSection("redline");
  const motionState = () =>
    page.locator("#podcast-redline").evaluate((scene) => ({
      wheels: getComputedStyle(scene.querySelector(".ld-wheel-spokes")).transform,
      needle: getComputedStyle(scene.querySelector(".ld-tach-needle")).transform,
      car: getComputedStyle(scene.querySelector(".ld-muscle-car")).transform,
      smoke: getComputedStyle(scene.querySelector(".ld-tire-smoke")).opacity,
    }));
  const before = await motionState();
  await page.evaluate(() => scrollBy({ top: 230, behavior: "instant" }));
  await page.waitForTimeout(180);
  const after = await motionState();
  assert.notEqual(before.wheels, after.wheels, "Wheels respond to scroll");
  assert.notEqual(before.needle, after.needle, "Tachometer responds to scroll");
  assert.notEqual(before.smoke, after.smoke, "Smoke responds to scroll");
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".ld-car-headlight")).opacity === "1" &&
      getComputedStyle(document.querySelector(".ld-tree-row-3 .ld-tree-bulb")).opacity === "1",
  );
  assert.equal(
    await page
      .locator(".ld-car-headlight")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  assert.equal(
    await page
      .locator(".ld-tree-row-3 .ld-tree-bulb")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  report.motion = { wheels: true, tachometer: true, smoke: true, headlights: true, dragTree: true };

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(100);
  const stillBefore = await motionState();
  await page.evaluate(() => scrollBy({ top: 100, behavior: "instant" }));
  await page.waitForTimeout(100);
  assert.deepEqual(await motionState(), stillBefore, "Reduced motion freezes the entire car scene");
  assert.equal(stillBefore.wheels, "none");
  assert.equal(
    await page
      .locator(".ld-page")
      .evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((animation) => animation.playState === "running").length,
      ),
    0,
  );
  report.motion.reducedMotionStatic = true;
  await page.screenshot({ path: `${out}/reduced-motion.png` });

  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.locator(".ld-hero-actions .ld-button").click();
  await page.waitForURL("**#podcast-signal");
  assert(
    (await page.locator("#podcast-signal").boundingBox()).y >= 64,
    "Anchor clears sticky header",
  );
  await page.locator('.ld-chapters a[href="#podcast-redline"]').click();
  await page.waitForURL("**#podcast-redline");
  await page.locator('.ld-chapters a[href="#podcast-redline"][aria-current="location"]').waitFor();
  await go();
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement.textContent), "Skip to content");
  await page.keyboard.press("Enter");
  assert(page.url().endsWith("#main"));
  report.navigation = {
    heroCTA: true,
    chapters: true,
    skipLink: true,
    sharedShell: true,
    mobileClearance: true,
  };

  await scrollToSection("signal");
  await page.waitForFunction(() => document.querySelector("audio")?.readyState >= 1);
  assert.equal(await page.locator("audio").getAttribute("src"), "/audio/lions-den-preview.mp3");
  assert.equal(await page.locator("#ld-audio-progress").getAttribute("max"), "60");
  await page.getByRole("button", { name: "Play music preview", exact: true }).click();
  await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
  await page.getByRole("button", { name: "Pause music preview", exact: true }).click();
  assert(await page.locator("audio").evaluate((el) => el.paused));
  await page.locator("#ld-volume").fill("0.35");
  assert.equal(await page.locator("audio").evaluate((el) => el.volume), 0.35);
  await page.locator("#ld-audio-progress").fill("25");
  assert(Math.abs((await page.locator("audio").evaluate((el) => el.currentTime)) - 25) < 0.2);
  await page.locator("#ld-audio-progress").fill("59.7");
  await page.getByRole("button", { name: "Play music preview", exact: true }).click();
  await page.waitForFunction(
    () =>
      document.querySelector("audio").paused &&
      document.querySelector("audio").currentTime >= 59.99,
  );
  assert.equal(await page.locator("audio").evaluate((el) => el.currentTime), 60);
  await page.getByRole("button", { name: "Replay music preview", exact: true }).focus();
  await page.keyboard.press("Space");
  await page.waitForFunction(
    () =>
      !document.querySelector("audio").paused && document.querySelector("audio").currentTime < 1,
  );
  const audioHandle = await page.locator("audio").elementHandle();
  await page.locator(".ld-pride-content .ld-button").click();
  await page.waitForURL(`${base}/music`);
  await page.locator(".ld-page").waitFor({ state: "detached" });
  assert(await audioHandle.evaluate((el) => el.paused), "Route departure stops audio");
  report.audio = {
    originalSource: true,
    playPause: true,
    seek: true,
    volume: true,
    sixtySecondCap: true,
    keyboardReplay: true,
    pausesOnRouteDeparture: true,
  };
  const sharedStyles = () =>
    page.evaluate(() =>
      ["body", "header", "footer", "main h1"].map((selector) => {
        const style = getComputedStyle(document.querySelector(selector));
        return [
          selector,
          style.color,
          style.backgroundColor,
          style.fontFamily,
          style.fontSize,
          style.padding,
        ];
      }),
    );
  await page.evaluate(() => document.fonts.ready);
  const musicAfter = await sharedStyles();
  await go("/music");
  assert.deepEqual(
    await sharedStyles(),
    musicAfter,
    "Podcast styles do not affect the music route",
  );
  await page.locator('header a[href="/podcast"]').click();
  await page.waitForURL(`${base}/podcast`);
  await page.locator(".ld-page").waitFor();
  assert.deepEqual(await metadata(), initialMeta, "Metadata survives client navigation");
  report.navigation.musicRoute = true;
  report.navigation.metadataPreserved = true;
  report.navigation.stylesScoped = true;
  assert.equal(errors.length, 0, errors.join("\n"));
  report.existingMusicAssetFailures = [...existingMusicAssetFailures];

  // Deliberately failed media request: verify recovery UI separately from clean console checks.
  await page.locator("audio").evaluate((el) => {
    el.src = "/missing-qa-audio.mp3";
    el.load();
  });
  await page.getByRole("status").filter({ hasText: "unavailable" }).waitFor();
  assert(await page.getByRole("button", { name: "Play music preview", exact: true }).isDisabled());
  report.audio.unavailableSourceHandled = true;
  report.intentionalMediaError = errors.splice(0);
  await writeFile(`${out}/qa-report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await page.close();
  await browser.close();
}
