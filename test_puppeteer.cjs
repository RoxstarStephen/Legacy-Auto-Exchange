const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('pageerror', err => {
    console.log('PAGE_ERROR:', err.toString());
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE_ERROR:', msg.text());
    }
  });

  try {
    await page.goto('http://localhost:5173');
    await new Promise(r => setTimeout(r, 2000));
  } catch(e) {
    console.error("Puppeteer nav error", e);
  }

  await browser.close();
})();
