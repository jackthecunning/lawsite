import { useState } from 'react';
import { firmInfo, offices } from '../data/firmData';

const Contact = () => {
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this to a backend service
    alert('Thank you for your message! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Get the Legal Help You Need Today</p>
        </div>
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

        <div className="office-locations">
            <h3>Our Office Locations</h3>
            <p>
              For general inquiries, use the contact information above. If you need to reach a specific
              office location, select an office below to view its direct contact details:
            </p>

            <div className="office-tabs">
              {offices.map((office) => (
                <button
                  key={office.id}
                  className={`office-tab ${selectedOffice?.id === office.id ? 'active' : ''}`}
                  onClick={() => setSelectedOffice(selectedOffice?.id === office.id ? null : office)}
                >
                  <i className="fas fa-map-marker-alt"></i>
                  {office.name}
                </button>
              ))}
            </div>

            {selectedOffice && (
              <div className="office-details-card">
                <h4>{selectedOffice.fullName}</h4>
                <div className="office-contact-details">
                  <div className="detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <strong>Address</strong>
                      <p>
                        {selectedOffice.address}<br />
                        {selectedOffice.addressLine2 && <>{selectedOffice.addressLine2}<br /></>}
                        {selectedOffice.city}
                      </p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <strong>Phone</strong>
                      <p>
                        <a href={`tel:${selectedOffice.phone.replace(/[^0-9]/g, '')}`}>
                          {selectedOffice.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-fax"></i>
                    <div>
                      <strong>Fax</strong>
                      <p>{selectedOffice.fax}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <strong>Email</strong>
                      <p>
                        <a href={`mailto:${selectedOffice.email}`}>
                          {selectedOffice.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-clock"></i>
                    <div>
                      <strong>Hours</strong>
                      <p>{selectedOffice.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* <div className="contact-form">
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select Practice Area</option>
                  <option value="real-estate">Real Estate Law</option>
                  <option value="business">Business Law</option>
                  <option value="family">Family Law</option>
                  <option value="personal-injury">Personal Injury</option>
                  <option value="criminal">Criminal Defense</option>
                  <option value="estate">Estate Planning</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us about your legal matter"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;