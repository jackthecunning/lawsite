import '../shared-credentials.css';

const BarAdmissionsSection = ({ barAdmissions }) => {
  if (!barAdmissions || barAdmissions.length === 0) {
    return null;
  }

  const renderBarAdmission = (item, index) => {
    // Handle string format
    if (typeof item === 'string') {
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-check-circle"></i>
          <span>{item}</span>
        </div>
      );
    }

    // Handle object format
    if (typeof item === 'object' && item.jurisdiction) {
      const displayText = item.year
        ? `${item.jurisdiction} (${item.year})`
        : item.jurisdiction;

      return (
        <div key={index} className="credential-item">
          <i className="fas fa-check-circle"></i>
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
          <i className="fas fa-balance-scale"></i>
          Bar Admissions
        </h2>
      </div>
      <div className="section-content">
        <div className="credentials-grid">
          {barAdmissions.map((item, index) => renderBarAdmission(item, index))}
        </div>
      </div>
    </div>
  );
};

export default BarAdmissionsSection;
