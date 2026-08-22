const fs = require('fs');
const badgeMapPath = './badgeMap.json';
const badgeMap = JSON.parse(fs.readFileSync(badgeMapPath, 'utf8'));

const fixes = {
  aws: { label: 'AWS', logo: 'amazonaws' },
  nodejs: { label: 'Node.js', logo: 'nodedotjs' },
  gcp: { label: 'Google Cloud', logo: 'googlecloud' },
  postgres: { label: 'PostgreSQL', logo: 'postgresql' },
  mongodb: { label: 'MongoDB', logo: 'mongodb' },
  html: { label: 'HTML5', logo: 'html5' },
  css: { label: 'CSS3', logo: 'css3' },
  js: { label: 'JavaScript', logo: 'javascript' },
  ts: { label: 'TypeScript', logo: 'typescript' },
  vue: { label: 'Vue.js', logo: 'vuedotjs' },
  nuxt: { label: 'Nuxt.js', logo: 'nuxtdotjs' },
  react: { label: 'React', logo: 'react' },
  express: { label: 'Express', logo: 'express' },
  nestjs: { label: 'NestJS', logo: 'nestjs' },
  nodemon: { label: 'Nodemon', logo: 'nodemon' },
  socketio: { label: 'Socket.io', logo: 'socketdotio' },
  postman: { label: 'Postman', logo: 'postman' },
  netlify: { label: 'Netlify', logo: 'netlify' },
  vercel: { label: 'Vercel', logo: 'vercel' },
  github: { label: 'GitHub', logo: 'github' },
  githubactions: { label: 'GitHub Actions', logo: 'githubactions' },
  photoshop: { label: 'Adobe Photoshop', logo: 'adobephotoshop' },
  adobexd: { label: 'Adobe XD', logo: 'adobexd' },
  figma: { label: 'Figma', logo: 'figma' },
  framer: { label: 'Framer', logo: 'framer' },
  canva: { label: 'Canva', logo: 'canva' },
  linux: { label: 'Linux', logo: 'linux' },
  windows: { label: 'Windows', logo: 'windows11' },
  apple: { label: 'Apple', logo: 'apple' },
  discord: { label: 'Discord', logo: 'discord' },
  x: { label: 'X', logo: 'x' },
  whatsapp: { label: 'WhatsApp', logo: 'whatsapp' },
  linkedin: { label: 'LinkedIn', logo: 'linkedin' },
  git: { label: 'Git', logo: 'git' },
  docker: { label: 'Docker', logo: 'docker' },
  kubernetes: { label: 'Kubernetes', logo: 'kubernetes' },
  npm: { label: 'npm', logo: 'npm' },
  pnpm: { label: 'pnpm', logo: 'pnpm' },
  yarn: { label: 'Yarn', logo: 'yarn' },
  bun: { label: 'Bun', logo: 'bun' },
  nginx: { label: 'NGINX', logo: 'nginx' }
};

for (const [key, fix] of Object.entries(fixes)) {
  if (badgeMap[key]) {
    badgeMap[key].label = fix.label;
    badgeMap[key].logo = fix.logo;
  } else {
    // some aren't in built-icons maybe?
    badgeMap[key] = {
      label: fix.label,
      logo: fix.logo,
      bg: '000000',
      fg: 'white'
    };
  }
}

// Recalculate FG once more just to be 100% sure
for (const [key, val] of Object.entries(badgeMap)) {
  const hex = (val.bg || '000000').replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) || 0;
  const g = parseInt(hex.substr(2, 2), 16) || 0;
  const b = parseInt(hex.substr(4, 2), 16) || 0;
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  val.fg = (yiq >= 128) ? 'black' : 'white';
}

fs.writeFileSync(badgeMapPath, JSON.stringify(badgeMap, null, 2));
console.log('Updated logos in badgeMap.json');

// Update index.html
const indexPath = './public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');
const regex = /const badgeMap = \{[\s\S]*?\n      \};/;
const newBadgeMapStr = `const badgeMap = ${JSON.stringify(badgeMap, null, 2).split('\n').map((l, i) => i === 0 ? l : '      ' + l).join('\n')};`;
html = html.replace(regex, newBadgeMapStr);
fs.writeFileSync(indexPath, html);
console.log('Updated index.html');
