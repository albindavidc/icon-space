const fs = require('fs');
const si = require('simple-icons');

const missing = [
  'html5', 'css3', 'chartjs', 'ejs', 'nodemon', 'socketio',
  'ffmpeg', 'eslint', 'prettier', 'canva', 'framer', 'adobexd'
];

const mapToSlug = {
  html5: 'html5', css3: 'css3', chartjs: 'chartdotjs', ejs: 'ejs',
  nodemon: 'nodemon', socketio: 'socketdotio', ffmpeg: 'ffmpeg',
  eslint: 'eslint', prettier: 'prettier', canva: 'canva',
  framer: 'framer', adobexd: 'adobexd'
};

const slugMap = {};
for (const key of Object.keys(si)) {
  const icon = si[key];
  if (icon && icon.slug) slugMap[icon.slug] = icon;
}

for (const name of missing) {
  const slug = mapToSlug[name];
  const icon = slugMap[slug];
  if (icon) {
    fs.writeFileSync('./icons/' + name + '-dark.svg', icon.svg);
    fs.writeFileSync('./icons/' + name + '-light.svg', icon.svg);
    console.log('Generated SVG for', name);
  } else {
    console.log('NOT FOUND IN SIMPLE ICONS:', name, slug);
  }
}
