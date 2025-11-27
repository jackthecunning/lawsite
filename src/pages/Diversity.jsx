import '../styles/about-pages.css';

const Diversity = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Diversity & Inclusion</h1>
          <p>Building a Stronger Future Together</p>
        </div>
      </section>

      {/* Diversity Content */}
      <section className="content-section section-light">
        <div className="container">
          <div className="content-wrapper">
            <h2>Our Commitment</h2>
            <p>
              At Swartz Campbell, we believe that diversity and inclusion are not just values—they
              are essential to our success and the quality of service we provide to our clients.
            </p>
            <p>
              We are committed to fostering an inclusive environment where all individuals are
              valued, respected, and empowered to contribute their unique perspectives and talents.
            </p>

            <div className="diversity-sections">
              <div className="diversity-section">
                <div className="diversity-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Diverse Workforce</h3>
                <p>
                  We actively recruit and retain talented attorneys and staff from diverse
                  backgrounds, experiences, and perspectives.
                </p>
              </div>

              <div className="diversity-section">
                <div className="diversity-icon">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <h3>Equal Opportunity</h3>
                <p>
                  We provide equal opportunities for professional development, advancement,
                  and leadership roles to all members of our team.
                </p>
              </div>

              <div className="diversity-section">
                <div className="diversity-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Community Engagement</h3>
                <p>
                  We partner with diverse organizations and participate in initiatives that
                  promote access to justice for underserved communities.
                </p>
              </div>

              <div className="diversity-section">
                <div className="diversity-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Education & Training</h3>
                <p>
                  We invest in ongoing education and training to promote cultural competency
                  and inclusive practices throughout our firm.
                </p>
              </div>
            </div>

            <div className="cta-section">
              <h3>Join Our Team</h3>
              <p>
                We welcome talented individuals who share our commitment to excellence and
                diversity to explore career opportunities at our firm.
              </p>
              <a href="/careers" className="btn btn-primary">View Careers</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Diversity;
