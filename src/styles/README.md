# CSS File Organization

The CSS has been split into modular files for better maintainability. All files are automatically imported in `main.jsx` and bundled by Vite during build.

## File Structure

### Core Styles
- **base.css** - Reset, global styles, container, buttons, section headers, animations
- **navbar.css** - Navigation bar and menu styles
- **footer.css** - Footer component styles

### Page Sections
- **hero.css** - Hero/banner section with slideshow
- **about.css** - About section styles
- **services.css** - Practice areas section with sidebar layout
- **attorneys.css** - Attorney carousel section on home page
- **news.css** - News section and news page styles
- **contact.css** - Contact section and form styles

### Detail Pages
- **team.css** - Team page with full attorney grid
- **practice-areas.css** - Practice areas listing page
- **practice-area-detail.css** - Individual practice area detail pages
- **attorney-detail.css** - Individual attorney profile pages

### Utilities
- **animations.css** - Keyframes and animation classes
- **responsive.css** - Media queries and responsive breakpoints

## Import Order

Files are imported in `main.jsx` in dependency order:
1. Base styles first (resets, globals)
2. Layout components (navbar, footer)
3. Page sections
4. Detail pages
5. Utilities last (animations, responsive)

## Build Process

Vite automatically:
- Bundles all CSS files into a single optimized file
- Minifies the output
- Handles vendor prefixing
- Processes imports at build time

No runtime overhead - everything is compiled into one CSS file for production.
