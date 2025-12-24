const AttorneyCredentialsSection = ({ attorney }) => {
  return (
    <section id="attorney-credentials" className="attorney-credentials-section section-light">
      <div className="container">
        <div className="section-header">
          <h2>
            <i className="fas fa-graduation-cap"></i>
            Education & Credentials
          </h2>
        </div>
        <div className="section-content">
          <div className="credentials-grid">
            {attorney.credentials.map((credential, index) => (
              <div key={index} className="credential-item">
                <i className="fas fa-check-circle"></i>
                <span>{credential}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttorneyCredentialsSection;
