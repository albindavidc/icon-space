const badgeMap = require('./badgeMap.json');
for (const key of ['javascript', 'react', 'github', 'notion']) {
  const b = badgeMap[key];
  let logoCol = b.bg;
  if (['000000', '181717', '222222', '303030'].includes(logoCol.toUpperCase()) || ['000000', '181717', '222222', '303030'].includes(logoCol.toLowerCase())) {
     logoCol = 'white';
  }
  if (b.fg && b.fg.toLowerCase() !== 'white' && b.fg.toLowerCase() !== 'black') {
     logoCol = b.fg; // E.g. javascript has fg=F7DF1E
  }
  console.log(`Dark: https://img.shields.io/badge/${encodeURIComponent(b.label)}-000000?style=for-the-badge&logo=${b.logo}&logoColor=${logoCol}`);
}
