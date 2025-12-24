import { services } from '../../data/firmData';
import PracticeAreasHero from '../../components/practice-areas/practice-areas-hero';
import PracticeAreaCard from '../../components/practice-areas/practice-area-card';
import PracticeAreasCTA from '../../components/practice-areas/practice-areas-cta';
import './PracticeAreas.css';

const PracticeAreas = () => {
  return (
    <>
      <PracticeAreasHero />

      {/* Practice Areas Overview */}
      <section className="practice-areas-overview">
        <div className="container">
          <div className="section-header">
            <h2>Legal Excellence Across Multiple Disciplines</h2>
            <p>
              With over 104 years of combined experience, Swartz Campbell provides comprehensive
              legal representation across a diverse range of practice areas. Our team of skilled
              attorneys is dedicated to delivering results-driven solutions for individuals,
              families, and businesses.
            </p>
          </div>

          <div className="practice-areas-grid">
            {services.map((service) => (
              <PracticeAreaCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <PracticeAreasCTA />
    </>
  );
};

export default PracticeAreas;
