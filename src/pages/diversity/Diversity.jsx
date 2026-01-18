import './Diversity.css';
import DiversityPageHero from '../../components/diversity/page-hero';
import CallToAction from '../../components/diversity/call-to-action';

const Diversity = () => {
  const pillars = [
    {
      icon: 'fas fa-users',
      title: 'Diverse Workforce',
      description: 'We actively recruit and retain talented attorneys and staff from diverse backgrounds, experiences, and perspectives.'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Equal Opportunity',
      description: 'We provide equal opportunities for professional development, advancement, and leadership roles to all members of our team.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Community Engagement',
      description: 'We partner with diverse organizations and participate in initiatives that promote access to justice for underserved communities.'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Education & Training',
      description: 'We invest in ongoing education and training to promote cultural competency and inclusive practices throughout our firm.'
    }
  ];

  return (
    <>
      {/* <DiversityPageHero
        title="Diversity & Inclusion"
        subtitle="Building a Stronger Future Together"
      /> */}

      <section className="diversity-main">
        <div className="container">
          <div className="diversity-intro">
            <h2>Our Commitment To Diversity & Inclusion</h2>
            <div className="intro-content">
              <p className="intro-lead">
                At Swartz Campbell, we believe that diversity and inclusion are not just values—they
                are essential to our success and the quality of service we provide to our clients.
              </p>
              <p>
                We are committed to fostering an inclusive environment where all individuals are
                valued, respected, and empowered to contribute their unique perspectives and talents.
              </p>
            </div>
          </div>

          <div className="pillars-section">
            <h3 className="pillars-heading">Our Four Pillars</h3>
            <div className="pillars-grid">
              {pillars.map((pillar, index) => (
                <div key={index} className="pillar-card">
                  <div className="pillar-icon">
                    <i className={pillar.icon}></i>
                  </div>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

          <CallToAction
            title="Join Our Team"
            description="We welcome talented individuals who share our commitment to excellence and diversity to explore career opportunities at our firm."
            buttonText="View Careers"
            buttonLink="/careers"
          />
        </div>
      </section>
    </>
  );
};

export default Diversity;
