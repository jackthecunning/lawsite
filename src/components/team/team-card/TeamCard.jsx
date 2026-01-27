import { Link } from 'react-router-dom';
import AttorneyImage from '../../attorney-image';
import './TeamCard.css';

const TeamCard = ({ attorney, index }) => {
  return (
    <Link
      to={`/attorney/${attorney.slug}`}
      className="team-card-link"
    >
      <div
        className="team-card"
        style={{ '--card-index': index }}
      >
        <div className="team-card-image">
          <AttorneyImage
            src={attorney.image}
            alt={attorney.name}
          />
        </div>
        <div className="team-card-info">
          <h3>{attorney.name}</h3>
          <p className="title">{attorney.title}</p>
          {/* <p className="specialization">{attorney.practiceAreas}</p> */}
          <p className={`office${attorney.offices && attorney.offices.length > 2 ? ' shrink' : ''}`}>
            <i className="fas fa-map-marker-alt"></i>
            {attorney.offices ? attorney.offices.join(', ') : attorney.office} Office{attorney.offices && attorney.offices.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
