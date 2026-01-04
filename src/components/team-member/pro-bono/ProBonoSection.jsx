import '../shared-credentials.css';

const ProBonoSection = ({ proBono }) => {
  if (!proBono || proBono.length === 0) {
    return null;
  }

  const renderProBono = (item, index) => {
    if (typeof item === 'string') {
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-heart"></i>
          <span>{item}</span>
        </div>
      );
    }

    if (typeof item === 'object') {
      const displayText = Object.values(item).filter(v => v).join(' - ');
      return (
        <div key={index} className="credential-item">
          <i className="fas fa-heart"></i>
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
          <i className="fas fa-hands-helping"></i>
          Pro Bono Work
        </h2>
      </div>
      <div className="section-content">
        <div className="credentials-grid">
          {proBono.map((item, index) => renderProBono(item, index))}
        </div>
      </div>
    </div>
  );
};

export default ProBonoSection;
