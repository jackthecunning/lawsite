import './PageHero.css';
import BannerImage from '../../banner-image';

const DiversityPageHero = ({ title, subtitle, bannerImage }) => {
  return (
    <section className="page-hero">
      {bannerImage && (
        <div className="page-hero-background">
          <BannerImage
            src={bannerImage}
            alt={title}
            className="page-hero-banner-image"
          />
        </div>
      )}
      <div className="hero-overlay"></div>
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
};

export default DiversityPageHero;
