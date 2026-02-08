// #region Imports
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { firmInfo } from '../../data/firmData';
import './Navigation.css';
// #endregion

const Navigation = () => {
  // #region State & Hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // #endregion

  // #region Handler Functions
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
    // If already on homepage, scroll to top
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleContactClick = (e) => {
    e.preventDefault();
    closeMenu();

    // If not on homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToContact: true } });
    } else {
      // If already on homepage, just scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scrolling to contact section after navigation
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollToContact) {
      // Wait for the page to render
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const navbarHeight = 80; // Height of the navbar
          const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  // Handle scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`navbar ${isScrolled || !isHomePage ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={handleLogoClick}>
          {/* <h2>SWARTZ</h2>
          <h2>&nbsp;&nbsp;&nbsp;CAMPBELL <span style={{ fontWeight: 400, fontSize: '0.4em', letterSpacing: '0.05em' }}>LLC</span></h2>
          <div class="line-container"></div> */}
          <h2 className="nav-gradient-text">
            SWARTZ
          </h2>
          <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: 0 }}>
            <span className="nav-gradient-text campbell-text">&nbsp;&nbsp;&nbsp;CAMPBELL<span className="nav-llc"> LLC</span></span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <span className="line-container"></span><span className="nav-since">Since 1921</span>
            </span>
          </h2>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          {/* <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            Home
          </Link> */}
          <div className="nav-dropdown">
            <a href="/#about" className="nav-link" onClick={closeMenu}>
              About <i className="fas fa-chevron-down"></i>
            </a>
            <div className="dropdown-content">
              <Link to="/history" onClick={closeMenu}>History</Link>
              <Link to="/offices" onClick={closeMenu}>Offices</Link>
              <Link to="/diversity" onClick={closeMenu}>Diversity</Link>
              <Link to="/women" onClick={closeMenu}>The Women of Swartz Campbell</Link>
              <Link to="/testimonials" onClick={closeMenu}>Testimonials</Link>
            </div>
          </div>
          <Link
            to="/team"
            className={`nav-link ${isActive('/team') ? 'active' : ''}`}
            onClick={handleTeamClick}
          >
            Our Team
          </Link>
          <Link
            to="/practice-areas"
            className={`nav-link ${isActive('/practice-areas') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Practice Areas
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
            onClick={handleContactClick}
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
  // #endregion
};

export default Navigation;