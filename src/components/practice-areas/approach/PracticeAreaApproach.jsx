import './PracticeAreaApproach.css';

const PracticeAreaApproach = () => {
  return (
    <div className="practice-approach">
      <h2>Our Approach</h2>
      <p>
        We believe in providing personalized attention to every client. Our approach combines
        extensive legal knowledge with practical solutions, ensuring that we not only address
        your immediate legal needs but also help you plan for the future.
      </p>
      <div className="approach-points">
        <div className="approach-point">
          <i className="fas fa-handshake"></i>
          <h4>Client-Centered Service</h4>
          <p>We prioritize your needs and keep you informed throughout the legal process.</p>
        </div>
        <div className="approach-point">
          <i className="fas fa-shield-alt"></i>
          <h4>Proven Experience</h4>
          <p>Over 104 years of combined experience handling complex legal matters.</p>
        </div>
        <div className="approach-point">
          <i className="fas fa-target"></i>
          <h4>Results-Driven</h4>
          <p>We focus on achieving practical, effective solutions for your legal challenges.</p>
        </div>
      </div>
    </div>
  );
};

export default PracticeAreaApproach;
