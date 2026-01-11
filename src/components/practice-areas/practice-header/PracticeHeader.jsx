import './PracticeHeader.css';

const PracticeHeader = ({ selectedService }) => {
  return (
    <div className="practice-header">
      <div className="practice-icon-large">
        <i className={selectedService.icon}></i>
      </div>
      <div>
        <h2>{selectedService.title}</h2>
        <p className="practice-subtitle">{selectedService.description}</p>
      </div>
    </div>
  );
};

export default PracticeHeader;
