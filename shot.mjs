import { createRequire } from 'module';
const require = createRequire('C:/Users/jonat/Desktop/proyects/AGENT-OS/');
const { chromium } = require('playwright');

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto('http://localhost:4326', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const mq = page.locator('.marquee');
await mq.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await mq.screenshot({ path: 'C:/Users/jonat/Desktop/proyects/portfolio/.shot-mq.png' });
await browser.close();
console.log('done');
