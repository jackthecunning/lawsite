import { useState } from 'react';

const BannerImage = ({
  src,
  alt = 'Banner Image',
  className = '',
  style = {}
}) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setLoading(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  // Use default banner if there's an error or no src provided
  const imageSrc = imageError || !src
    ? '/images/defaults/default-banner.svg'
    : src;

  return (
    <div className={`banner-image-container ${className}`} style={style}>
      {loading && (
        <div className="banner-loading-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{
          display: loading ? 'none' : 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default BannerImage;