const fs = require('fs');
const simpleIcons = require('simple-icons');

const iconsRaw = require('./built-icons.json');
const shortNames = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  tailwind: 'tailwindcss',
  vue: 'vuejs',
  nuxt: 'nuxtjs',
  go: 'go',
  svelte: 'svelte',
  java: 'java',
  c: 'c',
  cpp: 'cplusplus',
  cs: 'csharp',
  php: 'php',
  npm: 'npm'
};

const iconNames = [...new Set(Object.keys(iconsRaw).map(i => i.split('-')[0]))];
const badgeMap = {};

// We want the map to use the short name (like 'js') or the full name (like 'javascript')
// Wait, in index.html, the cards are generated using the unique names. Let's see what they are called in index.html.
