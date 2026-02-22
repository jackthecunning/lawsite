import AttorneyExtraSection from '../attorney-extra-section';

const ProBonoSection = ({ proBono }) => {
  if (!proBono || proBono.length === 0) {
    return null;
  }
  // Wrap in an object to match AttorneyExtraSection prop
  const attorney = { proBono };
  return <AttorneyExtraSection attorney={attorney} />;
};

export default ProBonoSection;
