const fs = require('fs');
const icons = require('./built-icons.json');
const iconNameList = [...new Set(Object.keys(icons).map(i => i.split('-')[0]))];
const shortNames = {
  js: 'javascript', ts: 'typescript', py: 'python', tailwind: 'tailwindcss',
  vue: 'vuejs', nuxt: 'nuxtjs', go: 'golang', cf: 'cloudflare',
  wasm: 'webassembly', postgres: 'postgresql', k8s: 'kubernetes',
  next: 'nextjs', mongo: 'mongodb', md: 'markdown', ps: 'photoshop',
  ai: 'illustrator', pr: 'premiere', ae: 'aftereffects', scss: 'sass',
  sc: 'scala', net: 'dotnet', gatsbyjs: 'gatsby', gql: 'graphql',
  vlang: 'v', amazonwebservices: 'aws', bots: 'discordbots',
  express: 'expressjs', googlecloud: 'gcp', mui: 'materialui',
  windi: 'windicss', unreal: 'unrealengine', nest: 'nestjs',
  ktorio: 'ktor', pwsh: 'powershell', au: 'audition',
  rollup: 'rollupjs', rxjs: 'reactivex', rxjava: 'reactivex',
  ghactions: 'githubactions', sklearn: 'scikitlearn',
};

const required = ['typescript', 'javascript', 'jquery', 'tailwindcss', 'html5', 'css3', 'bootstrap', 'angular', 'rxjs', 'sass', 'chartjs', 'ejs', 'electron', 'expressjs', 'nestjs', 'pnpm', 'mongodb', 'postgres', 'prisma', 'nodejs', 'nodemon', 'java', 'socketio', 'postman', 'aws', 'googlecloud', 'netlify', 'vercel', 'nginx', 'github', 'ffmpeg', 'notion', 'eslint', 'docker', 'prettier', 'git', 'photoshop', 'canva', 'figma', 'framer', 'adobexd', 'blender', 'arduino'];

const missing = [];
for (let name of required) {
  let found = iconNameList.includes(name);
  if (!found) {
    if (shortNames[name] && iconNameList.includes(shortNames[name])) {
      found = true;
    }
  }
  if (!found) {
    missing.push(name);
  }
}
console.log('Missing SVGs for:', missing);
