import AttorneyExtraSection from '../attorney-extra-section';

const OtherCertificationsSection = ({ certifications }) => {
  if (!certifications || certifications.length === 0) {
    return null;
  }
  // Wrap in an object to match AttorneyExtraSection prop
  const attorney = { certifications };
  return <AttorneyExtraSection attorney={attorney} />;
};

export default OtherCertificationsSection;
