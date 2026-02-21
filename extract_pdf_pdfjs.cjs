const fs = require('fs');
const path = require('path');
let pdfjsLib;
try {
  pdfjsLib = require('pdfjs-dist/legacy/build/pdf');
} catch (e) {
  try {
    pdfjsLib = require('pdfjs-dist/build/pdf');
  } catch (e2) {
    try {
      pdfjsLib = require('pdfjs-dist');
    } catch (e3) {
      console.error('Unable to load pdfjs-dist. Tried multiple locations.');
      throw e3;
    }
  }
}

async function run() {
  try {
    const input = process.argv[2] || path.join('public', 'docs', 'Bizforge document.docx.pdf');
    if (!fs.existsSync(input)) {
      console.error('Input PDF not found:', input);
      process.exit(2);
    }

    const data = new Uint8Array(fs.readFileSync(input));
    const loadingTask = pdfjsLib.getDocument({ data });
    const doc = await loadingTask.promise;
    let out = '';
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((s) => s.str);
      out += `\n\n=== Page ${i} ===\n` + strings.join(' ');
    }
    const outPath = path.join('tools', 'bizforge_text.txt');
    fs.writeFileSync(outPath, out, 'utf8');
    console.log('Wrote extracted text to', outPath);
  } catch (e) {
    console.error('Extraction failed:', e);
    process.exit(1);
  }
}

run();
