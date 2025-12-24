import { firmInfo } from '../../data/firmData';

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h3>Get in Touch</h3>
      <p>Ready to discuss your legal matter? Contact us today.</p>

      <div className="contact-items-grid">
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <div>
            <h4>Address</h4>
            <p>
              {firmInfo.contact.address.street}<br />
              {firmInfo.contact.address.city}<br />
              {firmInfo.contact.address.state}
            </p>
          </div>
        </div>

        <div className="contact-item">
          <i className="fas fa-phone"></i>
          <div>
            <h4>Phone</h4>
            <p>
              <a href={`tel:${firmInfo.contact.phone}`}>
                {firmInfo.contact.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <div>
            <h4>Email</h4>
            <p>
              <a href={`mailto:${firmInfo.contact.email}`}>
                {firmInfo.contact.email}
              </a>
            </p>
          </div>
        </div>

        <div className="contact-item">
          <i className="fas fa-clock"></i>
          <div>
            <h4>Office Hours</h4>
            <p>
              {firmInfo.contact.hours.weekdays}<br />
              {firmInfo.contact.hours.saturday}<br />
              {firmInfo.contact.hours.sunday}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
