import './HeritageSection.css';
import { services, offices } from '../../../data/firmData';
import heritageImage from '/images/home/heritage.jpeg';

const HeritageSection = ({ yearsSinceFounding }) => {
  return (
    <section className="home-heritage">
      <div className="container">
        <div className="heritage-content">
          <div className="heritage-text">
            <div className="heritage-badge">
              <span className="badge-year">Est. 1921</span>
            </div>
            <h2>A Century of Legal Excellence</h2>
            <p className="lead-text">
              For over {yearsSinceFounding} years, Swartz Campbell has been a cornerstone
              of the legal community, serving clients with unwavering dedication and expertise.
            </p>
            <p>
              Our firm's longevity is a testament to the quality of our work and the strength of
              our professional relationships. We are trusted by individuals, businesses, and
              fellow legal professionals throughout the region and beyond.
            </p>
            <div className="heritage-stats">
              <div className="heritage-stat">
                <div className="stat-number">{yearsSinceFounding}+</div>
                <div className="stat-label">Years in Practice</div>
              </div>
              <div className="heritage-stat">
                <div className="stat-number">{offices.length}</div>
                <div className="stat-label">Office Locations</div>
              </div>
              <div className="heritage-stat">
                <div className="stat-number">{services.length}</div>
                <div className="stat-label">Practice Areas</div>
              </div>
            </div>
          </div>
          <div className="heritage-image">
            <div className="image-frame">
              <img src={heritageImage} alt="Legal Heritage" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;
