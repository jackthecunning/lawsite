// Preload all attorney images in public/images/attorneys for browser cache
// Pass an array of filenames (not full paths)
export function preloadAttorneyImages(filenames) {
  if (typeof window === 'undefined') return;
  filenames.forEach((filename) => {
    const url = `/images/attorneys/${filename}`;
    const img = new window.Image();
    img.src = url;
  });
}