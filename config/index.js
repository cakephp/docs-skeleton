import { substitutionsReplacer } from '../.vitepress/plugins/substitutions-replacer.js'
import { applyBaseToHeadTags } from '../.vitepress/utils.js'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packagePublicDir = path.join(packageRoot, 'docs', 'public')
const packageThemeDir = path.join(packageRoot, '.vitepress', 'theme')
const skeletonPublicDirectories = ['favicon', 'fonts', 'icons']
const skeletonPublicFiles = ['logo.svg']

function copyDirectoryIfMissing(sourceDir, destinationDir) {
  if (!fs.existsSync(sourceDir)) {
    return
  }

  fs.mkdirSync(destinationDir, { recursive: true })

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name)
    const destinationPath = path.join(destinationDir, entry.name)

    if (entry.isDirectory()) {
      copyDirectoryIfMissing(sourcePath, destinationPath)
      continue
    }

    if (fs.existsSync(destinationPath)) {
      continue
    }

    fs.mkdirSync(path.dirname(destinationPath), { recursive: true })
    fs.copyFileSync(sourcePath, destinationPath)
  }
}

function copyFileIfMissing(sourcePath, destinationPath) {
  if (!fs.existsSync(sourcePath) || fs.existsSync(destinationPath)) {
    return
  }

  fs.mkdirSync(path.dirname(destinationPath), { recursive: true })
  fs.copyFileSync(sourcePath, destinationPath)
}

function syncSkeletonPublicAssets(consumerPublicDir) {
  for (const directoryName of skeletonPublicDirectories) {
    copyDirectoryIfMissing(
      path.join(packagePublicDir, directoryName),
      path.join(consumerPublicDir, directoryName)
    )
  }

  for (const fileName of skeletonPublicFiles) {
    copyFileIfMissing(
      path.join(packagePublicDir, fileName),
      path.join(consumerPublicDir, fileName)
    )
  }
}

function createSkeletonPublicAssetsPlugin() {
  return {
    name: 'cakephp-docs-skeleton-public-assets',
    configResolved(config) {
      const publicDir = config.publicDir
      if (publicDir) {
        syncSkeletonPublicAssets(publicDir)
      }
    }
  }
}

/**
 * Base VitePress config for CakePHP documentation.
 *
 * Use via `extends` in your .vitepress/config.js:
 *
 *   import baseConfig from '@cakephp/docs-skeleton/config'
 *   export default { extends: baseConfig, ... }
 */
const baseConfig = {
  srcDir: 'docs',
  title: 'CakePHP',
  description: 'CakePHP Documentation - The rapid development PHP framework',
  ignoreDeadLinks: true,
  substitutions: {
    '|phpversion|': { value: '8.4', format: 'bold' },
    '|minphpversion|': { value: '8.1', format: 'italic' },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'CakePHP' }],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }],
    [
      'script',
      {
        'data-collect-dnt': 'true',
        async: 'true',
        src: 'https://scripts.simpleanalyticscdn.com/latest.js'
      }
    ],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-MD3J6G9QVX' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MD3J6G9QVX', { 'anonymize_ip': true });`
    ]
  ],
  themeConfig: {
    logo: '/logo.svg',
    outline: {
      level: [2, 3],
    },
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Cake Software Foundation, Inc. All rights reserved.'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    versionBanner: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framework': ['vue']
        }
      }
    }
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(substitutionsReplacer, { substitutions: baseConfig.substitutions || {} })
    }
  },
  locales: {},
  themeDir: packageThemeDir,
  vite: {
    plugins: [
      createSkeletonPublicAssetsPlugin()
    ]
  }
}

export default baseConfig
