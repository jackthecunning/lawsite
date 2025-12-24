import './PracticeAreaServices.css';

const PracticeAreaServices = ({ title, features }) => {
  return (
    <div className="practice-services">
      <h2>Our {title} Services</h2>
      <div className="services-grid">
        {features.map((feature, index) => (
          <div key={index} className="service-item">
            <div className="service-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="service-content">
              <h4>{feature}</h4>
              <p>
                Comprehensive legal support for {feature.toLowerCase()} with attention
                to detail and commitment to achieving the best possible outcomes.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeAreaServices;
