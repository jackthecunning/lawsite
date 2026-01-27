import { Link } from 'react-router-dom';
import { offices } from '../../data/firmData';
import './QuickAccess.css';

const QuickAccess = ({ quickAccessVisible }) => {
  return (
    <section className="home-quick-access">
        <div className="container">
            <div className={`quick-access-grid ${quickAccessVisible ? 'visible' : ''}`}>
                <Link to="/history" className="quick-access-card primary-card spill-up">
                    <div className="card-icon">
                        <i className="fas fa-landmark"></i>
                    </div>
                    <h3>History</h3>
                    <p>Explore our rich history and legacy.</p>
                </Link>

                <Link to="/offices" className="quick-access-card spill-up">
                    <div className="card-icon">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h3>Office Locations</h3>
                    <p>Find an office near you and some other filler</p>
                </Link>

                <Link to="/news" className="quick-access-card spill-up">
                    <div className="card-icon">
                        <i className="fas fa-globe"></i>
                    </div>
                    <h3>News & Blog</h3>
                    <p>Read our latest news, articles, and blog posts.</p>
                </Link>

                <Link to="/testimonials" className="quick-access-card spill-up">
                    <div className="card-icon">
                        <i className="fas fa-star"></i>
                    </div>
                    <h3>Testimonials</h3>
                    <p>See what our clients say about us.</p>
                </Link>
            </div>
        </div>
    </section>
  );
};

export default QuickAccess;