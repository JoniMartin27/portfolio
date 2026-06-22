import { createRequire } from 'module';
const require = createRequire('C:/Users/jonat/Desktop/proyects/AGENT-OS/');
const { chromium } = require('playwright');
import fs from 'fs';
import path from 'path';

const URL = process.env.REC_URL || 'http://localhost:4326';
const OUT_DIR = 'C:/Users/jonat/Desktop/proyects/portfolio/.rec';
const W = 1440, H = 900;

fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--force-color-profile=srgb', '--disable-lcd-text']
});
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
  recordVideo: { dir: OUT_DIR, size: { width: W, height: H } },
  reducedMotion: 'no-preference'
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'networkidle' });

// let fonts settle + embers warm up
await page.waitForTimeout(1800);

// cinematic eased scroll from top to bottom and a touch back
async function easeScrollTo(targetFrac, durationMs) {
  await page.evaluate(async ({ targetFrac, durationMs }) => {
    const max = document.body.scrollHeight - window.innerHeight;
    const start = window.scrollY;
    const end = max * targetFrac;
    const t0 = performance.now();
    const easeInOut = t => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;
    await new Promise(res => {
      function step(now) {
        const p = Math.min(1, (now - t0) / durationMs);
        window.scrollTo(0, start + (end - start) * easeInOut(p));
        if (p < 1) requestAnimationFrame(step); else res();
      }
      requestAnimationFrame(step);
    });
  }, { targetFrac, durationMs });
}

await page.waitForTimeout(1200);          // hold on hero
await easeScrollTo(0.30, 4200);           // into projects
await page.waitForTimeout(1000);
await easeScrollTo(0.58, 3800);           // stack + about
await page.waitForTimeout(1000);
await easeScrollTo(1.00, 4200);           // contact / footer
await page.waitForTimeout(1400);
await easeScrollTo(0.0, 3200);            // glide back to hero
await page.waitForTimeout(1200);

await ctx.close();   // finalizes the video file
await browser.close();

// find the produced webm
const webm = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.webm')).map(f => path.join(OUT_DIR, f))[0];
if (!webm) { console.error('NO_WEBM'); process.exit(1); }
console.log('WEBM=' + webm);
