import './TeamDetail.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadAllAttorneyProfiles } from '../../utils/attorneyLoader';
import LoadingState from '../../components/ui/loading-state';
import NotFound from '../../components/ui/not-found';

import AttorneySummary from '../../components/team-member/attorney-summary';
import AttorneyBioSection from '../../components/team-member/attorney-bio';
import PersonalLife from '../../components/team-member/personal';
import EducationSection from '../../components/team-member/education';
import BarAdmissionsSection from '../../components/team-member/bar-admissions';
import CourtAdmissionsSection from '../../components/team-member/court-admissions';
import AwardsSection from '../../components/team-member/awards';
import ProfessionalOrganizationsSection from '../../components/team-member/professional-organizations';
import PublicationsSection from '../../components/team-member/publications';
import ProBonoSection from '../../components/team-member/pro-bono';
import CertificationsSection from '../../components/team-member/certifications';
import OtherCertificationsSection from '../../components/team-member/other-certifications';
import MilitaryServiceSection from '../../components/team-member/military-service';
import AttorneyContact from '../../components/team-member/contact';
import BackNavigation from '../../components/ui/back-navigation';
import AttorneyExtraSection from '../../components/team-member/attorney-extra-section';

const TeamDetail = () => {
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
      <section className="team-detailed section-light">
        <div className="container">
          <div className="team-detail-content">
            <AttorneySummary attorney={attorney} />

            <div className="team-detail-main">
              <AttorneyBioSection attorney={attorney} />

              {/* <EducationSection education={attorney.education} /> */}
              {/* <BarAdmissionsSection barAdmissions={attorney.barAdmissions} /> */}
              {/* <CourtAdmissionsSection courtAdmissions={attorney.courtAdmissions} /> */}
              {/* <AwardsSection awards={attorney.awards} /> */}
              {/* <ProfessionalOrganizationsSection professionalOrganizations={attorney.professionalOrganizations} /> */}
              <PublicationsSection publications={attorney.publications} />
              <ProBonoSection proBono={attorney.proBono} />
              <CertificationsSection credentials={attorney.credentials} />
              <OtherCertificationsSection certifications={attorney.certifications} />
              {/* <MilitaryServiceSection military={attorney.military} /> */}
              {/* Render extra sections/cards for any additional JSON keys */}
              <AttorneyExtraSection attorney={attorney} />
            </div>
          </div>
        </div>
      </section>

      <PersonalLife attorney={attorney} />
      {/* <AttorneyContact attorney={attorney} onContactClick={scrollToContact} /> */}
      <BackNavigation to="/team">
        Back to Our Team
      </BackNavigation>
    </>
  );
};

export default TeamDetail;
