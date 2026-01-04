import '../shared-credentials.css';

const CourtAdmissionsSection = ({ courtAdmissions }) => {
  if (!courtAdmissions || courtAdmissions.length === 0) {
    return null;
  }

  const renderCourtAdmission = (item, index) => {
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
    if (typeof item === 'object' && item.court) {
      const displayText = item.year
        ? `${item.court} (${item.year})`
        : item.court;

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
          <i className="fas fa-gavel"></i>
          Court Admissions
        </h2>
      </div>
      <div className="section-content">
        <div className="credentials-grid">
          {courtAdmissions.map((item, index) => renderCourtAdmission(item, index))}
        </div>
      </div>
    </div>
  );
};

export default CourtAdmissionsSection;
