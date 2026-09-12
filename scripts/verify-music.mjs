// QA only: PLAYWRIGHT_MODULE points to an installed Playwright runtime.
// node scripts/verify-music.mjs <CDP URL> [site URL] [artifact directory]
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.argv[3] || "http://127.0.0.1:5174";
const out = resolve(process.argv[4] || "artifacts/music");
await mkdir(out, { recursive: true });
const browser = await chromium.connectOverCDP(process.argv[2]);
const page = await browser.contexts()[0].newPage();
const errors = [];
let intentionalMediaFailure = false;
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error" && !intentionalMediaFailure) errors.push(message.text());
});
// Cloudflare's local worker does not have Lovable's asset proxy. This opt-in
// routes only the test browser's asset requests to their original host.
if (process.env.MUSIC_QA_REMOTE_ASSETS === "1") {
  await page.route("**/__l5e/assets-v1/**", async (route) => {
    const response = await route.fetch({
      url: "https://klondikekat.lovable.app" + new URL(route.request().url()).pathname,
    });
    await route.fulfill({ response });
  });
}
const report = { site: base, layouts: [], audio: {}, links: {}, errors };
const go = async () => {
  await page.goto(base + "/music");
  await page.locator(".mv-year-rail[style]").waitFor({ state: "attached" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(350);
};
const move = async (selector) => {
  await page
    .locator(selector)
    .evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(750);
};
const shot = async (name) => page.screenshot({ path: resolve(out, name + ".png") });
const waitPlaying = async () =>
  page.waitForFunction(
    () => {
      const audio = document.querySelector(".mv-page audio");
      return (
        audio &&
        !audio.paused &&
        audio.currentTime > 0 &&
        document.querySelector(".mv-dock.is-playing")
      );
    },
    null,
    { timeout: 20000 },
  );
const closePlayer = async () => {
  await page.getByRole("button", { name: "Close preview player" }).click();
  assert.equal(await page.locator(".mv-dock").count(), 0);
  assert(
    await page.locator("audio").evaluate((audio) => audio.paused && !audio.getAttribute("src")),
  );
};
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
    ["small-mobile", 320, 740],
    ["tablet", 768, 1024],
    ["wide-tablet", 1000, 900],
  ]) {
    await page.setViewportSize({ width, height });
    await go();
    await page.locator(".mv-page img").evaluateAll(async (images) => {
      await Promise.all(
        images.map(async (img) => {
          img.loading = "eager";
          await img.decode();
        }),
      );
    });
    assert.equal(await page.locator("main").count(), 1);
    assert.equal(await page.locator("header").count(), 1);
    assert.equal(await page.locator("footer").count(), 1);
    assert.equal(await page.locator(".mv-page audio").count(), 1);
    assert.equal(await page.locator(".mv-dock").count(), 0, "No player before interaction");
    assert(
      await page.locator("audio").evaluate((audio) => audio.paused && !audio.getAttribute("src")),
    );
    const layout = await page.evaluate(() => ({
      available: innerWidth,
      width: document.documentElement.scrollWidth,
      clippedHeadings: [...document.querySelectorAll(".mv-page h1,.mv-page h2,.mv-page h3")]
        .filter((el) => el.scrollWidth > el.clientWidth + 1)
        .map((el) => el.textContent),
      distortedCovers: [...document.querySelectorAll(".mv-page img")]
        .filter((el) => Math.abs(el.clientWidth - el.clientHeight) > 2)
        .map((el) => el.alt),
      images: [...document.querySelectorAll(".mv-page img")].every(
        (img) => img.complete && img.naturalWidth,
      ),
    }));
    assert(layout.width <= layout.available, name + ": no document overflow");
    assert.deepEqual(layout.clippedHeadings, [], name + ": headings fit");
    assert.deepEqual(layout.distortedCovers, [], name + ": square covers");
    assert(layout.images, name + ": covers load");
    await shot(name + "-hero");
    await move("#music-catalog");
    await shot(name + "-archive");
    await move("#music-diamond");
    await shot(name + "-diamond");
    await move("#music-singles");
    await shot(name + "-singles");
    await page.locator(".mv-single-art button").first().click();
    await waitPlaying();
    await page
      .locator(".mv-dock")
      .evaluate((el) => Promise.all(el.getAnimations().map((animation) => animation.finished)));
    const dock = await page.locator(".mv-dock").boundingBox();
    assert(dock && dock.x >= 0 && dock.x + dock.width <= width);
    if (width < 1024) {
      const nav = page.getByRole("navigation", { name: "Primary", exact: true });
      const rect = await nav.boundingBox();
      assert(rect && dock.y + dock.height < rect.y, name + ": dock clears mobile navigation");
      assert(
        await nav.locator("a").evaluateAll((links) =>
          links.every((link) => {
            const rect = link.getBoundingClientRect();
            return link.contains(
              document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2),
            );
          }),
        ),
        name + ": all mobile navigation controls clickable",
      );
    }
    await shot(name + "-player");
    await closePlayer();
    report.layouts.push({ name, width, height, ...layout, dock });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await go();
  assert.equal(await page.title(), "Music & Discography | Klondike Kat");
  assert.deepEqual(await page.locator(".mv-year").allTextContents(), ["1993", "1997", "ARCHIVE"]);
  assert.equal(await page.locator(".mv-track-sheet li").count(), 7);
  assert.equal(await page.locator(".mv-single").count(), 11);
  assert.equal(await page.locator(".mv-single-art button").count(), 10);
  assert.equal(
    await page
      .locator(".mv-single")
      .filter({ has: page.getByRole("heading", { name: "Ride Like The Wind", exact: true }) })
      .locator("button")
      .count(),
    0,
  );
  const streaming = await page.locator(".mv-hero .mv-streaming a").evaluateAll((links) =>
    links.map((a) => ({
      title: a.textContent.trim(),
      url: a.href,
      target: a.target,
      rel: a.rel,
    })),
  );
  assert.deepEqual(
    streaming.map((a) => a.url),
    [
      "https://open.spotify.com/search/Klondike%20Kat",
      "https://music.apple.com/us/search?term=Klondike%20Kat",
      "https://www.youtube.com/results?search_query=Klondike+Kat",
    ],
  );
  assert(streaming.every((a) => a.target === "_blank" && a.rel.includes("noopener")));
  report.links.streaming = streaming;
  await page.locator(".mv-year-rail a").nth(1).click();
  await page.waitForFunction(() =>
    document.querySelector(".mv-year-rail a[aria-current]")?.hash?.includes("mobbin-muzik"),
  );
  await move("#music-singles");
  const previewButtons = page.locator(".mv-single-art button");
  await previewButtons.first().click();
  await waitPlaying();
  const firstSource = await page.locator("audio").getAttribute("src");
  await page.getByRole("button", { name: "Pause preview", exact: true }).click();
  const pausedAt = await page.locator("audio").evaluate((audio) => audio.currentTime);
  await page.waitForTimeout(200);
  assert(await page.locator("audio").evaluate((audio) => audio.paused));
  assert.equal(await page.locator("audio").evaluate((audio) => audio.currentTime), pausedAt);
  await page.getByRole("slider", { name: "Seek within the music preview" }).fill("59.7");
  await page.getByRole("button", { name: "Play preview", exact: true }).click();
  await page.waitForFunction(() => {
    const audio = document.querySelector("audio");
    return audio.paused && audio.currentTime >= 60;
  });
  assert.equal(await page.getByRole("progressbar").getAttribute("aria-valuenow"), "60");
  await page.getByRole("button", { name: "Replay preview" }).focus();
  await page.keyboard.press("Enter");
  await waitPlaying();
  assert(await page.locator("audio").evaluate((audio) => audio.currentTime < 2));
  await previewButtons.nth(1).click();
  await waitPlaying();
  assert.notEqual(await page.locator("audio").getAttribute("src"), firstSource);
  assert.equal(await page.locator("audio").count(), 1);
  await previewButtons.nth(2).click();
  await previewButtons.nth(3).click();
  await previewButtons.nth(4).click();
  await waitPlaying();
  assert.match(await page.locator(".mv-dock-track>strong").innerText(), /Flowrocious/);
  report.audio = {
    noAutoplay: true,
    singleMediaElement: true,
    realFilesPlay: true,
    pause: true,
    progress: true,
    seek: true,
    sixtySecondCutoff: true,
    keyboardReplay: true,
    trackSwitching: true,
    rapidSwitching: true,
  };
  await closePlayer();
  assert(
    await previewButtons.nth(4).evaluate((button) => button === document.activeElement),
    "Close restores focus",
  );
  // Real decoding smoke-check for each available preview, preserving every source URL.
  report.audio.sources = [];
  for (let index = 0; index < (await previewButtons.count()); index++) {
    await previewButtons.nth(index).click();
    await waitPlaying();
    report.audio.sources.push(
      await page.locator("audio").evaluate((audio) => ({
        src: audio.getAttribute("src"),
        duration: audio.duration,
        readyState: audio.readyState,
      })),
    );
  }
  // Force a browser media failure, then retry the original source through the UI.
  intentionalMediaFailure = true;
  await page.locator("audio").evaluate((audio) => {
    audio.src = "data:audio/mpeg;base64,AAAA";
    audio.load();
  });
  await page.getByRole("button", { name: "Retry preview", exact: true }).waitFor();
  await page.getByRole("button", { name: "Retry preview", exact: true }).click();
  await waitPlaying();
  intentionalMediaFailure = false;
  report.audio.errorRecovery = true;
  const oldAudio = await page.locator("audio").elementHandle();
  await page.locator(".mv-closing a[href='/shop']").click();
  await page.waitForURL("**/shop");
  await page.locator(".mv-page").waitFor({ state: "detached" });
  await page.waitForFunction((audio) => audio.paused && !audio.getAttribute("src"), oldAudio);
  assert(
    await oldAudio.evaluate((audio) => audio.paused && !audio.getAttribute("src")),
    "Route exit releases media",
  );
  report.audio.routeCleanup = true;
  await go();
  const commerce = await page.locator(".mv-physical a,.mv-diamond-copy>a").evaluateAll((links) =>
    links.map((a) => ({
      name: a.getAttribute("aria-label") || a.textContent,
      href: a.getAttribute("href"),
    })),
  );
  assert.deepEqual(
    commerce.map((link) => link.href),
    [
      "/shop/the-lyrical-lion-cd",
      "/shop/mobbin-muzik-melodies-cd",
      "/shop/biography-of-a-made-man-cd",
      "/shop/diamond-dre",
    ],
  );
  report.links.commerce = [];
  for (const link of commerce) {
    await page.locator(".mv-page a[href='" + link.href + "']").click();
    await page.waitForURL("**" + link.href);
    await page.locator(".mv-page").waitFor({ state: "detached" });
    await page.locator("h1").waitFor();
    const heading = await page.locator("h1").innerText();
    assert(!/not found|not in stock|didn't load|the vault/i.test(heading));
    assert(/lyrical lion|mobbin' muzik|biography of a made man|diamond dre/i.test(heading));
    report.links.commerce.push({ ...link, heading });
    await go();
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await go();
  const before = await page
    .locator(".mv-hero-sleeve-1")
    .evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => scrollTo({ top: 350, behavior: "instant" }));
  await page.waitForTimeout(100);
  const after = await page
    .locator(".mv-hero-sleeve-1")
    .evaluate((el) => getComputedStyle(el).transform);
  assert.equal(before, after);
  assert(
    await page
      .locator(".mv-page *")
      .evaluateAll((items) => items.every((el) => getComputedStyle(el).animationName === "none")),
  );
  report.reducedMotion = true;
  await move("#music-singles");
  await previewButtons.first().click();
  await waitPlaying();
  await closePlayer();
  assert.deepEqual(errors, [], "No browser runtime, hydration, or console errors");
  report.passed = true;
} finally {
  await writeFile(resolve(out, "verification.json"), JSON.stringify(report, null, 2));
  await page.close();
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
