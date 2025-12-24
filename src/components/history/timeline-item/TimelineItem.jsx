import './TimelineItem.css';

const TimelineItem = ({ year, title, description }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-year">{year}</div>
      <div className="timeline-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
