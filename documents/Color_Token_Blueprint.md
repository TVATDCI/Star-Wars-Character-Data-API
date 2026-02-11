# Star Wars Character Database - Color Token Blueprint

## Overview

This document outlines the plan for implementing a centralized color token system using Tailwind CSS v4.1's `@theme` directive. The goal is to create a maintainable, consistent, and themeable color system that aligns with the Star Wars aesthetic while providing flexibility for future theming.

## Current State Analysis

### Current Color Usage (from code audit)

| Color Purpose            | Current Tailwind Classes                      | Hex/RGBA Values       |
| ------------------------ | --------------------------------------------- | --------------------- |
| **Background (primary)** | `bg-neutral-900`, `bg-black`                  | `#000000`, `#171717`  |
| **Background (card)**    | `bg-neutral-800/20`, `bg-neutral-800/5`       | rgba(38, 38, 38, 0.2) |
| **Text (primary)**       | `text-neutral-200`, `text-white`              | `#e5e5e5`, `#ffffff`  |
| **Text (secondary)**     | `text-neutral-400`, `text-neutral-300`        | `#a3a3a3`, `#d4d4d4`  |
| **Accent (primary)**     | `text-yellow-400`, `text-yellow-500`          | `#facc15`, `#eab308`  |
| **Accent (secondary)**   | `text-red-500`, `text-red-600`                | `#ef4444`, `#dc2626`  |
| **Border**               | `border-neutral-700/50`, `border-neutral-600` | rgba(64, 64, 64, 0.5) |
| **Success**              | `text-green-500`, `bg-green-500`              | `#22c55e`             |
| **Error**                | `text-red-500`, `bg-red-500`                  | `#ef4444`             |
| **Info**                 | `text-blue-400`                               | `#60a5fa`             |

### Problems with Current Approach

1. **Inconsistency**: Mixing `neutral-*` scale with arbitrary opacity values
2. **Hard to maintain**: Colors scattered across dozens of files
3. **No semantic meaning**: `neutral-400` doesn't convey purpose
4. **Difficult theming**: No centralized way to change the color palette
5. **Opacity chaos**: Various opacity values (`/20`, `/50`, `/5`) make it hard to track

## Proposed Color Token Architecture

### Design Tokens Structure

```
@theme
├── colors
│   ├── background
│   │   ├── DEFAULT (main page background)
│   │   ├── card (card/panel backgrounds)
│   │   ├── elevated (raised elements)
│   │   └── overlay (modal/backdrop backgrounds)
│   ├── foreground
│   │   ├── DEFAULT (primary text)
│   │   ├── muted (secondary text)
│   │   ├── subtle (tertiary text)
│   │   └── inverse (text on colored backgrounds)
│   ├── accent
│   │   ├── DEFAULT (primary accent - Star Wars yellow)
│   │   ├── hover (accent hover state)
│   │   ├── muted (accent with opacity)
│   │   └── contrast (text on accent background)
│   ├── semantic
│   │   ├── success
│   │   ├── warning
│   │   ├── error
│   │   └── info
│   ├── border
│   │   ├── DEFAULT
│   │   ├── muted
│   │   └── accent
│   └── star-wars
│       ├── lightsaber-green
│       ├── lightsaber-blue
│       ├── lightsaber-red
│       ├── hologram-cyan
│       └── empire-black
```

### Token Definitions

#### Background Colors

| Token                 | Value                   | Usage                   |
| --------------------- | ----------------------- | ----------------------- |
| `--color-bg`          | `#0a0a0a`               | Main page background    |
| `--color-bg-card`     | `rgba(23, 23, 23, 0.6)` | Card backgrounds        |
| `--color-bg-elevated` | `#171717`               | Raised elements, modals |
| `--color-bg-overlay`  | `rgba(0, 0, 0, 0.8)`    | Backdrops, overlays     |
| `--color-bg-input`    | `rgba(38, 38, 38, 0.5)` | Form inputs             |

#### Foreground (Text) Colors

| Token                  | Value     | Usage                            |
| ---------------------- | --------- | -------------------------------- |
| `--color-text`         | `#f5f5f5` | Primary text                     |
| `--color-text-muted`   | `#a3a3a3` | Secondary text, descriptions     |
| `--color-text-subtle`  | `#737373` | Tertiary text, placeholders      |
| `--color-text-inverse` | `#0a0a0a` | Text on light/accent backgrounds |

#### Accent Colors (Star Wars Yellow)

| Token                     | Value                    | Usage                             |
| ------------------------- | ------------------------ | --------------------------------- |
| `--color-accent`          | `#ffc500`                | Primary accent (Star Wars yellow) |
| `--color-accent-hover`    | `#ffdb4d`                | Hover state                       |
| `--color-accent-muted`    | `rgba(255, 197, 0, 0.2)` | Subtle accent backgrounds         |
| `--color-accent-contrast` | `#0a0a0a`                | Text on accent                    |

#### Semantic Colors

| Token                   | Value                    | Usage                         |
| ----------------------- | ------------------------ | ----------------------------- |
| `--color-success`       | `#22c55e`                | Success states, confirmations |
| `--color-success-muted` | `rgba(34, 197, 94, 0.2)` | Success backgrounds           |
| `--color-warning`       | `#eab308`                | Warnings, cautions            |
| `--color-error`         | `#ef4444`                | Errors, destructive actions   |
| `--color-error-muted`   | `rgba(239, 68, 68, 0.2)` | Error backgrounds             |
| `--color-info`          | `#3b82f6`                | Informational messages        |

#### Border Colors

| Token                   | Value                    | Usage              |
| ----------------------- | ------------------------ | ------------------ |
| `--color-border`        | `rgba(64, 64, 64, 0.5)`  | Default borders    |
| `--color-border-muted`  | `rgba(64, 64, 64, 0.3)`  | Subtle borders     |
| `--color-border-accent` | `rgba(255, 197, 0, 0.3)` | Accent borders     |
| `--color-border-focus`  | `#ffc500`                | Focus ring borders |

#### Star Wars Specific

| Token               | Value     | Usage                             |
| ------------------- | --------- | --------------------------------- |
| `--color-sw-green`  | `#2ff924` | Lightsaber green (Yoda, Luke)     |
| `--color-sw-blue`   | `#00b4d8` | Lightsaber blue (Obi-Wan, Anakin) |
| `--color-sw-red`    | `#ff2a2a` | Lightsaber red (Sith)             |
| `--color-sw-cyan`   | `#00f0ff` | Hologram effect                   |
| `--color-sw-purple` | `#9333ea` | Mace Windu, royalty               |

## Implementation Plan

### Phase 1: Setup Theme Configuration

Update `frontend/src/index.css`:

```css
@import 'tailwindcss';

@theme {
  /* Background Colors */
  --color-bg: #0a0a0a;
  --color-bg-card: rgba(23, 23, 23, 0.6);
  --color-bg-elevated: #171717;
  --color-bg-overlay: rgba(0, 0, 0, 0.8);
  --color-bg-input: rgba(38, 38, 38, 0.5);

  /* Foreground Colors */
  --color-text: #f5f5f5;
  --color-text-muted: #a3a3a3;
  --color-text-subtle: #737373;
  --color-text-inverse: #0a0a0a;

  /* Accent Colors */
  --color-accent: #ffc500;
  --color-accent-hover: #ffdb4d;
  --color-accent-muted: rgba(255, 197, 0, 0.2);
  --color-accent-contrast: #0a0a0a;

  /* Semantic Colors */
  --color-success: #22c55e;
  --color-success-muted: rgba(34, 197, 94, 0.2);
  --color-warning: #eab308;
  --color-error: #ef4444;
  --color-error-muted: rgba(239, 68, 68, 0.2);
  --color-info: #3b82f6;

  /* Border Colors */
  --color-border: rgba(64, 64, 64, 0.5);
  --color-border-muted: rgba(64, 64, 64, 0.3);
  --color-border-accent: rgba(255, 197, 0, 0.3);
  --color-border-focus: #ffc500;

  /* Star Wars Colors */
  --color-sw-green: #2ff924;
  --color-sw-blue: #00b4d8;
  --color-sw-red: #ff2a2a;
  --color-sw-cyan: #00f0ff;
  --color-sw-purple: #9333ea;
}
```

### Phase 2: Component Migration Strategy

Priority order for migration:

1. **High Priority** (Core UI):
   - `Button.jsx` and `SpaceBtn.jsx`
   - `Navigation.jsx`
   - `Toaster.jsx`

2. **Medium Priority** (Content Components):
   - `Characters.jsx`
   - `CharacterDetail.jsx`
   - `CharactersForm.jsx`

3. **Lower Priority** (Forms & Auth):
   - `LoginForm.jsx`
   - `RegisterForm.jsx`
   - `UserProfile.jsx`

4. **Low Priority** (Skeleton & UI):
   - `SkeletonCard.jsx`
   - `SkeletonDetail.jsx`
   - `InfoPage.jsx`

### Phase 3: Migration Examples

#### Before (Current)

```jsx
<div
  className='bg-neutral-800/20 backdrop-blur-sm p-6 rounded-xl 
                border border-neutral-700/50'
>
  <h2 className='text-2xl text-red-600 font-bold'>Characters</h2>
  <p className='text-neutral-400'>Description text</p>
  <button className='bg-yellow-500 text-neutral-900 px-4 py-2'>Action</button>
</div>
```

#### After (With Tokens)

```jsx
<div
  className='bg-bg-card backdrop-blur-sm p-6 rounded-xl 
                border border-border'
>
  <h2 className='text-2xl text-error font-bold'>Characters</h2>
  <p className='text-text-muted'>Description text</p>
  <button className='bg-accent text-accent-contrast px-4 py-2'>Action</button>
</div>
```

### Phase 4: Create Migration Script

Create a Node.js script to help with migration:

```javascript
// scripts/migrate-colors.js
const colorMap = {
  'bg-neutral-900': 'bg-bg',
  'bg-neutral-800/20': 'bg-bg-card',
  'bg-neutral-800/5': 'bg-bg-card',
  'text-neutral-200': 'text-text',
  'text-neutral-400': 'text-text-muted',
  'text-neutral-300': 'text-text-muted',
  'text-yellow-400': 'text-accent',
  'text-yellow-500': 'text-accent',
  'text-red-500': 'text-error',
  'text-red-600': 'text-error',
  'border-neutral-700/50': 'border-border',
  'border-neutral-600': 'border-border',
  // ... more mappings
};
```

## Benefits

1. **Consistency**: Single source of truth for all colors
2. **Maintainability**: Change colors in one place
3. **Theming**: Easy to implement dark/light mode or alternative themes
4. **Readability**: Semantic names convey purpose
5. **Design-Dev Sync**: Tokens can be shared with design tools

## Future Enhancements

1. **Dark/Light Mode**: Use CSS variables for runtime theme switching
2. **High Contrast Mode**: Accessibility-focused color palette
3. **Custom Themes**: Allow users to select "Jedi" vs "Sith" themes
4. **Design Tool Integration**: Export tokens to Figma/Sketch

## Migration Checklist

- [ ] Set up `@theme` directive in `index.css`
- [ ] Create color token documentation
- [ ] Migrate Button components
- [ ] Migrate Navigation
- [ ] Migrate Character components
- [ ] Migrate Form components
- [ ] Update Toaster styling
- [ ] Update Skeleton components
- [ ] Test all components visually
- [ ] Update documentation

## References

- [Tailwind CSS v4 Theme Documentation](https://tailwindcss.com/docs/theme)
- [Design Tokens W3C Specification](https://design-tokens.github.io/community-group/format/)
- [Star Wars Color Palette Inspiration](https://www.starwars.com/)

---

**Status**: Blueprint Complete ✅  
**Next Step**: Begin Phase 1 implementation (Theme Configuration)
