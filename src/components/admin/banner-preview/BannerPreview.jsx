import { useState } from 'react';
import './BannerPreview.css';
import '../../hero/Hero.css';

function BannerPreview({ onBack }) {
  const [bannerImage, setBannerImage] = useState('/images/banner/default-banner.jpg');
  const [selectedSize, setSelectedSize] = useState('all');
  const [imageUrl, setImageUrl] = useState('');
  const [showGrid, setShowGrid] = useState(true);
  const [showSafeZone, setShowSafeZone] = useState(false);

  const existingBanners = [
    { name: 'Baltimore', path: '/images/banner/Baltimore.jpeg' },
    { name: 'Cleveland', path: '/images/banner/Cleveland.jpeg' },
    { name: 'New York', path: '/images/banner/NewYork.jpg' },
    { name: 'Philadelphia', path: '/images/banner/Philly.png' },
    { name: 'Philadelphia 2', path: '/images/banner/philly_2.png' },
    { name: 'Philadelphia 3', path: '/images/banner/philly_3.png' },
    { name: 'Pittsburgh', path: '/images/banner/Pittsburg.jpg' },
    { name: 'Wilmington', path: '/images/banner/Wilmington.jpeg' },
  ];

  const screenSizes = [
    { id: 'mobile', name: 'Mobile', width: '375px', height: '100vh', minHeight: '600px', icon: 'fa-mobile-alt' },
    { id: 'tablet', name: 'Tablet', width: '768px', height: '100vh', minHeight: '700px', icon: 'fa-tablet-alt' },
    { id: 'laptop', name: 'Laptop', width: '1024px', height: '100vh', minHeight: '800px', icon: 'fa-laptop' },
    { id: 'desktop', name: 'Desktop', width: '1440px', height: '100vh', minHeight: '900px', icon: 'fa-desktop' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      setBannerImage(imageUrl);
    }
  };

  const handleReset = () => {
    setBannerImage('/images/banner/default-banner.jpg');
    setImageUrl('');
  };

  const getYearsSinceFounding = () => {
    const foundingYear = 1921;
    const currentYear = new Date().getFullYear();
    return currentYear - foundingYear;
  };

  const displayedSizes = selectedSize === 'all'
    ? screenSizes
    : screenSizes.filter(size => size.id === selectedSize);

  return (
    <div className="banner-preview-panel">
      <div className="panel-header">
        <div>
          <button className="btn-back" onClick={onBack}>
            <i className="fas fa-arrow-left"></i> Back to Settings
          </button>
          <h2>Banner Preview Tool</h2>
          <p className="panel-subtitle">Live preview of the actual Hero component with different banner images at various screen sizes. See exactly how images are cropped with background-size: cover.</p>
        </div>
      </div>

      <div className="banner-controls">
        <div className="control-section">
          <h3>Choose Existing Banner</h3>
          <div className="banner-gallery">
            {existingBanners.map((banner) => (
              <div
                key={banner.path}
                className={`banner-thumbnail ${bannerImage === banner.path ? 'active' : ''}`}
                onClick={() => setBannerImage(banner.path)}
                style={{ backgroundImage: `url(${banner.path})` }}
              >
                <div className="banner-thumbnail-overlay">
                  <span>{banner.name}</span>
                  {bannerImage === banner.path && (
                    <i className="fas fa-check-circle"></i>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3>Image Source</h3>
          <div className="image-upload-section">
            <div className="upload-option">
              <label className="upload-label">
                <i className="fas fa-upload"></i> Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="url-option">
              <div className="url-input-group">
                <input
                  type="text"
                  placeholder="Or paste image URL..."
                  value={imageUrl}
                  onChange={handleUrlChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                />
                <button onClick={handleUrlSubmit} className="btn-submit-url">
                  <i className="fas fa-check"></i>
                </button>
              </div>
            </div>

            <button className="btn-reset" onClick={handleReset}>
              <i className="fas fa-redo"></i> Reset to Default
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Screen Size Filter</h3>
          <div className="size-filters">
            <button
              className={`filter-btn ${selectedSize === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSize('all')}
            >
              <i className="fas fa-th"></i> All Sizes
            </button>
            {screenSizes.map(size => (
              <button
                key={size.id}
                className={`filter-btn ${selectedSize === size.id ? 'active' : ''}`}
                onClick={() => setSelectedSize(size.id)}
              >
                <i className={`fas ${size.icon}`}></i> {size.name}
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3>Composition Tools</h3>
          <div className="composition-controls">
            <label className="toggle-control">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              <span>Show Rule of Thirds Grid</span>
            </label>            <label className="toggle-control">
              <input
                type="checkbox"
                checked={showSafeZone}
                onChange={(e) => setShowSafeZone(e.target.checked)}
              />
              <span>Show Safe Zone (90% central area)</span>
            </label>          </div>
        </div>
      </div>

      <div className="preview-grid">
        {displayedSizes.map(size => (
          <div key={size.id} className="preview-card">
            <div className="preview-header">
              <div className="preview-title">
                <i className={`fas ${size.icon}`}></i>
                <span>{size.name}</span>
              </div>
              <div className="preview-dimensions">
                {size.width} × {size.minHeight}+
              </div>
            </div>
            <div
              className="preview-viewport"
              style={{
                width: selectedSize === 'all' ? '100%' : size.width,
                maxWidth: size.width
              }}
            >
              <section className="hero preview-hero" style={{ minHeight: size.minHeight }}>
                <div className="hero-background">
                  <div className="hero-slide active">
                    <img
                      src={bannerImage}
                      alt="Banner Preview"
                      className="hero-banner-image"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                  <div className="hero-text-wrapper">
                    <h1 className="firm-name">
                      <span className="firm-name-main">
                        <span className="capital-letter">S</span>wartz <span className="capital-letter">C</span>ampbell
                      </span>
                    </h1>
                    <div className="anniversary-wrapper">
                      <p className="anniversary-text">
                        <span className="celebrating">Celebrating </span>
                        <span className="years-number">{getYearsSinceFounding()} </span>
                        <span className="years-label">Years</span>
                      </p>
                      <p className="legal-excellence">of Legal Excellence</p>
                    </div>
                  </div>
                </div>
                {showSafeZone && (
                  <div className="safe-zone">
                    <div className="safe-zone-border"></div>
                    <div className="safe-zone-label">Safe Zone - Keep important content here</div>
                  </div>
                )}
                {showGrid && (
                  <div className="rule-of-thirds-grid">
                    <div className="grid-line grid-vertical" style={{ left: '33.333%' }}></div>
                    <div className="grid-line grid-vertical" style={{ left: '66.666%' }}></div>
                    <div className="grid-line grid-horizontal" style={{ top: '33.333%' }}></div>
                    <div className="grid-line grid-horizontal" style={{ top: '66.666%' }}></div>
                    <div className="grid-point" style={{ left: '33.333%', top: '33.333%' }}></div>
                    <div className="grid-point" style={{ left: '66.666%', top: '33.333%' }}></div>
                    <div className="grid-point" style={{ left: '33.333%', top: '66.666%' }}></div>
                    <div className="grid-point" style={{ left: '66.666%', top: '66.666%' }}></div>
                  </div>
                )}
              </section>
            </div>
            <div className="preview-info">
              <div className="info-item">
                <i className="fas fa-ruler-horizontal"></i>
                <span>Viewport: {size.width}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-ruler-vertical"></i>
                <span>Min Height: {size.minHeight}</span>
              </div>
              <div className="info-item crop-note">
                <i className="fas fa-crop"></i>
                <span>Image maintains aspect ratio - edges may be cropped</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="banner-tips">
        <h3><i className="fas fa-lightbulb"></i> Important: Images Are Cropped, Not Stretched</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <strong>Cropping Behavior:</strong> Images use background-size: cover - they scale to fill the viewport while maintaining aspect ratio, cropping edges as needed
          </div>
          <div className="tip-card">
            <strong>Safe Zone:</strong> Keep important content within the central 90% of the image to avoid cropping on different screen sizes and aspect ratios
          </div>
          <div className="tip-card">
            <strong>Aspect Ratios:</strong> Different devices have different aspect ratios (mobile is taller, desktop is wider) - edges will be cropped differently
          </div>
          <div className="tip-card">
            <strong>Center Positioning:</strong> Images are positioned at center - content in the middle is most likely to be visible across all devices
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerPreview;
