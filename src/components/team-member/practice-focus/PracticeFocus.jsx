import { getFirstName } from '../../../utils/nameUtils';
import './PracticeFocus.css';

const PracticeFocus = ({ attorney }) => {
  return (
    <section id="attorney-practice" className="attorney-practice-section section-dark">
      <div className="container">
        <div className="section-header">
          <h2>
            <i className="fas fa-briefcase"></i>
            Practice Focus
          </h2>
        </div>
        <div className="section-content">
          <h3 className="practice-area-title">{attorney.specialization}</h3>
          <p>
            {getFirstName(attorney.name)} focuses on providing comprehensive legal services in this area,
            bringing years of experience and a deep understanding of the legal complexities involved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PracticeFocus;
