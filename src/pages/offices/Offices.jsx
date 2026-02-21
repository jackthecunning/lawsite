import { Link } from 'react-router-dom';
import { offices } from '../../data/firmData';
import { getBannerImageUrl } from '../../utils/imageUtils';
import './Offices.css';

const Offices = () => {

  return (
    <>
      {/* Full-Screen Offices Grid */}
      <section className="offices-fullscreen">
        <div className="offices-header">
          <div className="header-accent-line"></div>
          <h1>Our Offices</h1>
          {/* <p>Six strategic locations serving clients across the Northeast & Midwest</p> */}
        </div>

        <div className="offices-grid-fullscreen">
          {offices.map((office, index) => (
            <Link
              key={index}
              to={`/offices/${office.id}`}
              className="office-tile"
              style={{
                backgroundImage: office.bannerImage
                  ? `url(${getBannerImageUrl(office.bannerImage)})`
                  : 'none'
              }}
            >
              <div className="office-tile-overlay"></div>
              <div className="office-tile-content">
                <div className="office-tile-header">
                  <h2>{office.name}</h2>
                  <div className="office-tile-icon">
                    <i className="fas fa-building"></i>
                  </div>
                </div>

                <div className="office-tile-details">
                  <div className="office-tile-info">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <p>{office.address}</p>
                      {office.addressLine2 && <p>{office.addressLine2}</p>}
                      <p>{office.city}</p>
                    </div>
                  </div>

                  <div className="office-tile-info">
                    <i className="fas fa-phone"></i>
                    <div>
                      <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`} onClick={(e) => e.stopPropagation()}>
                        {office.phone}
                      </a>
                    </div>
                  </div>

                  <div className="office-tile-info">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <a href={`mailto:${office.email}`} onClick={(e) => e.stopPropagation()}>
                        {office.email}
                      </a>
                    </div>
                  </div>

                  <div className="office-tile-info">
                    <i className="fas fa-clock"></i>
                    <div>
                      <p>{office.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="office-tile-cta">
                  <span>View Details</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Offices;
