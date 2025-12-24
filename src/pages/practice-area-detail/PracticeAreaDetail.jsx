import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { services } from '../../data/firmData';
import LoadingState from '../../components/ui/loading-state';
import NotFound from '../../components/ui/not-found';
import Breadcrumb from '../../components/ui/breadcrumb';
import PracticeAreaDetailHero from '../../components/practice-areas/hero';
import PracticeAreaOverview from '../../components/practice-areas/overview';
import PracticeAreaServices from '../../components/practice-areas/services';
import PracticeAreaApproach from '../../components/practice-areas/approach';
import ContactCard from '../../components/practice-areas/sidebar';
import RelatedAreas from '../../components/practice-areas/related';
import PracticeAreaCTA from '../../components/practice-areas/cta';
import './PracticeAreaDetail.css';

const PracticeAreaDetail = () => {
  const { area } = useParams();
  const [practiceArea, setPracticeArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const foundArea = services.find(service =>
      service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === area
    );

    setPracticeArea(foundArea);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [area]);

  const scrollToContact = () => {
    navigate('/#contact');
  };

  if (loading) {
    return <LoadingState message="Loading Practice Area Details..." />;
  }

  if (!practiceArea) {
    return (
      <NotFound
        title="Practice Area Not Found"
        message="The practice area you're looking for doesn't exist."
        backLink="/practice-areas"
        backText="Back to Practice Areas"
      />
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Practice Areas', to: '/practice-areas' },
          { label: practiceArea.title }
        ]}
      />

      <PracticeAreaDetailHero
        icon={practiceArea.icon}
        title={practiceArea.title}
      />

      <section className="practice-detail-content">
        <div className="container">
          <div className="practice-content-grid">
            <div className="practice-main-content">
              <PracticeAreaOverview
                title={practiceArea.title}
                description={practiceArea.description}
              />
              <PracticeAreaServices
                title={practiceArea.title}
                features={practiceArea.features}
              />
              <PracticeAreaApproach />
            </div>

            <div className="practice-sidebar">
              <ContactCard
                practiceAreaTitle={practiceArea.title}
                onScheduleClick={scrollToContact}
              />

              <RelatedAreas
                services={services}
                currentPracticeAreaId={practiceArea.id}
              />
            </div>
          </div>
        </div>
      </section>

      <PracticeAreaCTA
        practiceAreaTitle={practiceArea.title}
        onContactClick={scrollToContact}
      />
    </>
  );
};

export default PracticeAreaDetail;
