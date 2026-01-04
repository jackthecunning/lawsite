import '../shared-credentials.css';

const CertificationsSection = ({ credentials }) => {
  if (!credentials || credentials.length === 0) {
    return null;
  }

  const renderCredential = (item, index) => {
    if (typeof item === 'string') {
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-check-circle"></i>
          <span>{item}</span>
        </div>
      );
    }

    if (typeof item === 'object') {
      const displayText = Object.values(item).filter(v => v).join(' - ');
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
          <i className="fas fa-certificate"></i>
          Credentials
        </h2>
      </div>
      <div className="section-content">
        <div className="credentials-grid">
          {credentials.map((item, index) => renderCredential(item, index))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsSection;
