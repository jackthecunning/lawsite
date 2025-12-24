import './OfficeHero.css';

const OfficeHero = ({ officeName, subtitle }) => {
  return (
    <section className="page-hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <h1>{officeName}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
};

export default OfficeHero;
