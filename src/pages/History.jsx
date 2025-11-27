import '../styles/about-pages.css';

const History = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Our History</h1>
          <p>Over a Century of Legal Excellence</p>
        </div>
      </section>

      {/* History Content */}
      <section className="content-section section-light">
        <div className="container">
          <div className="content-wrapper">
            <h2>A Legacy of Service Since 1921</h2>
            <p>
              Swartz Campbell has been serving clients with integrity and dedication for over a century.
              Founded in 1921, our firm has grown from a small practice to one of the region's most
              respected law firms.
            </p>
            <p>
              Throughout our history, we have remained committed to providing exceptional legal
              representation while maintaining the personal touch that has defined our practice
              since the beginning.
            </p>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">1921</div>
                <div className="timeline-content">
                  <h3>Firm Founded</h3>
                  <p>Swartz Campbell established in Philadelphia, Pennsylvania</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">1950s</div>
                <div className="timeline-content">
                  <h3>Expansion</h3>
                  <p>Opened additional offices to better serve our growing client base</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">1980s</div>
                <div className="timeline-content">
                  <h3>Practice Area Growth</h3>
                  <p>Expanded into new practice areas including corporate law and intellectual property</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">2000s</div>
                <div className="timeline-content">
                  <h3>Modern Era</h3>
                  <p>Embraced technology while maintaining our commitment to personal service</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">Today</div>
                <div className="timeline-content">
                  <h3>Continuing Excellence</h3>
                  <p>Over 100 years of trusted legal counsel and advocacy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default History;
