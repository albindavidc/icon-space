const fs = require('fs');
const badgeMapPath = './badgeMap.json';
const badgeMap = JSON.parse(fs.readFileSync(badgeMapPath, 'utf8'));

const exactImageMatches = {
  typescript: { label: 'TypeScript', bg: '3178C6', fg: 'white', logo: 'typescript' },
  javascript: { label: 'JavaScript', bg: '323330', fg: 'F7DF1E', logo: 'javascript' },
  jquery: { label: 'jQuery', bg: '0769AD', fg: 'white', logo: 'jquery' },
  tailwindcss: { label: 'TailwindCSS', bg: '06B6D4', fg: 'white', logo: 'tailwindcss' },
  html5: { label: 'HTML5', bg: 'E34F26', fg: 'white', logo: 'html5' },
  css3: { label: 'CSS3', bg: '1572B6', fg: 'white', logo: 'css3' },
  bootstrap: { label: 'Bootstrap', bg: '7952B3', fg: 'white', logo: 'bootstrap' },
  
  angular: { label: 'Angular', bg: 'DD0031', fg: 'white', logo: 'angular' },
  rxjs: { label: 'RxJS', bg: 'B7178C', fg: 'white', logo: 'reactivex' },
  sass: { label: 'Sass', bg: 'CC6699', fg: 'white', logo: 'sass' },
  chartjs: { label: 'Chart.js', bg: 'FF6384', fg: 'white', logo: 'chartdotjs' },
  ejs: { label: 'EJS', bg: 'B4CA65', fg: 'black', logo: 'ejs' },
  electron: { label: 'Electron', bg: '191970', fg: 'white', logo: 'electron' },
  expressjs: { label: 'Express.js', bg: '303030', fg: 'white', logo: 'express' },
  nestjs: { label: 'NestJS', bg: 'E0234E', fg: 'white', logo: 'nestjs' },
  
  pnpm: { label: 'PNPM', bg: '222222', fg: 'F69220', logo: 'pnpm' },
  mongodb: { label: 'MongoDB', bg: '47A248', fg: 'white', logo: 'mongodb' },
  postgres: { label: 'Postgres', bg: '316192', fg: 'white', logo: 'postgresql' },
  prisma: { label: 'Prisma', bg: '2D3748', fg: 'white', logo: 'prisma' },
  nodejs: { label: 'Node.js', bg: '339933', fg: 'white', logo: 'nodedotjs' },
  nodemon: { label: 'Nodemon', bg: '76D04B', fg: 'white', logo: 'nodemon' },
  java: { label: 'Java', bg: 'ED8B00', fg: 'white', logo: 'java' },
  
  socketio: { label: 'Socket.io', bg: '010101', fg: 'white', logo: 'socketdotio' },
  postman: { label: 'Postman', bg: 'FF6C37', fg: 'white', logo: 'postman' },
  aws: { label: 'AWS', bg: 'FF9900', fg: 'white', logo: 'amazonaws' },
  googlecloud: { label: 'GoogleCloud', bg: '4285F4', fg: 'white', logo: 'googlecloud' },
  netlify: { label: 'Netlify', bg: '000000', fg: '00C7B7', logo: 'netlify' },
  vercel: { label: 'Vercel', bg: '000000', fg: 'white', logo: 'vercel' },
  nginx: { label: 'NGINX', bg: '009639', fg: 'white', logo: 'nginx' },
  github: { label: 'GitHub', bg: '181717', fg: 'white', logo: 'github' },
  
  ffmpeg: { label: 'FFmpeg', bg: '000000', fg: '007808', logo: 'ffmpeg' },
  notion: { label: 'Notion', bg: '000000', fg: 'white', logo: 'notion' },
  eslint: { label: 'ESLint', bg: '4B32C3', fg: 'white', logo: 'eslint' },
  docker: { label: 'Docker', bg: '2496ED', fg: 'white', logo: 'docker' },
  prettier: { label: 'Prettier', bg: 'F7B93E', fg: 'black', logo: 'prettier' },
  git: { label: 'Git', bg: 'F05032', fg: 'white', logo: 'git' },
  photoshop: { label: 'Adobe Photoshop', bg: '31A8FF', fg: 'white', logo: 'adobephotoshop' },
  canva: { label: 'Canva', bg: '00C4CC', fg: 'white', logo: 'canva' },
  
  figma: { label: 'Figma', bg: 'F24E1E', fg: 'white', logo: 'figma' },
  framer: { label: 'Framer', bg: '000000', fg: 'white', logo: 'framer' },
  adobexd: { label: 'Adobe XD', bg: '470137', fg: 'white', logo: 'adobexd' },
  blender: { label: 'Blender', bg: 'F5792A', fg: 'white', logo: 'blender' },
  arduino: { label: 'Arduino', bg: '00979D', fg: 'white', logo: 'arduino' }
};

for (const [key, val] of Object.entries(exactImageMatches)) {
  badgeMap[key] = {
    label: val.label,
    bg: val.bg,
    fg: val.fg,
    logo: val.logo
  };
}

// Write to badgeMap.json
fs.writeFileSync(badgeMapPath, JSON.stringify(badgeMap, null, 2));

// Overwrite badgeMap inside index.html
const indexPath = './public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const regex = /const badgeMap = \{[\s\S]*?\n      \};/;
const newBadgeMapStr = `const badgeMap = ${JSON.stringify(badgeMap, null, 2).split('\n').map((l, i) => i === 0 ? l : '      ' + l).join('\n')};`;
html = html.replace(regex, newBadgeMapStr);

fs.writeFileSync(indexPath, html);
console.log('Colors meticulously aligned with image.');
