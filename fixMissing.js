const fs = require('fs');
const si = require('simple-icons');

// CSS3
const cssIcon = si.siCss;
if (cssIcon) {
  const hex = '#' + cssIcon.hex;
  const path = cssIcon.path;
  const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60"/><g transform="translate(56, 56) scale(6)"><path fill="${hex}" d="${path}"/></g></svg>`;
  const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#F4F2ED" rx="60"/><g transform="translate(56, 56) scale(6)"><path fill="${hex}" d="${path}"/></g></svg>`;
  fs.writeFileSync('./icons/css3-dark.svg', darkSvg);
  fs.writeFileSync('./icons/css3-light.svg', lightSvg);
}

// Canva (Custom fallback text)
const canvaBg = '#00C4CC';
const canvaDark = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60"/><text x="128" y="160" fill="${canvaBg}" font-family="sans-serif" font-weight="900" font-size="120" text-anchor="middle">C</text></svg>`;
const canvaLight = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#F4F2ED" rx="60"/><text x="128" y="160" fill="${canvaBg}" font-family="sans-serif" font-weight="900" font-size="120" text-anchor="middle">C</text></svg>`;
fs.writeFileSync('./icons/canva-dark.svg', canvaDark);
fs.writeFileSync('./icons/canva-light.svg', canvaLight);

// Adobe XD (Custom fallback text)
const xdBg = '#470137'; // or FF61F6
const xdColor = '#FF61F6';
const xdDark = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60"/><rect x="56" y="56" width="144" height="144" rx="20" fill="${xdBg}"/><text x="128" y="150" fill="${xdColor}" font-family="sans-serif" font-weight="bold" font-size="64" text-anchor="middle">Xd</text></svg>`;
const xdLight = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#F4F2ED" rx="60"/><rect x="56" y="56" width="144" height="144" rx="20" fill="${xdBg}"/><text x="128" y="150" fill="${xdColor}" font-family="sans-serif" font-weight="bold" font-size="64" text-anchor="middle">Xd</text></svg>`;
fs.writeFileSync('./icons/adobexd-dark.svg', xdDark);
fs.writeFileSync('./icons/adobexd-light.svg', xdLight);

console.log('Fixed CSS3, Canva, AdobeXD');
