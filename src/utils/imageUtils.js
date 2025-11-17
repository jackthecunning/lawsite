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
  return getImageUrl(attorneyImage);
};

export const getBannerImageUrl = (bannerImage) => {
  return getImageUrl(bannerImage);
};

// For cases where you need to check if we're using local images
export const isUsingLocalImages = () => {
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const environment = import.meta.env.VITE_ENVIRONMENT;
  return !baseUrl || environment === 'development';
};