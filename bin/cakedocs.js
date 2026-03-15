#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const [, , command] = process.argv

const VITEPRESS_CONFIG_TEMPLATE = `import baseConfig from '@cakephp/docs-skeleton/config'

export default {
  extends: baseConfig,

  // Your overrides here
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cakephp/cakephp' },
    ],
    editLink: {
      pattern: 'https://github.com/cakephp/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    sidebar: [],
    nav: [],
  },
}
`

const THEME_INDEX_TEMPLATE = `export { default } from '@cakephp/docs-skeleton'
`

function writeIfMissing(filePath, content, label) {
  if (existsSync(filePath)) {
    console.log(`  skip  ${label} (already exists)`)
    return
  }
  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, content, 'utf8')
  console.log(`  create ${label}`)
}

function runInit() {
  const cwd = process.cwd()
  console.log(`Scaffolding @cakephp/docs-skeleton in ${cwd}\n`)

  writeIfMissing(join(cwd, '.vitepress', 'config.js'), VITEPRESS_CONFIG_TEMPLATE, '.vitepress/config.js')
  writeIfMissing(join(cwd, '.vitepress', 'theme', 'index.js'), THEME_INDEX_TEMPLATE, '.vitepress/theme/index.js')

  console.log(`
Done! Next steps:

  1. Add your docs to docs/
  2. Edit .vitepress/config.js to set your sidebar, nav, and other options
  3. Run: npx vitepress dev
`)
}

switch (command) {
  case 'init':
    runInit()
    break
  default:
    console.log(`
Usage: cakedocs <command>

Commands:
  init    Scaffold .vitepress/config.js and .vitepress/theme/index.js
`)
    process.exit(command ? 1 : 0)
}
