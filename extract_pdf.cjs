const fs = require('fs');
const path = require('path');
const pdfLib = require('pdf-parse');
const pdf = typeof pdfLib === 'function' ? pdfLib : (pdfLib && pdfLib.default) ? pdfLib.default : pdfLib;

async function run() {
  try {
    const input = process.argv[2] || path.join('public', 'docs', 'Bizforge document.docx.pdf');
    if (!fs.existsSync(input)) {
      console.error('Input PDF not found:', input);
      process.exit(2);
    }

    const dataBuffer = fs.readFileSync(input);
    const data = await pdf(dataBuffer);
    const outPath = path.join('tools', 'bizforge_text.txt');
    fs.writeFileSync(outPath, data.text, 'utf8');
    console.log('Wrote extracted text to', outPath);
  } catch (e) {
    console.error('Extraction failed:', e);
    process.exit(1);
  }
}

run();
