const fs = require('fs');
const builtIcons = require('./built-icons.json');

const iconKeys = Object.keys(builtIcons).map(i => i.split('-')[0]);
const uniqueIcons = [...new Set(iconKeys)].sort();

let tableStr = `\n## Icons List\n\nHere's a list of all the icons currently supported. You can also view and search them on the [Interactive Builder](https://icon-space.vercel.app).\n\n| Icon ID | Icon |\n| :---: | :---: |\n`;

for(const id of uniqueIcons) {
  tableStr += `| \`${id}\` | <img src="https://icon-space.vercel.app/icons?i=${id}" width="48"> |\n`;
}

fs.appendFileSync('readme.md', tableStr);
console.log('Appended table with ' + uniqueIcons.length + ' icons');
