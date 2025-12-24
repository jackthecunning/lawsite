import { Link } from 'react-router-dom';
import './BackNavigation.css';

const BackNavigation = ({ to, children = 'Back to Our Team' }) => {
  return (
    <section className="back-navigation-section section-dark">
      <div className="container">
        <div className="nav-content">
          <Link to={to} className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i>
            {children}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BackNavigation;
