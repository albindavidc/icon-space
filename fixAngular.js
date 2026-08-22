const fs = require('fs');
const si = require('simple-icons');

const icon = si.siAngular;

if (icon) {
  const path = icon.path;

  const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60"/><defs><linearGradient id="angularGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF31D8" /><stop offset="50%" stop-color="#FF1E5A" /><stop offset="100%" stop-color="#FF7E00" /></linearGradient></defs><g transform="translate(56, 56) scale(6)"><path fill="url(#angularGrad)" d="${path}"/></g></svg>`;

  const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#F4F2ED" rx="60"/><defs><linearGradient id="angularGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF31D8" /><stop offset="50%" stop-color="#FF1E5A" /><stop offset="100%" stop-color="#FF7E00" /></linearGradient></defs><g transform="translate(56, 56) scale(6)"><path fill="url(#angularGrad)" d="${path}"/></g></svg>`;

  fs.writeFileSync('./icons/Angular-Dark.svg', darkSvg);
  fs.writeFileSync('./icons/Angular-Light.svg', lightSvg);
  fs.writeFileSync('./icons/angular-dark.svg', darkSvg);
  fs.writeFileSync('./icons/angular-light.svg', lightSvg);
  fs.writeFileSync('./icons/angular.svg', lightSvg); // just in case
  
  console.log('Fixed Angular SVG');
} else {
  console.log('Angular not found in simple icons');
}
