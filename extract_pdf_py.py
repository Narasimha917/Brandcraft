from pypdf import PdfReader
from pathlib import Path

def main():
    src = Path('public/docs/Bizforge document.docx.pdf')
    if not src.exists():
        print('Input PDF not found:', src)
        return 2
    reader = PdfReader(str(src))
    out_lines = []
    for i, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ''
        out_lines.append(f"\n\n=== Page {i} ===\n")
        out_lines.append(text)
    out_path = Path('tools/bizforge_text.txt')
    out_path.write_text('\n'.join(out_lines), encoding='utf-8')
    print('Wrote', out_path)
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
