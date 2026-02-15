import { useState, useEffect } from 'react';
import { loadHistory } from '../../utils/historyLoader';
import ContentImage from '../../components/content-image';
import BannerImage from '../../components/banner-image';
import './history.css';
import philly2Banner from '/images/banner/philly_2.png';

const History = () => {
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await loadHistory();
      setHistoryData(data);
    };
    fetchHistory();
  }, []);

  if (!historyData || !historyData.sections) {
    return null;
  }

  return (
    <>
      <section className="page-hero history-hero">
        <BannerImage
          src={philly2Banner}
          alt="Philadelphia Skyline"
          className="hero-banner-image"
        />
        <div className="container">
          <h1>{historyData.title || 'Our History'}</h1>
        </div>
      </section>

      <section className="history-section">
        <div className="container">
          {historyData.sections.map((section, index) => {
            const content = Array.isArray(section.content) ? section.content : [section.content];
            const hasImage = section.image;
            const isEven = index % 2 === 0;

            return (
              <div key={index} className={`history-item ${isEven ? 'reverse' : ''}`}>
                {section.title && <h2 className="history-title">{section.title}</h2>}

                <div className="history-content">
                  {hasImage && (
                    <div className="history-image">
                      <ContentImage
                        src={typeof section.image === 'string' ? `/images/content/${section.image}` : section.image.src}
                        alt={typeof section.image === 'string' ? (section.title || 'Historical image') : section.image.alt}
                      />
                    </div>
                  )}

                  <div className="history-text">
                    {content.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default History;
