const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

const icons = require('./built-icons.json');
const iconNameList = [...new Set(Object.keys(icons).map(i => i.split('-')[0]))];
const shortNames = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  tailwind: 'tailwindcss',
  vue: 'vuejs',
  nuxt: 'nuxtjs',
  go: 'golang',
  cf: 'cloudflare',
  wasm: 'webassembly',
  postgres: 'postgresql',
  k8s: 'kubernetes',
  next: 'nextjs',
  mongo: 'mongodb',
  md: 'markdown',
  ps: 'photoshop',
  ai: 'illustrator',
  pr: 'premiere',
  ae: 'aftereffects',
  scss: 'sass',
  sc: 'scala',
  net: 'dotnet',
  gatsbyjs: 'gatsby',
  gql: 'graphql',
  vlang: 'v',
  amazonwebservices: 'aws',
  bots: 'discordbots',
  express: 'expressjs',
  googlecloud: 'gcp',
  mui: 'materialui',
  windi: 'windicss',
  unreal: 'unrealengine',
  nest: 'nestjs',
  ktorio: 'ktor',
  pwsh: 'powershell',
  au: 'audition',
  rollup: 'rollupjs',
  rxjs: 'reactivex',
  rxjava: 'reactivex',
  ghactions: 'githubactions',
  sklearn: 'scikitlearn',
};
const themedIcons = [
  ...Object.keys(icons)
    .filter(i => i.includes('-light') || i.includes('-dark'))
    .map(i => i.split('-')[0]),
];

const ICONS_PER_LINE = 15;
const ONE_ICON = 48;

function generateSvg(iconNames, perLine, size = ONE_ICON) {
  const iconSvgList = iconNames.map(i => icons[i]);

  const scale = size / (300 - 44);
  const length = Math.min(perLine * 300, iconNames.length * 300) - 44;
  const height = Math.ceil(iconSvgList.length / perLine) * 300 - 44;
  const scaledHeight = height * scale;
  const scaledWidth = length * scale;

  return `
  <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    ${iconSvgList
      .map(
        (i, index) =>
          `
        <g transform="translate(${(index % perLine) * 300}, ${
            Math.floor(index / perLine) * 300
          })">
          ${i}
        </g>
        `
      )
      .join(' ')}
  </svg>
  `;
}

function parseShortNames(names, theme = 'dark') {
  return names.map(name => {
    if (iconNameList.includes(name))
      return name + (themedIcons.includes(name) ? `-${theme}` : '');
    else if (name in shortNames)
      return (
        shortNames[name] +
        (themedIcons.includes(shortNames[name]) ? `-${theme}` : '')
      );
  });
}

app.get('/icons', (req, res) => {
  const iconParam = req.query.i || req.query.icons;
  if (!iconParam) {
    return res.status(400).send("You didn't specify any icons!");
  }
  const theme = req.query.t || req.query.theme;
  if (theme && theme !== 'dark' && theme !== 'light') {
    return res.status(400).send('Theme must be either "light" or "dark"');
  }
  const perLine = parseInt(req.query.perline) || ICONS_PER_LINE;
  if (isNaN(perLine) || perLine < -1 || perLine > 50) {
    return res.status(400).send('Icons per line must be a number between 1 and 50');
  }

  const size = parseInt(req.query.size) || ONE_ICON;
  if (isNaN(size) || size < 16 || size > 512) {
    return res.status(400).send('Size must be a number between 16 and 512');
  }

  let iconShortNames = [];
  if (iconParam === 'all') iconShortNames = iconNameList;
  else iconShortNames = iconParam.split(',');

  const iconNames = parseShortNames(iconShortNames, theme || undefined);
  if (!iconNames || iconNames.includes(undefined)) {
    return res.status(400).send("You didn't format the icons param correctly!");
  }

  const svg = generateSvg(iconNames, perLine, size);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.get('/api/icons', (req, res) => {
  res.json(iconNameList);
});

app.get('/api/svgs', (req, res) => {
  res.json(icons);
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
