import AttorneyExtraSection from '../attorney-extra-section';

const EducationSection = ({ education }) => {
  if (!education || education.length === 0) {
    return null;
  }
  // Wrap in an object to match AttorneyExtraSection prop
  const attorney = { education };
  return <AttorneyExtraSection attorney={attorney} />;
};

export default EducationSection;
