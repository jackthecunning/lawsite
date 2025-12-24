import { Link } from 'react-router-dom';
import './Breadcrumb.css';

/**
 * Breadcrumb navigation component
 * @param {Array} items - Array of breadcrumb items
 * Example:
 * items: [
 *   { label: "Home", to: "/" },
 *   { label: "Practice Areas", to: "/practice-areas" },
 *   { label: "Employment Law" } // current page (no link)
 * ]
 */
const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="breadcrumb-section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <span key={index} className="breadcrumb-item">
                {item.to && !isLast ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}

                {!isLast && (
                  <i className="fas fa-chevron-right" aria-hidden="true" />
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
