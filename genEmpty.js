const fs = require('fs');
['css3', 'canva', 'adobexd'].forEach(name => {
  const emptySvg = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="currentColor"/></svg>';
  fs.writeFileSync('./icons/' + name + '-dark.svg', emptySvg);
  fs.writeFileSync('./icons/' + name + '-light.svg', emptySvg);
});
