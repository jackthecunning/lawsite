import '../shared-credentials.css';

const PublicationsSection = ({ publications }) => {
  if (!publications || publications.length === 0) {
    return null;
  }

  const renderPublication = (item, index) => {
    if (typeof item === 'string') {
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-file-alt"></i>
          <span>{item}</span>
        </div>
      );
    }

    if (typeof item === 'object') {
      const displayText = Object.values(item).filter(v => v).join(' - ');
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-file-alt"></i>
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
          <i className="fas fa-book"></i>
          Publications
        </h2>
      </div>
      <div className="section-content">
        <div className="credentials-grid">
          {publications.map((item, index) => renderPublication(item, index))}
        </div>
      </div>
    </div>
  );
};

export default PublicationsSection;
