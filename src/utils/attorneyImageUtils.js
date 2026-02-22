// Returns the correct URL for attorney images, depending on environment.
// Usage: getAttorneyImageUrl('Ahern-Brian.jpg')

export function getAttorneyImageUrl(filename) {
  // If filename is already a full URL, return as-is
  if (/^https?:\/\//.test(filename)) return filename;

  // Production: S3/CDN
  if (import.meta.env.MODE === 'production' || import.meta.env.VITE_USE_S3 === 'true') {
    // Customize this base URL to match your S3 bucket
    const baseUrl = 'https://swartz-campbell.s3.amazonaws.com/images/attorneys/';
    return baseUrl + filename;
  }

  // Development: local public folder
  return `/images/attorneys/${filename}`;
}
