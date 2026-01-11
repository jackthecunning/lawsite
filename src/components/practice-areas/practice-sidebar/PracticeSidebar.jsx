import { useState, useEffect } from 'react';
import './PracticeSidebar.css';

const PracticeSidebar = ({ services, selectedArea, setSelectedArea }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const selectedService = services.find(s => s.id === selectedArea);

  const handleItemClick = (serviceId) => {
    setSelectedArea(serviceId);
    if (isMobile) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <aside className="practice-sidebar">
      {isMobile ? (
        <>
          <button
            className="practice-sidebar-toggle"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="toggle-text">
              {selectedService ? (
                <>
                  <i className={selectedService.icon}></i>
                  <span>{selectedService.title}</span>
                </>
              ) : (
                <span>Select Practice Area</span>
              )}
            </span>
            <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
          </button>
          {isDropdownOpen && (
            <nav className="practice-nav practice-nav-dropdown">
              {services.map((service) => (
                <button
                  key={service.id}
                  className={`practice-nav-item ${
                    selectedArea === service.id ? 'active' : ''
                  }`}
                  onClick={() => handleItemClick(service.id)}
                >
                  <i className={service.icon}></i>
                  <span>{service.title}</span>
                </button>
              ))}
            </nav>
          )}
        </>
      ) : (
        <>
          <h3>Practice Areas</h3>
          <nav className="practice-nav">
            {services.map((service) => (
              <button
                key={service.id}
                className={`practice-nav-item ${
                  selectedArea === service.id ? 'active' : ''
                }`}
                onClick={() => setSelectedArea(service.id)}
              >
                <i className={service.icon}></i>
                <span>{service.title}</span>
              </button>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
};

export default PracticeSidebar;

