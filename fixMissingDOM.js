const fs = require('fs');
const indexPath = './public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const missingBlock = `
      function getShieldUrl(name, theme) {
        if (badgeMap[name]) {
          const b = badgeMap[name];
          return \`https://img.shields.io/badge/\${encodeURIComponent(b.label)}-\${b.bg}?style=for-the-badge&logo=\${b.logo}&logoColor=\${b.fg}\`;
        }
        const fallbackBg = theme === 'dark' ? '1A1A1A' : 'E2E8F0';
        const fallbackFg = theme === 'dark' ? 'white' : 'black';
        const label = name.charAt(0).toUpperCase() + name.slice(1);
        return \`https://img.shields.io/badge/\${encodeURIComponent(label)}-\${fallbackBg}?style=for-the-badge&logo=\${name}&logoColor=\${fallbackFg}\`;
      }

      // Builder DOM Elements
      const typeSkillBtn = document.getElementById('typeSkillBtn');
      const typeShieldBtn = document.getElementById('typeShieldBtn');
      const sizeInput = document.getElementById('sizeInput');
      const themeDarkBtn = document.getElementById('themeDarkBtn');
      const themeLightBtn = document.getElementById('themeLightBtn');
      const perLineInput = document.getElementById('perLineInput');
      const perLineContainer = document.getElementById('perLineContainer');
      const selectedIconsBox = document.getElementById('selectedIconsBox');
      const selectedCount = document.getElementById('selectedCount');
      const previewContainer = document.getElementById('previewContainer');
      const exportCode = document.getElementById('exportCode');
      const copyBtn = document.getElementById('copyBtn');
      const copyIcon = document.getElementById('copyIcon');
      const exportTabs = document.querySelectorAll('.export-tab');
      const clearBtn = document.getElementById('clearBtn');
      const copyExportBtn = document.getElementById('copyExportBtn');
`;

html = html.replace('function updateBuilderUI() {', missingBlock + '\n      function updateBuilderUI() {');
fs.writeFileSync(indexPath, html);
console.log('Restored missing DOM elements!');
