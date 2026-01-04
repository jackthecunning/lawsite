import '../shared-credentials.css';

const MilitaryServiceSection = ({ military }) => {
  if (!military || (Array.isArray(military) && military.length === 0)) {
    return null;
  }

  const renderMilitary = (item, index) => {
    if (typeof item === 'string') {
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-medal"></i>
          <span>{item}</span>
        </div>
      );
    }

    if (typeof item === 'object') {
      const displayText = Object.values(item).filter(v => v).join(' - ');
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-medal"></i>
          <span>{displayText}</span>
        </div>
      );
    }

    return null;
  };

  // Handle if military is a string (not an array)
  const items = Array.isArray(military) ? military : [military];

  return (
    <div className="credential-card">
      <div className="section-header">
        <h2>
          <i className="fas fa-flag-usa"></i>
          Military Service
        </h2>
      </div>
      <div className="section-content">
        <div className="credentials-grid">
          {items.map((item, index) => renderMilitary(item, index))}
        </div>
      </div>
    </div>
  );
};

export default MilitaryServiceSection;
