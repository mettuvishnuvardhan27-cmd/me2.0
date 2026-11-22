import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { projects, site } from '../src/content.js'

const template = await readFile('dist/index.html', 'utf8')
const escape = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character])
const pages = projects.map(project => ({
  path: `/projects/${project.id}/`,
  title: `${project.title} | Mettu Vishnu Vardhan`,
  description: project.description,
  image: project.image
}))

function makePage({ path, title, description, image }) {
  const url = site + path
  return template
    .replace(/<title>[^<]+<\/title>/, () => `<title>${escape(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]+/, (_, prefix) => prefix + escape(description))
    .replace(/(<meta property="og:description" content=")[^"]+/, (_, prefix) => prefix + escape(description))
    .replace(/(<meta property="og:title" content=")[^"]+/, (_, prefix) => prefix + escape(title))
    .replace(/(<meta property="og:url" content=")[^"]+/, (_, prefix) => prefix + url)
    .replace(/(<link rel="canonical" href=")[^"]+/, (_, prefix) => prefix + url)
    .replace(/(<meta property="og:image" content=")[^"]+/, (_, prefix) => prefix + site + (image || '/share.png'))
}

await Promise.all(pages.map(async page => {
  const directory = `dist${page.path}`
  await mkdir(directory, { recursive: true })
  await writeFile(`${directory}index.html`, makePage(page))
}))
await writeFile('dist/404.html', makePage({
  path: '/404.html', title: 'Page not found | Mettu Vishnu Vardhan',
  description: 'Find current work and contact Mettu Vishnu Vardhan.'
}).replace('</head>', '<meta name="robots" content="noindex">\n</head>'))
await mkdir('dist/contact', { recursive: true })
await writeFile('dist/contact/index.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/#contact"><meta name="robots" content="noindex"><title>Contact | Mettu Vishnu Vardhan</title></head><body><a href="/#contact">Continue to the contact section</a></body></html>')
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${['/', ...pages.map(page => page.path)].map(path => `  <url><loc>${site}${path}</loc></url>`).join('\n')}
</urlset>
`)
