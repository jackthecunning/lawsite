import { getFirstName } from '../../../utils/nameUtils';
import './AttorneyContact.css';

const AttorneyContact = ({ attorney, onContactClick }) => {
  return (
    <section id="attorney-contact" className="attorney-contact-section section-light">
      <div className="container">
        <div className="section-header">
          <h2>Ready to Work with {getFirstName(attorney.name)}?</h2>
          <p>Get in touch to discuss your legal needs and see how we can help.</p>
        </div>
        <div className="section-content">
          <div className="contact-methods">
            <div className="contact-method">
              <i className="fas fa-envelope"></i>
              <h4>Get in Touch</h4>
              <button onClick={onContactClick} className="btn btn-primary">
                Contact Us
              </button>
            </div>
            <div className="contact-method">
              <i className="fas fa-phone"></i>
              <h4>Call Directly</h4>
              <a href={`tel:${attorney.phone}`} className="btn btn-secondary">
                {attorney.phone}
              </a>
            </div>
            <div className="contact-method">
              <i className="fas fa-envelope"></i>
              <h4>Send Email</h4>
              <a href={`mailto:${attorney.email}`} className="btn btn-outline">
                {attorney.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttorneyContact;
