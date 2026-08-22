const fs = require('fs');

const map = {
  'css3-dark.svg': 'CSS.svg',
  'css3-light.svg': 'CSS.svg',
  'html5-dark.svg': 'HTML.svg',
  'html5-light.svg': 'HTML.svg'
};

for (const [dest, src] of Object.entries(map)) {
  fs.copyFileSync('./icons/' + src, './icons/' + dest);
  console.log('Copied', src, 'to', dest);
}
