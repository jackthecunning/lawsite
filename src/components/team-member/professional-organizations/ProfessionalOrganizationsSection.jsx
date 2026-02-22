import AttorneyExtraSection from '../attorney-extra-section';

const ProfessionalOrganizationsSection = ({ professionalOrganizations }) => {
  if (!professionalOrganizations || professionalOrganizations.length === 0) {
    return null;
  }
  // Wrap in an object to match AttorneyExtraSection prop
  const attorney = { professionalOrganizations };
  return <AttorneyExtraSection attorney={attorney} />;
};

export default ProfessionalOrganizationsSection;
