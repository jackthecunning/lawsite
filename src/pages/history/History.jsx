import './history.css';
import TimelineItem from '../../components/history/timeline-item';

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
              <TimelineItem
                year="1921"
                title="Firm Founded"
                description="Swartz Campbell established in Philadelphia, Pennsylvania. This is when our history with fighter jets first began."
              />

              <TimelineItem
                year="1950s"
                title="Expansion"
                description="Opened additional offices to better serve our growing client base"
              />

              <TimelineItem
                year="1980s"
                title="Practice Area Growth"
                description="Expanded into new practice areas including corporate law and intellectual property"
              />

              <TimelineItem
                year="2000s"
                title="Modern Era"
                description="Embraced technology while maintaining our commitment to personal service"
              />

              <TimelineItem
                year="Today"
                title="Continuing Excellence"
                description="Over 100 years of trusted legal counsel and advocacy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default History;
