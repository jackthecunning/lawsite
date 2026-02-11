// Image URL utility for handling local vs S3 images

export const getImageUrl = (imagePath) => {
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const environment = import.meta.env.VITE_ENVIRONMENT;

  // If no base URL is set (development), use local images
  if (!baseUrl || environment === 'development') {
    return `/${imagePath}`;
  }

  // Production: use S3 or CDN URL
  return `${baseUrl}/${imagePath}`;
};

export const getAttorneyImageUrl = (attorneyImage) => {
  // If the path already includes the folder structure, use as-is
  if (attorneyImage.startsWith('images/')) {
    return getImageUrl(attorneyImage);
  }

  // Otherwise, prepend the attorneys folder path
  return getImageUrl(`images/attorneys/${attorneyImage}`);
};

export const getBannerImageUrl = (bannerImage) => {
  // If the path already includes the folder structure, use as-is
  if (bannerImage.startsWith('images/') || bannerImage.startsWith('/images/')) {
    // Strip leading slash if present and use getImageUrl to properly handle S3 URLs
    const cleanPath = bannerImage.startsWith('/') ? bannerImage.substring(1) : bannerImage;
    return getImageUrl(cleanPath);
  }

  // Otherwise, prepend the banner folder path
  return getImageUrl(`images/banner/${bannerImage}`);
};

// For cases where you need to check if we're using local images
export const isUsingLocalImages = () => {
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const environment = import.meta.env.VITE_ENVIRONMENT;
  return !baseUrl || environment === 'development';
};