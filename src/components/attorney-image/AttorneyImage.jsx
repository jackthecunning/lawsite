
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


  // Use public URL for attorney images
  let imageSrc;
  if (imageError || !src) {
    imageSrc = defaultAttorney;
  } else if (typeof src === 'string') {
    // If the src already starts with /images/attorneys, use as is, else prepend
    imageSrc = src.startsWith('/images/attorneys') || src.startsWith('images/attorneys')
      ? (src.startsWith('/') ? src : '/' + src)
      : `/images/attorneys/${src}`;
  } else {
    imageSrc = defaultAttorney;
  }

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
        loading="eager"
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