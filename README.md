# CakePHP Documentation Theme

A distributable [VitePress](https://vitepress.dev/) theme for CakePHP documentation sites. Install it as an npm dependency — it provides the CakePHP-branded theme, default config, and shared assets.

## Features

- CakePHP branded theme extending VitePress default (custom fonts, colors, components)
- Base config with sensible defaults (favicon, analytics, search, footer)
- Text substitutions for version placeholders (`|phpversion|`, etc.)
- Version banner component for outdated docs
- Public asset syncing (favicon, fonts, icons, logo)

## Using in a docs project

### 1. Install

```bash
npm install @cakephp/docs-skeleton vitepress
```

### 2. Scaffold boilerplate

```bash
npx cakedocs init
```

This creates two files:

| File | Purpose |
|---|---|
| `.vitepress/config.js` | Extends the skeleton's base config |
| `.vitepress/theme/index.js` | Re-exports the CakePHP theme |

### 3. Configure

Edit `.vitepress/config.js` — your overrides are merged with the base config via VitePress `extends`:

```javascript
import baseConfig from '@cakephp/docs-skeleton/config'

export default {
  extends: baseConfig,
  base: '/5.x/',
  themeConfig: {
    sidebar: [],
    nav: [],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cakephp/cakephp' },
    ],
  },
  substitutions: {
    '|phpversion|': { value: '8.4', format: 'bold' },
    '|minphpversion|': { value: '8.1', format: 'italic' },
  },
}
```

### 4. Add scripts to `package.json`

```json
{
  "scripts": {
    "docs:dev":     "vitepress dev",
    "docs:build":   "vitepress build",
    "docs:preview": "vitepress preview"
  }
}
```

### 5. Run

```bash
npm run docs:dev
```

### Project structure

```
your-project/
├── .vitepress/
│   ├── config.js              ← extends base config
│   └── theme/
│       └── index.js           ← re-exports theme
├── docs/
│   └── index.md
└── package.json
```

---

## Extending the theme

The theme re-export in `.vitepress/theme/index.js` can be customized:

```javascript
import CakephpTheme from '@cakephp/docs-skeleton'
import { h } from 'vue'
import MyBanner from './components/MyBanner.vue'

export default {
  extends: CakephpTheme,
  Layout() {
    return h(CakephpTheme.Layout, null, {
      'layout-top': () => h(MyBanner),
    })
  }
}
```

## Text Substitutions

Define placeholders replaced automatically in all Markdown:

```javascript
export default {
  extends: baseConfig,
  substitutions: {
    '|phpversion|':    { value: '8.4', format: 'bold' },
    '|minphpversion|': { value: '8.1', format: 'italic' },
    '|cakeversion|':   '5.2',
  }
}
```

In Markdown: `Requires PHP |phpversion| or higher.` renders as: Requires PHP **8.4** or higher.

## Version Banner

```javascript
export default {
  extends: baseConfig,
  themeConfig: {
    versionBanner: {
      message: 'You are viewing docs for an older version.',
      link: '/latest/',
      linkText: 'Go to latest docs.'
    }
  }
}
```

---

## Skeleton development

To work on the skeleton theme itself:

```bash
npm install
npm run docs:dev      # preview at http://localhost:5173
npm run docs:build
npm run lint
npm run lint:fix
```

## License

Licensed under The MIT License. For full copyright and license information, please see the [LICENSE](LICENSE) file.
