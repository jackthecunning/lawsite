import { Link } from 'react-router-dom';

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: "Associate Attorney - Corporate Law",
      department: "Corporate Law",
      location: "Philadelphia, PA",
      type: "Full-time",
      experience: "2-5 years",
      description: "We are seeking a motivated associate attorney to join our corporate law practice. The ideal candidate will have experience in mergers and acquisitions, corporate governance, and securities law."
    },
    {
      id: 2,
      title: "Family Law Attorney",
      department: "Family Law",
      location: "New York, NY",
      type: "Full-time",
      experience: "3-7 years",
      description: "Join our family law team to help families navigate complex legal matters including divorce, custody, and estate planning. Mediation experience preferred."
    },
    {
      id: 3,
      title: "Legal Assistant",
      department: "General Practice",
      location: "Fredonia, NY",
      type: "Full-time",
      experience: "1-3 years",
      description: "Support our legal team with case preparation, client communication, and administrative tasks. Paralegal certification preferred but not required."
    },
    {
      id: 4,
      title: "Summer Associate Program",
      department: "All Departments",
      location: "All Offices",
      type: "Internship",
      experience: "Law School Student",
      description: "12-week summer program for law students to gain hands-on experience across multiple practice areas. Mentorship and networking opportunities included."
    }
  ];

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  return (
    <>
      {/* Careers Hero Section */}
      <section className="careers-hero">
        <div className="hero-background">
          <div className="hero-slide active" style={{ backgroundImage: "url('/images/banner/philly_2.png')" }}></div>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Join Our Team</h1>
          <p>Build Your Career with Swartz Campbell</p>
          <p>Discover opportunities to grow and make a difference in the legal profession</p>
        </div>
      </section>

      {/* Why Work Here Section */}
      <section className="why-work-here">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Swartz Campbell?</h2>
            <p>We're committed to fostering a collaborative environment where legal professionals can thrive</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Collaborative Culture</h3>
              <p>Work alongside experienced attorneys who are committed to mentoring and supporting your professional growth.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Continuous Learning</h3>
              <p>Access to CLE programs, professional development opportunities, and conference attendance to stay at the forefront of legal practice.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Work-Life Balance</h3>
              <p>Flexible scheduling options, remote work opportunities, and a focus on maintaining healthy work-life integration.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Comprehensive Benefits</h3>
              <p>Health insurance, dental, vision, 401(k) with matching, paid time off, and professional liability coverage.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Recognition & Growth</h3>
              <p>Clear advancement pathways, performance-based bonuses, and recognition for exceptional client service and legal excellence.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Client Impact</h3>
              <p>Work on meaningful cases that make a real difference in clients' lives and contribute to positive legal outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="open-positions">
        <div className="container">
          <div className="section-header">
            <h2>Current Opportunities</h2>
            <p>Explore our open positions and find the perfect fit for your legal career</p>
          </div>

          <div className="positions-list">
            {openPositions.map((position) => (
              <div key={position.id} className="position-card">
                <div className="position-header">
                  <h3>{position.title}</h3>
                  <div className="position-tags">
                    <span className="tag department">{position.department}</span>
                    <span className="tag type">{position.type}</span>
                  </div>
                </div>

                <div className="position-details">
                  <div className="detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{position.location}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-clock"></i>
                    <span>{position.experience} experience</span>
                  </div>
                </div>

                <p className="position-description">{position.description}</p>

                <div className="position-actions">
                  <button onClick={scrollToContact} className="btn btn-primary">
                    Apply Now
                  </button>
                  <button className="btn btn-secondary">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="application-process">
        <div className="container">
          <div className="section-header">
            <h2>Application Process</h2>
            <p>Here's what to expect when you apply to join our team</p>
          </div>

          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Submit Application</h3>
                <p>Send your resume, cover letter, and any relevant portfolio materials to our HR team.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Initial Review</h3>
                <p>Our hiring team will review your application and contact qualified candidates within 5-7 business days.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Interview Process</h3>
                <p>Participate in interviews with team members and leadership to discuss your experience and goals.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Final Decision</h3>
                <p>We'll make our decision and extend offers to successful candidates with competitive compensation packages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="careers-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join Our Team?</h2>
            <p>Take the next step in your legal career with Swartz Campbell</p>
            <div className="cta-buttons">
              <button onClick={scrollToContact} className="btn btn-primary">
                Contact Our HR Team
              </button>
              <Link to="/team" className="btn btn-secondary">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;