import './OfficeCTA.css';

const OfficeCTA = ({ office }) => {
  return (
    <div className="office-cta">
      <h3>Need Legal Assistance?</h3>
      <p>Contact our {office.name} office to discuss your legal needs.</p>
      <div className="cta-buttons">
        <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`} className="btn btn-primary">
          Call {office.phone}
        </a>
        <a href="/#contact" className="btn btn-secondary">
          Contact Us Online
        </a>
      </div>
    </div>
  );
};

export default OfficeCTA;
