import './PracticeOverview.css';

const PracticeOverview = () => {
  return (
    <div className="practice-overview">
      <h2>Legal Excellence Across Multiple Disciplines</h2>
      <p className="overview-intro">
        With over 104 years of combined experience, Swartz Campbell provides
        comprehensive legal representation across a diverse range of practice
        areas. Our team of skilled attorneys is dedicated to delivering
        results-driven solutions for individuals, families, and businesses.
      </p>

      <div className="overview-highlights">
        <div className="highlight-card">
          <i className="fas fa-users"></i>
          <h3>Experienced Team</h3>
          <p>
            Our attorneys bring decades of experience and a proven track record
            of success in their respective practice areas.
          </p>
        </div>
        <div className="highlight-card">
          <i className="fas fa-balance-scale"></i>
          <h3>Client-Focused</h3>
          <p>
            We prioritize your needs and goals, developing personalized legal
            strategies that address your unique situation.
          </p>
        </div>
        <div className="highlight-card">
          <i className="fas fa-chart-line"></i>
          <h3>Proven Results</h3>
          <p>
            Our commitment to excellence has resulted in favorable outcomes for
            countless clients across Pennsylvania and beyond.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PracticeOverview;
