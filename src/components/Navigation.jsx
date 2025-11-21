import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { firmInfo } from '../data/firmData';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    closeMenu();
    // Jump to top when logo is clicked
    window.scrollTo(0, 0);
  };

  const handleHomeClick = (e) => {
    closeMenu();
    // If already on homepage, prevent navigation and don't scroll
    if (location.pathname === '/') {
      e.preventDefault();
      return;
    }
    // If not on homepage, allow navigation and jump to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  const handleTeamClick = (e) => {
    closeMenu();
    // If already on team page, prevent navigation and don't scroll
    if (location.pathname === '/team') {
      e.preventDefault();
      return;
    }
    // If not on team page, allow navigation and jump to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  const handleNewsClick = (e) => {
    closeMenu();
    // If already on news page, prevent navigation and don't scroll
    if (location.pathname === '/news' || location.pathname.startsWith('/news/')) {
      e.preventDefault();
      return;
    }
    // If not on news page, allow navigation and jump to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  const handleCareersClick = (e) => {
    closeMenu();
    // If already on careers page, prevent navigation and don't scroll
    if (location.pathname === '/careers') {
      e.preventDefault();
      return;
    }
    // If not on careers page, allow navigation and jump to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={handleLogoClick}>
          <h2>{firmInfo.name}</h2>
          <p>{firmInfo.tagline}</p>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            Home
          </Link>
          <a
            href="/#about"
            className="nav-link"
            onClick={closeMenu}
          >
            About
          </a>
          <Link
            to="/practice-areas"
            className={`nav-link ${isActive('/practice-areas') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Practice Areas
          </Link>
          <Link
            to="/team"
            className={`nav-link ${isActive('/team') ? 'active' : ''}`}
            onClick={handleTeamClick}
          >
            Our Team
          </Link>
          <Link
            to="/news"
            className={`nav-link ${isActive('/news') ? 'active' : ''}`}
            onClick={handleNewsClick}
          >
            News
          </Link>
          <Link
            to="/careers"
            className={`nav-link ${isActive('/careers') ? 'active' : ''}`}
            onClick={handleCareersClick}
          >
            Careers
          </Link>
          <a
            href="/#contact"
            className="nav-link"
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>

        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;