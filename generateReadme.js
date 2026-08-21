const fs = require('fs');

const readmeTemplate = `
<h1 align="center">✨ Icon Space</h1>

<h3 align="center">Showcase your skills on your GitHub or resumé with beautifully designed icons!</h3>

<p align="center">
  <a href="https://icon-space.vercel.app">
    <img align="center" src="https://icon-space.vercel.app/icons?i=ts,react,next,tailwind,x,whatsapp,linkedin,aws,linux,git,github,figma&theme=dark&perline=6"/>
  </a>
</p>

<p align="center">
  <em>Powered by Google AI Studio. Open source on <a href="https://github.com/albindavidc/icon-space">GitHub</a>.</em>
</p>

<hr>

## 🚀 What's New in Icon Space?
Icon Space introduces several powerful features on top of the original icon sets:

- **🎨 Interactive Builder UI**: Easily search, click, and customize your icons directly on our new website ([icon-space.vercel.app](https://icon-space.vercel.app)). No more guessing icon names!
- **📦 Custom Sizing**: Export icons with a custom size parameter (\`&size=\`) to perfectly fit your README.
- **✨ New Icons**: Added highly requested icons like \`X (Twitter)\`, \`WhatsApp\`, \`GitHub Actions\`, \`Stripe\`, \`Lucide\`, \`Radix UI\`, \`Shadcn UI\`, and many more!
- **📋 Export Options**: One-click copy for Markdown, HTML, and raw URLs right from the builder.

## 📖 Docs

- [Interactive Builder (Recommended!)](#interactive-builder)
- [Specifying Icons](#specifying-icons)
- [Themed Icons](#themed-icons)
- [Icons Per Line](#icons-per-line)
- [Custom Size](#custom-size)

## Interactive Builder

The easiest way to generate your icon link is using our new **[Interactive Builder](https://icon-space.vercel.app)**. 
Simply click the icons you want, adjust the theme, layout, and size, and copy the generated Markdown!

## Specifying Icons

Copy and paste the code block below into your readme to add the skills icon element!

Change the \`?i=js,html,css\` to a list of your skills separated by \`,\`!

\`\`\`md
[![My Skills](https://icon-space.vercel.app/icons?i=js,html,css,wasm)](https://icon-space.vercel.app)
\`\`\`

[![My Skills](https://icon-space.vercel.app/icons?i=js,html,css,wasm)](https://icon-space.vercel.app)

## Themed Icons

Some icons have a dark and light themed background. You can specify which theme you want as a url parameter (\`&theme=light\` or \`&theme=dark\`). 

This is optional. The default theme is \`dark\`.

\`\`\`md
[![My Skills](https://icon-space.vercel.app/icons?i=java,kotlin,nodejs,figma&theme=light)](https://icon-space.vercel.app)
\`\`\`

[![My Skills](https://icon-space.vercel.app/icons?i=java,kotlin,nodejs,figma&theme=light)](https://icon-space.vercel.app)

## Icons Per Line

You can specify how many icons you would like per line using the \`perline\` argument (default is 15).

\`\`\`md
[![My Skills](https://icon-space.vercel.app/icons?i=aws,gcp,azure,react,vue,flutter&perline=3)](https://icon-space.vercel.app)
\`\`\`

[![My Skills](https://icon-space.vercel.app/icons?i=aws,gcp,azure,react,vue,flutter&perline=3)](https://icon-space.vercel.app)

## Custom Size

You can now adjust the size of the icons! Use the \`&size=\` parameter (default is 48).

\`\`\`md
[![My Skills](https://icon-space.vercel.app/icons?i=react,ts,tailwind&size=32)](https://icon-space.vercel.app)
\`\`\`

[![My Skills](https://icon-space.vercel.app/icons?i=react,ts,tailwind&size=32)](https://icon-space.vercel.app)

## 💖 Support the Project

To support the project directly, feel free to open issues for icon suggestions, or contribute with a pull request on [GitHub](https://github.com/albindavidc/icon-space)!
`;

fs.writeFileSync('readme.md', readmeTemplate);
console.log('readme.md updated successfully');
