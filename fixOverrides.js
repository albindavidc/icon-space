const fs = require('fs');
const overrides = {
  ts: '3178C6', typescript: '3178C6', js: 'F7DF1E', javascript: 'F7DF1E',
  jquery: '0769AD', tailwind: '06B6D4', tailwindcss: '06B6D4',
  html: 'E34F26', html5: 'E34F26', css: '1572B6', css3: '1572B6',
  bootstrap: '7952B3', angular: 'DD0031', rxjs: 'B7178C',
  sass: 'CC6699', chartjs: 'FF6384', ejs: 'B4CA65', electron: '2B2E3A',
  express: '303030', expressjs: '303030', nestjs: 'E0234E',
  pnpm: 'F69220', mongodb: '47A248', postgres: '336791',
  postgresql: '336791', prisma: '2D3748', nodejs: '339933',
  nodemon: '76D04B', java: 'ED8B00', socketio: '010101',
  postman: 'FF6C37', aws: 'FF9900', gcp: '4285F4', googlecloud: '4285F4',
  netlify: '000000', vercel: '000000', nginx: '009639',
  github: '181717', ffmpeg: '007808', notion: '000000',
  eslint: '4B32C3', docker: '2496ED', prettier: 'F7B93E',
  git: 'F05032', photoshop: '31A8FF', canva: '00C4CC',
  figma: 'F24E1E', framer: '000000', adobexd: '470137',
  blender: 'F5792A', arduino: '00979D'
};

const badgeMapPath = './badgeMap.json';
const badgeMap = JSON.parse(fs.readFileSync(badgeMapPath, 'utf8'));

for (const [key, val] of Object.entries(badgeMap)) {
  if (overrides[key]) {
    val.bg = overrides[key];
  }
}

// Recalc fg
for (const [key, val] of Object.entries(badgeMap)) {
  const hex = (val.bg || '000000').replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) || 0;
  const g = parseInt(hex.substr(2, 2), 16) || 0;
  const b = parseInt(hex.substr(4, 2), 16) || 0;
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  val.fg = (yiq >= 128) ? 'black' : 'white';
}

fs.writeFileSync(badgeMapPath, JSON.stringify(badgeMap, null, 2));

const indexPath = './public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');
const regex = /const badgeMap = \{[\s\S]*?\n      \};/;
const newBadgeMapStr = `const badgeMap = ${JSON.stringify(badgeMap, null, 2).split('\n').map((l, i) => i === 0 ? l : '      ' + l).join('\n')};`;
html = html.replace(regex, newBadgeMapStr);
fs.writeFileSync(indexPath, html);
console.log('Restored overrides!');
