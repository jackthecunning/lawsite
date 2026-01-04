import { Link } from 'react-router-dom';
import { offices } from '../../data/firmData';
import './QuickAccess.css';

const QuickAccess = ({ quickAccessVisible }) => {
  return (
    <section className="home-quick-access">
        <div className="container">
            <div className={`quick-access-grid ${quickAccessVisible ? 'visible' : ''}`}>
            <Link to="/team" className="quick-access-card primary-card">
                <div className="card-icon">
                <i className="fas fa-users"></i>
                </div>
                <h3>Our Team</h3>
                <p>Find contact information for our attorneys and associates</p>
                <span className="card-arrow">→</span>
            </Link>

            {/* <Link to="/careers" className="quick-access-card accent-card">
                <div className="card-icon">
                <i className="fas fa-briefcase"></i>
                </div>
                <h3>Join Our Team</h3>
                <p>Explore career opportunities at Swartz Campbell</p>
                <span className="card-arrow">→</span>
            </Link> */}

            <Link to="/practice-areas" className="quick-access-card">
                <div className="card-icon">
                <i className="fas fa-gavel"></i>
                </div>
                <h3>Practice Areas</h3>
                <p>View our areas of legal expertise</p>
                <span className="card-arrow">→</span>
            </Link>

            <Link to="/offices" className="quick-access-card">
                <div className="card-icon">
                <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3>Office Locations</h3>
                <p>{offices.map(office => office.name).join(' • ')}</p>
                <span className="card-arrow">→</span>
            </Link>

            <Link to="/history" className="quick-access-card">
                <div className="card-icon">
                <i className="fas fa-landmark"></i>
                </div>
                <h3>History</h3>
                <p>Explore our rich history as we build an even brighter future. But something less dumb</p>
                <span className="card-arrow">→</span>
            </Link>

            </div>
        </div>
    </section>
  );
};

export default QuickAccess;