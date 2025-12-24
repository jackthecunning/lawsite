import { useState, useEffect, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setAnimateContent(true), 300);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        <div className={`section-header ${isVisible ? 'header-animate' : ''}`}>
          <h2>About Our Firm</h2>
          <p>Committed to Excellence in Legal Service</p>
        </div>
        <div className={`about-content ${animateContent ? 'content-animate' : ''}`}>
          <div className="about-text">
            <h3>Your Trusted Legal Partners</h3>
            <p>
              At Swartz Campbell, we understand that legal matters can be overwhelming and stressful.
              That's why we're committed to providing personalized, professional legal services
              tailored to meet your unique needs.
            </p>
            <p>
              Our experienced team of attorneys combines deep legal knowledge with a compassionate
              approach, ensuring that you receive not only expert representation but also the
              support and guidance you need during challenging times.
            </p>
            <div className="about-features">
              <div className="feature">
                <i className="fas fa-balance-scale"></i>
                <div>
                  <h4>Experienced Attorneys</h4>
                  <p>Our team brings decades of combined legal experience</p>
                </div>
              </div>
              <div className="feature">
                <i className="fas fa-handshake"></i>
                <div>
                  <h4>Personal Attention</h4>
                  <p>Every client receives dedicated, personalized service</p>
                </div>
              </div>
              <div className="feature">
                <i className="fas fa-trophy"></i>
                <div>
                  <h4>Proven Results</h4>
                  <p>Track record of successful outcomes for our clients</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="images/about-office.jpg" alt="Law office interior" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;