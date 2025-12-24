import './DiversityCard.css';

const DiversityCard = ({ icon, title, description }) => {
  return (
    <div className="diversity-section">
      <div className="diversity-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default DiversityCard;
