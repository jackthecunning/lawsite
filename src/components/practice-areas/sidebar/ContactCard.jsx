import './ContactCard.css';

const ContactCard = ({ practiceAreaTitle, onScheduleClick }) => {
  return (
    <div className="contact-card">
      <h3>Need Legal Help?</h3>
      <p>Contact us today for a consultation about your {practiceAreaTitle.toLowerCase()} matter.</p>
      <button onClick={onScheduleClick} className="btn btn-primary btn-full-width">
        Schedule Consultation
      </button>
      <div className="contact-info">
        <p><i className="fas fa-phone"></i> (555) 123-4567</p>
        <p><i className="fas fa-envelope"></i> info@swartzcampbell.com</p>
      </div>
    </div>
  );
};

export default ContactCard;
