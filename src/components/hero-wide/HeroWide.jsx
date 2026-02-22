import './HeroWide.css';

const HeroWide = ({ backgroundImage, children }) => (
  <div className="hero-wide">
    <div
      className="hero-background"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    />
    <div className="hero-content">
      {children}
    </div>
  </div>
);

export default HeroWide;
