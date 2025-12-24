import './CredentialsSection.css';

const CredentialsSection = ({
  id,
  title,
  icon,
  items,
  itemIcon = 'fas fa-check-circle',
  sectionClass = 'section-light'
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id={id} className={`attorney-credentials-section ${sectionClass}`}>
      <div className="container">
        <div className="section-header">
          <h2>
            <i className={icon}></i>
            {title}
          </h2>
        </div>
        <div className="section-content">
          <div className="credentials-grid">
            {items.map((item, index) => (
              <div key={index} className="credential-item">
                <i className={itemIcon}></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
