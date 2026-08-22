const fs = require('fs');
const si = require('simple-icons');

const badFiles = [
  'adobexd', 'canva', 'chartjs', 'css3', 'ejs', 'eslint', 
  'ffmpeg', 'framer', 'html5', 'nodemon', 'prettier', 'socketio', 'socketdotio'
];

const mapToSlug = {
  html5: 'html5', css3: 'css3', chartjs: 'chartdotjs', ejs: 'ejs',
  nodemon: 'nodemon', socketio: 'socketdotio', socketdotio: 'socketdotio', ffmpeg: 'ffmpeg',
  eslint: 'eslint', prettier: 'prettier', canva: 'canva',
  framer: 'framer', adobexd: 'adobexd'
};

const slugMap = {};
for (const key of Object.keys(si)) {
  const icon = si[key];
  if (icon && icon.slug) slugMap[icon.slug] = icon;
}

for (const name of badFiles) {
  const slug = mapToSlug[name];
  const icon = slugMap[slug];
  
  if (icon) {
    const hex = '#' + icon.hex;
    const path = icon.path;
    
    // Scale 24x24 to fit inside 256x256. 
    // 24 * 5 = 120 (too small). 24 * 6 = 144. 256 - 144 = 112. 112/2 = 56.
    // So if we scale by 6 and translate by 56, it's perfect.
    // SVG transform: transform="translate(56, 56) scale(6)"
    
    const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60"/><g transform="translate(56, 56) scale(6)"><path fill="${hex}" d="${path}"/></g></svg>`;
    const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#F4F2ED" rx="60"/><g transform="translate(56, 56) scale(6)"><path fill="${hex}" d="${path}"/></g></svg>`;

    fs.writeFileSync('./icons/' + name + '-dark.svg', darkSvg);
    fs.writeFileSync('./icons/' + name + '-light.svg', lightSvg);
    console.log('Fixed:', name);
  } else {
    console.log('STILL NOT FOUND IN SIMPLE ICONS:', name, slug);
  }
}

// Since socketdotio might have been generated as a non-themed SVG by mistake, delete it
if (fs.existsSync('./icons/socketdotio.svg')) {
  fs.unlinkSync('./icons/socketdotio.svg');
}
