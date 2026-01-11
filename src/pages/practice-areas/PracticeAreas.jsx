import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { services } from '../../data/firmData';
import {
  PracticeSidebar,
  PracticeHeader,
  PracticeOverview,
  PracticeDetails
} from '../../components/practice-areas';
import './PracticeAreas.css';

const PracticeAreas = () => {
  const [searchParams] = useSearchParams();
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const areaId = searchParams.get('area');
    if (areaId) {
      const id = parseInt(areaId, 10);
      if (services.find(s => s.id === id)) {
        setSelectedArea(id);
      }
    }
  }, [searchParams]);

  const selectedService = selectedArea
    ? services.find(s => s.id === selectedArea)
    : null;

  return (
    <section className="practice-areas-content">
      <div className="container">
        <div className="practice-layout">
          <PracticeSidebar
            services={services}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
          />

          <main className="practice-main">
            {selectedService ? (
              <>
                <PracticeHeader selectedService={selectedService} />
                <PracticeDetails selectedService={selectedService} />
              </>
            ) : (
              <PracticeOverview />
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
