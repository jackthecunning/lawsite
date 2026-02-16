
// Vite import.meta.glob for static image imports (ESM compatible)
const modules = import.meta.glob('../../public/images/attorneys/*', { eager: true, import: 'default' });


// Build a lookup by filename only (no path)
const images = {};
for (const path in modules) {
  const fileName = path.split('/').pop();
  images[fileName] = modules[path];
}

export default images;
