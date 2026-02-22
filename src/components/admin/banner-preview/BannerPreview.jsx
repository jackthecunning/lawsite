import { useState } from 'react';
import { getBannerImageUrl } from '../../../utils/imageUtils';
import { bannerImageManifest } from '../../../data/bannerImageManifest';
import './BannerPreview.css';
import '../../hero/Hero.css';
import '../../../pages/careers/Careers.css';

// Default background positions matching actual CSS
const DEFAULT_POSITIONS = {
  home: {
    x: 50,  // center (matches Hero.css background-position: center)
    y: 50   // center vertically
  },
  careers: {
    x: 50,  // center (matches Careers.css background-position: center 25%)
    y: 25   // 25% from top
  }
};

function BannerPreview({ onBack }) {
  const [bannerImage, setBannerImage] = useState(getBannerImageUrl('default-banner.jpg'));
  const [selectedSize, setSelectedSize] = useState('all');
  const [imageUrl, setImageUrl] = useState('');
  const [showGrid, setShowGrid] = useState(true);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [componentType, setComponentType] = useState('home'); // 'home' or 'careers'
  const [bgPositionX, setBgPositionX] = useState(DEFAULT_POSITIONS.home.x);
  const [bgPositionY, setBgPositionY] = useState(DEFAULT_POSITIONS.home.y);
  const [customHeight, setCustomHeight] = useState(''); // Optional height override

  // Use the manifest to generate the banner list
  const existingBanners = bannerImageManifest.map(filename => {
    const name = filename
      .replace(/\.[^/.]+$/, '')
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, c => c.toUpperCase());
    return { name, path: getBannerImageUrl(filename) };
  });

  const screenSizes = [
    {
      id: 'desktop',
      name: 'Desktop',
      landscape: { width: '1920px', height: '100vh', minHeight: '700px' },
      portrait: { width: '1080px', height: '100vh', minHeight: '1920px' },
      icon: 'fa-desktop'
    },
    {
      id: 'laptop',
      name: 'Laptop',
      landscape: { width: '1366px', height: '100vh', minHeight: '600px' },
      portrait: { width: '768px', height: '100vh', minHeight: '1366px' },
      icon: 'fa-laptop'
    },
    {
      id: 'tablet',
      name: 'Tablet',
      landscape: { width: '1024px', height: '100vh', minHeight: '550px' },
      portrait: { width: '768px', height: '100vh', minHeight: '1024px' },
      icon: 'fa-tablet-alt'
    },
    {
      id: 'mobile',
      name: 'Mobile',
      landscape: { width: '844px', height: '100vh', minHeight: '390px' },
      portrait: { width: '390px', height: '100vh', minHeight: '600px' },
      icon: 'fa-mobile-alt'
    },
    {
      id: 'ultrawide',
      name: 'Ultrawide',
      landscape: { width: '3440px', height: '100vh', minHeight: '700px' },
      portrait: { width: '1440px', height: '100vh', minHeight: '3440px' },
      icon: 'fa-tv'
    },
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
    setBannerImage(getBannerImageUrl('default-banner.jpg'));
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
          <p className="panel-subtitle">Live preview of the Home Hero and Careers Banner components with different banner images at various screen sizes. See exactly how images are cropped with background-size: cover.</p>
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
          <h3>Component Type</h3>
          <div className="size-filters">
            <button
              className={`filter-btn ${componentType === 'home' ? 'active' : ''}`}
              onClick={() => {
                setComponentType('home');
                setBgPositionX(DEFAULT_POSITIONS.home.x);
                setBgPositionY(DEFAULT_POSITIONS.home.y);
                setCustomHeight('');
              }}
            >
              <i className="fas fa-home"></i> Home Hero
            </button>
            <button
              className={`filter-btn ${componentType === 'careers' ? 'active' : ''}`}
              onClick={() => {
                setComponentType('careers');
                setBgPositionX(DEFAULT_POSITIONS.careers.x);
                setBgPositionY(DEFAULT_POSITIONS.careers.y);
                setCustomHeight('');
              }}
            >
              <i className="fas fa-briefcase"></i> Careers Banner
            </button>
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
            </label>
            <label className="toggle-control">
              <input
                type="checkbox"
                checked={showSafeZone}
                onChange={(e) => setShowSafeZone(e.target.checked)}
              />
              <span>Show Safe Zone (90% central area)</span>
            </label>
            <label className="toggle-control">
              <input
                type="checkbox"
                checked={isPortrait}
                onChange={(e) => setIsPortrait(e.target.checked)}
              />
              <span>
                <i className={`fas ${isPortrait ? 'fa-mobile-alt' : 'fa-desktop'}`}></i>
                {' '}Portrait Mode
              </span>
            </label>
          </div>
        </div>

        <div className="control-section">
          <h3>Image Positioning & Sizing</h3>
          <div className="position-controls">
            <div className="control-group">
              <label>
                Horizontal Position: <strong>{bgPositionX}%</strong>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bgPositionX}
                  onChange={(e) => setBgPositionX(parseInt(e.target.value))}
                  className="position-slider"
                />
                <div className="slider-labels">
                  <span>Left</span>
                  <span>Center</span>
                  <span>Right</span>
                </div>
              </label>
            </div>
            <div className="control-group">
              <label>
                Vertical Position: <strong>{bgPositionY}%</strong>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bgPositionY}
                  onChange={(e) => setBgPositionY(parseInt(e.target.value))}
                  className="position-slider"
                />
                <div className="slider-labels">
                  <span>Top</span>
                  <span>Center</span>
                  <span>Bottom</span>
                </div>
              </label>
            </div>
            <div className="control-group">
              <label>
                Custom Height Override (px):
                <input
                  type="number"
                  min="300"
                  max="2000"
                  step="10"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  placeholder={componentType === 'home' ? 'Auto (100vh)' : 'Auto (clamp)'}
                  className="height-input"
                />
              </label>
              {customHeight && (
                <button
                  className="btn-clear-height"
                  onClick={() => setCustomHeight('')}
                >
                  <i className="fas fa-times"></i> Clear Override
                </button>
              )}
            </div>
            <button
              className="btn-reset-position"
              onClick={() => {
                const defaults = DEFAULT_POSITIONS[componentType];
                setBgPositionX(defaults.x);
                setBgPositionY(defaults.y);
                setCustomHeight('');
              }}
            >
              <i className="fas fa-undo"></i> Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      <div className="preview-grid">
        {displayedSizes.map(size => {
          const orientation = isPortrait ? size.portrait : size.landscape;

          // Calculate scale to fit preview in viewport
          const widthNum = parseInt(orientation.width);
          const heightNum = parseInt(orientation.minHeight);

          // Calculate careers banner height based on clamp(450px, 60vh, 550px)
          // Using typical viewport heights for each device
          let careersHeight;
          if (isPortrait) {
            // Portrait mode - use the actual height as viewport height
            const vh60 = heightNum * 0.6;
            careersHeight = Math.max(450, Math.min(vh60, 550));
          } else {
            // Landscape mode - use typical viewport heights
            let viewportHeight;
            if (size.id === 'ultrawide') viewportHeight = 1440;
            else if (size.id === 'desktop') viewportHeight = 1080;
            else if (size.id === 'laptop') viewportHeight = 768;
            else if (size.id === 'tablet') viewportHeight = 768;
            else viewportHeight = 390; // mobile

            const vh60 = viewportHeight * 0.6;
            careersHeight = Math.max(450, Math.min(vh60, 550));
          }

          // Max dimensions for preview display
          const maxDisplayWidth = 2400; // Max width before scaling (accommodates ultrawide)
          const maxDisplayHeight = 1000; // Max height before scaling

          // Calculate scale based on width and height constraints
          const scaleByWidth = widthNum > maxDisplayWidth ? maxDisplayWidth / widthNum : 1;
          const scaleByHeight = heightNum > maxDisplayHeight ? maxDisplayHeight / heightNum : 1;
          const scale = Math.min(scaleByWidth, scaleByHeight);

          return (
          <div key={size.id} className="preview-card">
            <div className="preview-header">
              <div className="preview-title">
                <i className={`fas ${size.icon}`}></i>
                <span>{size.name} ({isPortrait ? 'Portrait' : 'Landscape'})</span>
              </div>
              <div className="preview-dimensions">
                {orientation.width} × {
                  customHeight
                    ? `${customHeight}px (custom)`
                    : componentType === 'home'
                      ? `${orientation.minHeight}+`
                      : `${Math.round(careersHeight)}px`
                }
                {' '}
                {isPortrait && scale < 1 ? `(${Math.round(scale * 100)}%)` : ''}
              </div>
            </div>
            <div
              className="preview-viewport"
              style={{
                maxWidth: '100%'
              }}
            >
              <div
                className="preview-scale-wrapper"
                style={{
                  width: orientation.width,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left'
                }}
              >
                {componentType === 'home' ? (
                  <section
                    className="hero preview-hero"
                    style={{
                      minHeight: customHeight ? `${customHeight}px` : orientation.minHeight,
                      height: customHeight ? `${customHeight}px` : 'auto',
                      width: '100%'
                    }}
                  >
                    <div className="hero-background">
                      <div
                        className="hero-slide active"
                        style={{
                          backgroundImage: `url(${bannerImage})`,
                          backgroundPosition: `${bgPositionX}% ${bgPositionY}%`
                        }}
                      >
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
                ) : (
                  <section
                    className="careers-hero preview-careers-hero"
                    style={{
                      height: customHeight ? `${customHeight}px` : `${careersHeight}px`,
                      width: '100%'
                    }}
                  >
                    <div className="hero-background">
                      <div
                        className="hero-slide active"
                        style={{
                          backgroundImage: `url(${bannerImage})`,
                          backgroundPosition: `${bgPositionX}% ${bgPositionY}%`
                        }}
                      ></div>
                    </div>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                      <h1>Join Our Team</h1>
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
                )}
              </div>
            </div>
            <div className="preview-info">
              <div className="info-item">
                <i className="fas fa-ruler-horizontal"></i>
                <span>Width: {orientation.width}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-ruler-vertical"></i>
                {customHeight ? (
                  <span>Height: {customHeight}px (custom override)</span>
                ) : componentType === 'home' ? (
                  <span>Min Height: {orientation.minHeight} (full viewport)</span>
                ) : (
                  <span>Height: {Math.round(careersHeight)}px (clamp: 450px-550px, 60vh)</span>
                )}
              </div>
              <div className="info-item">
                <i className="fas fa-crosshairs"></i>
                <span>Position: {bgPositionX}% {bgPositionY}% (H: {bgPositionX}%, V: {bgPositionY}%)</span>
              </div>
              <div className="info-item crop-note">
                <i className="fas fa-crop"></i>
                <span>Image maintains aspect ratio - edges may be cropped</span>
              </div>
            </div>
          </div>
          );
        })}
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
            <strong>Home vs Careers:</strong> Home hero fills full viewport height (min-height: 100vh), while Careers banner uses fixed height range (450-550px). Careers positions image at 25% from top, Home centers vertically.
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerPreview;
