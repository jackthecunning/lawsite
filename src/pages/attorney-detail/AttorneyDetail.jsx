import './AttorneyDetail.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadAllAttorneyProfiles } from '../../utils/attorneyLoader';
import LoadingState from '../../components/ui/loading-state';
import NotFound from '../../components/ui/not-found';
import AttorneyHero from '../../components/team-member/hero';
import PersonalLife from '../../components/team-member/personal';
import CredentialsSection from '../../components/team-member/credentials';
import PracticeFocus from '../../components/team-member/practice-focus';
import AttorneyContact from '../../components/team-member/contact';
import BackNavigation from '../../components/ui/back-navigation';

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
    return <LoadingState message="Loading Attorney Profile..." />;
  }

  if (!attorney) {
    return (
      <NotFound
        title="Attorney Not Found"
        message="The attorney you're looking for doesn't exist."
        backLink="/team"
        backText="Back to Our Team"
      />
    );
  }

  return (
    <>
      <AttorneyHero attorney={attorney} />
      <PersonalLife attorney={attorney} />

      <CredentialsSection
        id="attorney-education"
        title="Education"
        icon="fas fa-graduation-cap"
        items={attorney.education}
        sectionClass="section-light"
      />

      <CredentialsSection
        id="attorney-bar"
        title="Bar Admissions"
        icon="fas fa-gavel"
        items={attorney.barAdmissions}
        sectionClass="section-white"
      />

      <CredentialsSection
        id="attorney-court"
        title="Court Admissions"
        icon="fas fa-landmark"
        items={attorney.courtAdmissions}
        sectionClass="section-light"
      />

      <CredentialsSection
        id="attorney-awards"
        title="Awards and Honors"
        icon="fas fa-trophy"
        items={attorney.awards}
        itemIcon="fas fa-award"
        sectionClass="section-white"
      />

      <CredentialsSection
        id="attorney-organizations"
        title="Professional Organizations"
        icon="fas fa-users"
        items={attorney.professionalOrganizations}
        sectionClass="section-light"
      />

      <CredentialsSection
        id="attorney-publications"
        title="Publications"
        icon="fas fa-book"
        items={attorney.publications}
        itemIcon="fas fa-file-alt"
        sectionClass="section-white"
      />

      <CredentialsSection
        id="attorney-probono"
        title="Pro Bono Work"
        icon="fas fa-hands-helping"
        items={attorney.proBono}
        itemIcon="fas fa-heart"
        sectionClass="section-light"
      />

      <CredentialsSection
        id="attorney-credentials"
        title="Credentials"
        icon="fas fa-certificate"
        items={attorney.credentials}
        sectionClass="section-white"
      />

      <CredentialsSection
        id="attorney-certifications"
        title="Certifications"
        icon="fas fa-award"
        items={attorney.certifications}
        sectionClass="section-light"
      />

      <CredentialsSection
        id="attorney-military"
        title="Military Service"
        icon="fas fa-flag-usa"
        items={attorney.military}
        itemIcon="fas fa-medal"
        sectionClass="section-white"
      />

      <PracticeFocus attorney={attorney} />
      <AttorneyContact attorney={attorney} onContactClick={scrollToContact} />
      <BackNavigation to="/team">
        Back to Our Team
      </BackNavigation>
    </>
  );
};

export default AttorneyDetail;
