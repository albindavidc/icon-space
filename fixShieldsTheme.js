const fs = require('fs');
const indexPath = './public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const newShieldUrl = `      function getShieldUrl(name, theme) {
        if (badgeMap[name]) {
          const b = badgeMap[name];
          if (theme === 'dark') {
            let logoCol = b.bg;
            const darkBgs = ['000000', '181717', '222222', '303030', '010101', '1a1a1a', '242938'];
            if (darkBgs.includes(logoCol.toLowerCase())) {
               logoCol = 'white';
            }
            if (b.fg && b.fg.toLowerCase() !== 'white' && b.fg.toLowerCase() !== 'black') {
               logoCol = b.fg;
            }
            return \`https://img.shields.io/badge/\${encodeURIComponent(b.label)}-000000?style=for-the-badge&logo=\${b.logo}&logoColor=\${logoCol}\`;
          } else {
            return \`https://img.shields.io/badge/\${encodeURIComponent(b.label)}-\${b.bg}?style=for-the-badge&logo=\${b.logo}&logoColor=\${b.fg}\`;
          }
        }
        const fallbackBg = theme === 'dark' ? '1A1A1A' : 'E2E8F0';
        const fallbackFg = theme === 'dark' ? 'white' : 'black';
        const label = name.charAt(0).toUpperCase() + name.slice(1);
        return \`https://img.shields.io/badge/\${encodeURIComponent(label)}-\${fallbackBg}?style=for-the-badge&logo=\${name}&logoColor=\${fallbackFg}\`;
      }`;

html = html.replace(/      function getShieldUrl\([\s\S]*?      \}/, newShieldUrl);
fs.writeFileSync(indexPath, html);
console.log('Fixed Shield Theme!');
