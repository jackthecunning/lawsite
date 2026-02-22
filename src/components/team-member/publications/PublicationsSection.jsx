import AttorneyExtraSection from '../attorney-extra-section';

const PublicationsSection = ({ publications }) => {
  if (!publications || publications.length === 0) {
    return null;
  }
  // Wrap in an object to match AttorneyExtraSection prop
  const attorney = { publications };
  return <AttorneyExtraSection attorney={attorney} />;
};

export default PublicationsSection;
