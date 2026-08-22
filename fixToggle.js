const fs = require('fs');
const indexPath = './public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const missingFunc = `
      window.toggleIcon = (name) => {
        const idx = builderState.icons.indexOf(name);
        if (idx > -1) {
          builderState.icons.splice(idx, 1);
        } else {
          builderState.icons.push(name);
        }
        updateBuilderUI();
      };
`;

html = html.replace('function updateBuilderUI() {', missingFunc + '\n      function updateBuilderUI() {');
fs.writeFileSync(indexPath, html);
console.log('Restored toggleIcon!');
