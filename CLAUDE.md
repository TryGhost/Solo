# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal fork of the [TryGhost/Solo](https://github.com/TryGhost/Solo) Ghost theme, used for evanw.com. The fork is maintained as a long-running branch with additive customizations while staying mergeable with upstream.

## Commands

```bash
yarn              # Install dependencies
yarn dev          # Build and watch for changes (Gulp with livereload)
yarn test         # Run gscan theme validator
yarn zip          # Package theme to dist/solo.zip for upload
```

## Customization Strategy

**Keep customizations isolated to minimize merge conflicts with upstream:**

- **CSS**: All custom styles go in `assets/css/custom.css` (imported at end of `screen.css`)
- **JavaScript**: All custom scripts go in `assets/js/custom.js` (conditionally included by `gulpfile.js` if file exists)

Current customizations:
- Anchor links for headings with copy-to-clipboard functionality (CSS + JS)

## Architecture

### Template System (Handlebars)
- `default.hbs` - Master layout (header, nav, footer)
- Page templates extend default: `index.hbs`, `post.hbs`, `page.hbs`, `author.hbs`, `tag.hbs`
- `partials/` - Reusable components (`loop.hbs` for post cards, `icons/` for SVGs)

### Build Pipeline (Gulp)
- CSS: `assets/css/screen.css` → PostCSS (easyimport, autoprefixer, cssnano) → `assets/built/screen.css`
- JS: Ghost shared assets → local libs → `main.js` → `custom.js` → concatenate/uglify → `assets/built/main.min.js`

### Theme Customization Options (package.json config)
Body classes drive layout variations:
- `navigation_layout`: Logo position (left/middle/stacked)
- `typography`: Font family (sans-serif/serif/mono)
- `header_section_layout`: Homepage hero style
- `post_feed_layout`: Post card style (Classic/Typographic/Parallax)
