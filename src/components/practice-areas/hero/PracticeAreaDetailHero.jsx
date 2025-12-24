import './PracticeAreaDetailHero.css';

const PracticeAreaDetailHero = ({ icon, title, subtitle = "Expert legal representation with a track record of success" }) => {
  return (
    <section className="practice-detail-hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <div className="practice-hero-icon">
            <i className={icon}></i>
          </div>
          <h1>{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreaDetailHero;
