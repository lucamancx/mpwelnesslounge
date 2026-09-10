const fs = require('fs');
let content = fs.readFileSync('src/components/ExpandableText.tsx', 'utf16le');
if (content.includes('ExpandableTextProps')) {
  fs.writeFileSync('src/components/ExpandableText.tsx', content, 'utf8');
} else {
  // try reading with utf8 in case it was already utf8 but mangled
  let content2 = fs.readFileSync('src/components/ExpandableText.tsx', 'utf8');
  fs.writeFileSync('src/components/ExpandableText.tsx', content2.replace(/\uFFFD/g, ''), 'utf8');
}

