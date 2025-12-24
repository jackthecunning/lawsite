import AttorneyImage from '../../attorney-image';
import { getFirstName } from '../../../utils/nameUtils';
import './PersonalLife.css';

const PersonalLife = ({ attorney }) => {
  const getPersonalBio = () => {
    if (attorney.personalBio && attorney.personalBio.trim()) {
      return attorney.personalBio;
    }
    return `${getFirstName(attorney.name)} lives a private life, which we respect and support.`;
  };

  const hasPersonalPhoto = attorney.personalPhoto && attorney.personalPhoto.trim();

  return (
    <section id="attorney-personal" className="attorney-personal-section section-white">
      <div className="container">
        <div className="personal-section-wrapper">
          <div className="section-header">
            <h2>
              <i className="fas fa-heart"></i>
              Outside the Office
            </h2>
          </div>
          <div className="section-content">
            {hasPersonalPhoto ? (
              <div className="personal-content-with-photo">
                <div className="personal-bio">
                  <p>{getPersonalBio()}</p>
                </div>
                <div className="personal-photo">
                  <AttorneyImage
                    src={attorney.personalPhoto}
                    alt={`${attorney.name} personal photo`}
                    className="personal-photo-image"
                  />
                </div>
              </div>
            ) : (
              <div className="personal-content-no-photo">
                <p>{getPersonalBio()}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalLife;
