const fs = require('fs');
const si = require('simple-icons');
const iconsRaw = require('./built-icons.json');
const badgeMapPath = './badgeMap.json';
const badgeMap = JSON.parse(fs.readFileSync(badgeMapPath, 'utf8'));

const iconNames = [...new Set(Object.keys(iconsRaw).map(i => i.split('-')[0]))];

// We know some shortNames and how they map to simple-icons slugs or titles
const shortToSlug = {
  js: 'javascript', ts: 'typescript', py: 'python', tailwind: 'tailwindcss',
  vue: 'vuejs', nuxt: 'nuxtjs', go: 'go', svelte: 'svelte', java: 'java',
  c: 'c', cpp: 'cplusplus', cs: 'csharp', php: 'php', npm: 'npm', react: 'react',
  nodejs: 'nodedotjs', aws: 'amazonaws', gcp: 'googlecloud',
  githubactions: 'githubactions', postgres: 'postgresql',
  mongodb: 'mongodb', express: 'express', nestjs: 'nestjs',
  pnpm: 'pnpm', prisma: 'prisma', nodemon: 'nodemon',
  socketio: 'socketdotio', postman: 'postman', netlify: 'netlify',
  vercel: 'vercel', nginx: 'nginx', github: 'github', ffmpeg: 'ffmpeg',
  notion: 'notion', eslint: 'eslint', docker: 'docker', prettier: 'prettier',
  git: 'git', photoshop: 'adobephotoshop', canva: 'canva', figma: 'figma',
  framer: 'framer', adobexd: 'adobexd', blender: 'blender', arduino: 'arduino',
  next: 'nextdotjs', nextjs: 'nextdotjs', html: 'html5', css: 'css3',
  postgres: 'postgresql', cpp: 'cplusplus', cs: 'csharp',
  dotnet: 'dotnet', x: 'x', linkedin: 'linkedin', whatsapp: 'whatsapp',
  linux: 'linux', ejs: 'ejs', chartjs: 'chartdotjs', rxjs: 'reactivex'
};

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

// Create a lookup for simple icons by slug
const slugMap = {};
for (const key of Object.keys(si)) {
  const icon = si[key];
  if (icon && icon.slug) slugMap[icon.slug] = icon;
}

for (const name of iconNames) {
  let mapped = slugMap[name];
  if (!mapped) {
    const slugName = shortToSlug[name];
    if (slugName && slugMap[slugName]) {
      mapped = slugMap[slugName];
    }
  }

  if (mapped || overrides[name]) {
    if (!badgeMap[name]) {
      badgeMap[name] = {};
    }
    
    // Assign label and logo if mapped
    if (mapped) {
      badgeMap[name].label = badgeMap[name].label || mapped.title;
      badgeMap[name].logo = badgeMap[name].logo || mapped.slug;
      if (!badgeMap[name].bg) badgeMap[name].bg = mapped.hex;
    } else {
      // Missing from simple-icons, hardcode minimal fallback
      badgeMap[name].label = name.charAt(0).toUpperCase() + name.slice(1);
      badgeMap[name].logo = name; // might fail on shields.io but better than nothing
      if (!badgeMap[name].bg) badgeMap[name].bg = '000000';
    }

    // Apply manual override
    if (overrides[name]) {
      badgeMap[name].bg = overrides[name];
    }

    // Calc FG
    const hex = badgeMap[name].bg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) || 0;
    const g = parseInt(hex.substr(2, 2), 16) || 0;
    const b = parseInt(hex.substr(4, 2), 16) || 0;
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    badgeMap[name].fg = (yiq >= 128) ? 'black' : 'white';
  }
}

// Special fixes for some popular shortNames that might not have matching SVGs but used in URLs
badgeMap['nodejs'] = badgeMap['nodejs'] || { label: 'Node.js', logo: 'nodedotjs', bg: overrides['nodejs'], fg: 'white' };
badgeMap['aws'] = badgeMap['aws'] || { label: 'AWS', logo: 'amazonaws', bg: overrides['aws'], fg: 'white' };
badgeMap['gcp'] = badgeMap['gcp'] || { label: 'Google Cloud', logo: 'googlecloud', bg: overrides['gcp'], fg: 'white' };
badgeMap['postgres'] = badgeMap['postgres'] || { label: 'PostgreSQL', logo: 'postgresql', bg: overrides['postgres'], fg: 'white' };
badgeMap['html'] = badgeMap['html'] || { label: 'HTML5', logo: 'html5', bg: overrides['html'], fg: 'white' };
badgeMap['css'] = badgeMap['css'] || { label: 'CSS3', logo: 'css3', bg: overrides['css'], fg: 'white' };
badgeMap['js'] = badgeMap['js'] || { label: 'JavaScript', logo: 'javascript', bg: overrides['js'], fg: 'black' };
badgeMap['ts'] = badgeMap['ts'] || { label: 'TypeScript', logo: 'typescript', bg: overrides['ts'], fg: 'white' };


fs.writeFileSync(badgeMapPath, JSON.stringify(badgeMap, null, 2));
console.log('Updated badgeMap.json with missing icons');

// Update index.html
const indexPath = './public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const regex = /const badgeMap = \{[\s\S]*?\n      \};/;
const newBadgeMapStr = `const badgeMap = ${JSON.stringify(badgeMap, null, 2).split('\n').map((l, i) => i === 0 ? l : '      ' + l).join('\n')};`;

html = html.replace(regex, newBadgeMapStr);
fs.writeFileSync(indexPath, html);
console.log('Updated index.html');
