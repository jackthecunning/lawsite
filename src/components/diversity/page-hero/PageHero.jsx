import './PageHero.css';

const DiversityPageHero = ({ title, subtitle }) => {
  return (
    <section className="page-hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
};

export default DiversityPageHero;
