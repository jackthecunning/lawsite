import './OfficeHero.css';
import BannerImage from '../../banner-image';

const OfficeHero = ({ officeName, subtitle, bannerImage }) => {
  return (
    <section className="office-page-hero">
      {bannerImage && (
        <div className="page-hero-background">
          <BannerImage
            src={bannerImage}
            alt={officeName}
            className="page-hero-banner-image"
          />
        </div>
      )}
      <div className="hero-overlay"></div>
      <div className="container">
        <h1>{officeName}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
};

export default OfficeHero;
