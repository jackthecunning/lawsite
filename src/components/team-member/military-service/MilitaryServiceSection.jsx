import AttorneyExtraSection from '../attorney-extra-section';

const MilitaryServiceSection = ({ military }) => {
  if (!military || (Array.isArray(military) && military.length === 0)) {
    return null;
  }
  // Wrap in an object to match AttorneyExtraSection prop
  const attorney = { military };
  return <AttorneyExtraSection attorney={attorney} />;
};

export default MilitaryServiceSection;
