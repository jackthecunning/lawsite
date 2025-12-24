import { firmInfo, services } from '../../data/firmData';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{firmInfo.name}</h3>
            <p>{firmInfo.description}</p>
            <div className="social-links">
              <a href={firmInfo.socialMedia.facebook}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href={firmInfo.socialMedia.linkedin}>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={firmInfo.socialMedia.twitter}>
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Practice Areas</h4>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="/team">Our Team</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Client Portal</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              {firmInfo.contact.address.street}
            </p>
            <p>
              <i className="fas fa-phone"></i>
              <a href={`tel:${firmInfo.contact.phone}`}>
                {firmInfo.contact.phone}
              </a>
            </p>
            <p>
              <i className="fas fa-envelope"></i>
              <a href={`mailto:${firmInfo.contact.email}`}>
                {firmInfo.contact.email}
              </a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 {firmInfo.name}. All rights reserved. | Attorney Advertising</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;