const fs = require('fs');
['src/components/ExpandableText.tsx', 'src/components/AnimatedSection.tsx', 'src/app/servizi/page.tsx'].forEach(file => {
  try {
    let buf = fs.readFileSync(file);
    if (buf[0] === 0xFF && buf[1] === 0xFE) {
      let content = fs.readFileSync(file, 'utf16le');
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed ' + file);
    }
  } catch(e) {}
});
