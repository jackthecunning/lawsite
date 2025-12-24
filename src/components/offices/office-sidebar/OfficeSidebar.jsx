import { Link } from 'react-router-dom';
import './OfficeSidebar.css';

const OfficeSidebar = ({ currentOfficeId, offices, directionsUrl }) => {
  return (
    <div className="office-sidebar">
      <div className="sidebar-section">
        <h3>Directions</h3>
        <p>
          Get directions to our office for easy access to our location.
        </p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          Get Directions
        </a>
      </div>

      <div className="sidebar-section">
        <h3>Our Other Offices</h3>
        {offices
          .filter(office => office.id !== currentOfficeId)
          .map(office => (
            <Link
              key={office.id}
              to={`/offices/${office.id}`}
              className="office-link"
            >
              <i className="fas fa-map-marker-alt"></i>
              {office.fullName}
            </Link>
          ))}
        <Link to="/offices" className="office-link">
          <i className="fas fa-building"></i>
          View All Offices
        </Link>
      </div>
    </div>
  );
};

export default OfficeSidebar;
