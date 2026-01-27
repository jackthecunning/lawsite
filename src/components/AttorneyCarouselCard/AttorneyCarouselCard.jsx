
import { Link } from 'react-router-dom';
import AttorneyImage from '../attorney-image';
import './AttorneyCarouselCard.css';

const AttorneyCarouselCard = ({ attorney }) => (
  <Link
    to={`/attorney/${attorney.slug}`}
    className="attorney-carousel-card-link"
  >
    <div className="attorney-carousel-card">
      <div className="attorney-carousel-card-image">
        <AttorneyImage
          src={attorney.image}
          alt={attorney.name}
        />
      </div>
      <div className="attorney-carousel-card-info">
        <h3>{attorney.name}</h3>
        <p className="title">{attorney.title}</p>
        <p className={`office${attorney.offices && attorney.offices.length > 2 ? ' shrink' : ''}`}>
          <i className="fas fa-map-marker-alt"></i>
          {attorney.offices ? attorney.offices.join(', ') : attorney.office} Office{attorney.offices && attorney.offices.length > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  </Link>
);

export default AttorneyCarouselCard;
