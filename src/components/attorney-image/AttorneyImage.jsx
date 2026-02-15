import { useState } from 'react';
import { getAttorneyImageUrl } from '../../utils/imageUtils';
import defaultAttorney from '/images/defaults/default-attorney.svg';

const AttorneyImage = ({
  src,
  alt,
  className = '',
  style = {},
  priority = false
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

  // Use default image if there's an error or no src provided
  const imageSrc = imageError || !src
    ? defaultAttorney
    : (typeof src === 'string' ? getAttorneyImageUrl(src) : src);

  return (
    <div className={`attorney-image-container ${className}`} style={style}>
      {loading && (
        <div className="image-loading-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt || 'Attorney'}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading={priority ? 'eager' : 'lazy'}
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

export default AttorneyImage;