import '../styles/about-pages.css';

const Offices = () => {
  const offices = [
    {
      name: 'Philadelphia',
      address: '123 Market Street',
      city: 'Philadelphia, PA 19103',
      phone: '(215) 555-0100',
      email: 'philadelphia@swartzcampbell.com',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM'
    },
    {
      name: 'Pittsburgh',
      address: '456 Liberty Avenue',
      city: 'Pittsburgh, PA 15222',
      phone: '(412) 555-0200',
      email: 'pittsburgh@swartzcampbell.com',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM'
    },
    {
      name: 'Harrisburg',
      address: '789 State Street',
      city: 'Harrisburg, PA 17101',
      phone: '(717) 555-0300',
      email: 'harrisburg@swartzcampbell.com',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Our Offices</h1>
          <p>Conveniently Located to Serve You</p>
        </div>
      </section>

      {/* Offices Content */}
      <section className="content-section section-light">
        <div className="container">
          <div className="section-header">
            <h2>Visit Us</h2>
            <p>We have offices throughout Pennsylvania to better serve our clients</p>
          </div>

          <div className="offices-grid">
            {offices.map((office, index) => (
              <div key={index} className="office-card">
                <h3>{office.name}</h3>
                <div className="office-details">
                  <p>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>
                      {office.address}<br />
                      {office.city}
                    </span>
                  </p>
                  <p>
                    <i className="fas fa-phone"></i>
                    <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}>{office.phone}</a>
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i>
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </p>
                  <p>
                    <i className="fas fa-clock"></i>
                    <span>{office.hours}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Offices;
