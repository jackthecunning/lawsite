import '../shared-credentials.css';

const AwardsSection = ({ awards }) => {
  if (!awards || awards.length === 0) {
    return null;
  }

  const renderAward = (item, index) => {
    if (typeof item === 'string') {
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-award"></i>
          <span>{item}</span>
        </div>
      );
    }

    if (typeof item === 'object') {
      const displayText = Object.values(item).filter(v => v).join(' - ');
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-award"></i>
          <span>{displayText}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="credential-card">
      <div className="section-header">
        <h2>
          <i className="fas fa-trophy"></i>
          Awards and Honors
        </h2>
      </div>
      <div className="section-content">
        <div className="credentials-grid">
          {awards.map((item, index) => renderAward(item, index))}
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
