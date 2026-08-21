const fs = require('fs');
const si = require('simple-icons');
const iconsRaw = require('./built-icons.json');

const badgeMap = {};

const slugMap = {};
for (const key of Object.keys(si)) {
  const icon = si[key];
  if (icon && icon.slug) {
    slugMap[icon.slug] = icon;
  }
}

const iconNames = [...new Set(Object.keys(iconsRaw).map(i => i.split('-')[0]))];
for (const name of iconNames) {
  let mapped = slugMap[name];
  if (!mapped) {
    // Try shortNames from server.js
    const shortNames = {
      js: 'javascript', ts: 'typescript', py: 'python', tailwind: 'tailwindcss',
      vue: 'vuejs', nuxt: 'nuxtjs', go: 'go', svelte: 'svelte', java: 'java',
      c: 'c', cpp: 'cplusplus', cs: 'csharp', php: 'php', npm: 'npm', react: 'react'
    };
    if (shortNames[name] && slugMap[shortNames[name]]) {
      mapped = slugMap[shortNames[name]];
    }
  }
  
  if (mapped) {
    // Determine fg color
    // Calculate luminance to decide fg color
    const hex = mapped.hex;
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    const fg = (yiq >= 128) ? 'black' : 'white';
    
    badgeMap[name] = {
      label: mapped.title,
      bg: mapped.hex,
      logo: mapped.slug,
      fg: fg
    };
  }
}

fs.writeFileSync('badgeMap.json', JSON.stringify(badgeMap, null, 2));
console.log('badgeMap.json generated with ' + Object.keys(badgeMap).length + ' icons');
