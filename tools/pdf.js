// Prints tools/resume.html to PDF with headless Chromium.
// Usage: node pdf.js <input.html> <output.pdf> [chromium-executable]
const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: process.argv[4] });
  const p = await b.newPage();
  await p.goto('file://' + require('path').resolve(process.argv[2]));
  await p.pdf({ path: process.argv[3], format: 'A4', preferCSSPageSize: true, printBackground: true });
  await b.close();
})();
