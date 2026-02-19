import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { offices } from '../../data/firmData';
import OfficeContactCard from '../../components/office-contact-card';
import './OfficeDetail.css';

const OfficeDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const office = offices.find(o => o.id === id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/content/offices/${id}.json`)
        .then(response => {
          if (!response.ok) throw new Error('Office not found');
          return response.json();
        })
        .then(data => {
          setContent(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading office content:', error);
          setContent(null);
          setLoading(false);
        });
    }
  }, [id]);

  if (!office || (!loading && !content)) {
    return <Navigate to="/offices" replace />;
  }

  if (loading) {
    return (
      <div className="office-detail-page" style={{ minHeight: '100vh' }}>
        <div className="office-detail-overlay"></div>
        <div className="office-title-section">
          <div className="container">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  const getDirectionsUrl = () => {
    const addressParts = [
      office.address,
      office.addressLine2,
      office.city
    ].filter(Boolean).join(', ');

    return `https://www.google.com/maps/dir//${encodeURIComponent(addressParts)}`;
  };

  return (
    <div
      className="office-detail-page"
      style={{
        backgroundImage: content.bannerImage ? `url(${content.bannerImage})` : 'none'
      }}
    >
      <div className="office-detail-overlay"></div>

      <section className="content-section">
        <div className="container">
          <div className="office-detail-layout">
            {/* Left Sidebar - Our Offices */}
            <div className="office-left-sidebar">
              <div className="sidebar-card other-offices-card">
                <div className="sidebar-card-header">
                  <i className="fas fa-building"></i>
                  <h3>Our Offices</h3>
                </div>
                <div className="office-links">
                  {offices
                    .filter(o => o.id !== office.id)
                    .map(o => (
                      <Link
                        key={o.id}
                        to={`/offices/${o.id}`}
                        className="office-link"
                      >
                        <i className="fas fa-map-marker-alt"></i>
                        {o.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="office-main-content">
              {/* About Section */}
              <div className="office-main-info">
                <div className="section-header">
                  <h2>About Our {office.name} Office</h2>
                </div>
                <div className="office-description">
                  {content.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="sidebar-card contact-box">
                <div className="sidebar-card-header contact-header-centered">
                  <h3>Contact Information</h3>
                </div>
                <OfficeContactCard office={office} />
              </div>
            </div>

            {/* Right Sidebar - Directions */}
            <div className="office-right-sidebar">
              <div className="sidebar-card directions-box">
                <div className="sidebar-card-header">
                  <i className="fas fa-directions"></i>
                  <h3>Directions</h3>
                </div>
                <div className="directions-text">
                  {content.directionsInfo}
                </div>
                <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="sidebar-btn">
                  <i className="fas fa-map-marked-alt"></i>
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OfficeDetail;
