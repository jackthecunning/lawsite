import '../shared-credentials.css';

const EducationSection = ({ education }) => {
  if (!education || education.length === 0) {
    return null;
  }

  const renderEducation = (item, index) => {
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
    if (typeof item === 'object' && item.institution) {
      let displayText = '';

      if (item.degree && item.institution) {
        displayText = `${item.degree}, ${item.institution}`;
        if (item.year) displayText = `${item.year} - ${displayText}`;
        if (item.location) displayText += `, ${item.location}`;
      }

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
          <i className="fas fa-graduation-cap"></i>
          Education
        </h2>
      </div>
      <div className="section-content">
        <div className="credentials-grid">
          {education.map((item, index) => renderEducation(item, index))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
