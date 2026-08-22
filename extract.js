const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g);
if (scripts) {
  scripts.forEach((s, i) => {
    fs.writeFileSync(`script${i}.js`, s.replace(/<\/?script>/g, ''));
    console.log(`script${i}.js created`);
  });
}
