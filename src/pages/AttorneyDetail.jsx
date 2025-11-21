import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
      <AttorneyHeroSection
        attorney={attorney}
        onScheduleConsultation={scrollToContact}
      />

      <AttorneyPersonalSection attorney={attorney} />

      <AttorneyCredentialsSection attorney={attorney} />

      <AttorneyPracticeSection attorney={attorney} />

      <AttorneyContactSection
        attorney={attorney}
        onScheduleConsultation={scrollToContact}
      />

      <AttorneyNavigationSection />
    </>
  );
};

export default AttorneyDetail;
