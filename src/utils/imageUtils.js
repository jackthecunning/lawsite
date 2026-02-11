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
    // If it starts with /, it's already a full path from public folder
    return bannerImage.startsWith('/') ? bannerImage : getImageUrl(bannerImage);
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