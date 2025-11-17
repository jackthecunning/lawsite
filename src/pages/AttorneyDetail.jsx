import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { loadAllAttorneyProfiles } from '../utils/attorneyLoader';
import AttorneyHeroSection from '../components/attorney/AttorneyHeroSection';
import AttorneyPersonalSection from '../components/attorney/AttorneyPersonalSection';
import AttorneyCredentialsSection from '../components/attorney/AttorneyCredentialsSection';
import AttorneyPracticeSection from '../components/attorney/AttorneyPracticeSection';
import AttorneyContactSection from '../components/attorney/AttorneyContactSection';
import AttorneyNavigationSection from '../components/attorney/AttorneyNavigationSection';

const AttorneyDetail = () => {
  const { id } = useParams(); // This is now the slug
  const [attorney, setAttorney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef([]);

  // Load attorney data on component mount
  useEffect(() => {
    const loadAttorney = async () => {
      try {
        const attorneys = await loadAllAttorneyProfiles();
        const foundAttorney = attorneys.find(att => att.slug === id);
        setAttorney(foundAttorney);
      } catch (error) {
        console.error('Error loading attorney:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAttorney();
    window.scrollTo(0, 0);
  }, [id]);

  // Scroll animation and progress tracking
  useEffect(() => {
    const handleScroll = () => {
      // Update scroll progress
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    // Intersection Observer for section animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.attorney-section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [attorney]); // Re-run when attorney data loads

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Loading Attorney Details...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!attorney) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Attorney Not Found</h2>
        <p>The attorney you're looking for doesn't exist.</p>
        <Link to="/team" className="btn btn-primary">Back to Our Team</Link>
      </div>
    );
  }

  return (
    <>
      {/* Scroll progress indicator */}
      <div 
        className="scroll-indicator" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="attorney-hero attorney-section">
        <AttorneyHeroSection
          attorney={attorney}
          onScheduleConsultation={scrollToContact}
        />
      </div>

      <div className="attorney-section">
        <AttorneyPersonalSection attorney={attorney} />
      </div>

      <div className="attorney-section">
        <AttorneyCredentialsSection attorney={attorney} />
      </div>

      <div className="attorney-section">
        <AttorneyPracticeSection attorney={attorney} />
      </div>

      <div className="attorney-section">
        <AttorneyContactSection
          attorney={attorney}
          onScheduleConsultation={scrollToContact}
        />
      </div>

      <div className="attorney-section">
        <AttorneyNavigationSection />
      </div>
    </>
  );
};

export default AttorneyDetail;
