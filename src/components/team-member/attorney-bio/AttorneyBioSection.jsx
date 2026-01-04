import { getFirstName } from '../../../utils/nameUtils';
import './AttorneyBioSection.css';

const AttorneyBioSection = ({ attorney }) => {
  return (
      <div className="team-detail-info">
      <div className="team-bio">
        <h3>About {getFirstName(attorney.name)}</h3>
        {attorney.bio && attorney.bio.split('\n').map((paragraph, index) => (
          paragraph.trim() && <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default AttorneyBioSection;
