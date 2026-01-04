import './Women.css';
import DiversityPageHero from '../../components/diversity/page-hero';
import DiversityCard from '../../components/diversity/diversity-card';

const Women = () => {
  const womenItems = [
    {
      icon: 'fas fa-gavel',
      title: 'Legal Excellence',
      description: 'Our women attorneys bring exceptional legal expertise, strategic thinking, and dedication to achieving outstanding results for our clients.'
    },
    {
      icon: 'fas fa-award',
      title: 'Leadership',
      description: 'Women hold key leadership positions throughout our firm, shaping our direction and mentoring the next generation of legal professionals.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Community Impact',
      description: 'Our women attorneys are deeply committed to pro bono work and community service, making a meaningful difference beyond the courtroom.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Professional Growth',
      description: 'We support the professional development and advancement of women attorneys through mentorship, training, and career opportunities.'
    }
  ];

  return (
    <>
      <DiversityPageHero
        title="The Women of Swartz Campbell"
        subtitle="Excellence, Leadership, and Commitment"
      />

      {/* Women Content */}
      <section className="content-section-women section-light">
        <div className="container">
          <div className="content-wrapper">
            <h2>Empowering Women in Law</h2>
            <p>
              The women of Swartz Campbell represent the highest standards of legal excellence,
              bringing diverse perspectives, innovative thinking, and unwavering dedication to
              serving our clients.
            </p>
            <p>
              From courtroom advocacy to strategic counsel, our women attorneys lead complex
              litigation, negotiate critical transactions, and shape the future of our firm
              and the legal profession.
            </p>

            <div className="women-sections">
              {womenItems.map((item, index) => (
                <DiversityCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Women;
