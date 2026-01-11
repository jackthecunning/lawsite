import { useState, useEffect } from 'react';
import { loadHistory } from '../../utils/historyLoader';
import ContentImage from '../../components/content-image';
import './history.css';

const History = () => {
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await loadHistory();
      setHistoryData(data);
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    const positionImages = () => {
      const imageWrappers = document.querySelectorAll('.history-image-wrapper');
      imageWrappers.forEach((wrapper) => {
        const sectionIndex = wrapper.getAttribute('data-section');
        const section = document.querySelector(`.history-section[data-section="${sectionIndex}"]`);
        if (section) {
          const image = wrapper.querySelector('.content-image-container');

          if (image) {
            // Force reflow to ensure accurate measurements
            void section.offsetHeight;

            // Find the title (if exists) and all paragraphs
            const title = section.querySelector('h3');
            const paragraphs = section.querySelectorAll('p');

            if (paragraphs.length > 0) {
              const containerRect = section.closest('.history-container').getBoundingClientRect();
              const imageHeight = image.offsetHeight;
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const containerTop = containerRect.top + scrollTop;

              // Get the top of the content (either title or first paragraph)
              const firstElement = title || paragraphs[0];
              const lastParagraph = paragraphs[paragraphs.length - 1];

              const firstRect = firstElement.getBoundingClientRect();
              const lastRect = lastParagraph.getBoundingClientRect();

              // Calculate the full content area from top element to last paragraph
              const contentTopRelative = firstRect.top + scrollTop - containerTop;
              const contentBottomRelative = lastRect.bottom + scrollTop - containerTop;
              const contentHeight = contentBottomRelative - contentTopRelative;

              // Center the image on the full content height
              const contentCenterRelative = contentTopRelative + (contentHeight / 2);
              const topOffset = contentCenterRelative - (imageHeight / 2);

              wrapper.style.top = `${topOffset}px`;

              // Calculate margin based on how far the image extends past the content
              const imageBottom = topOffset + imageHeight;
              const imageOverhang = Math.max(0, imageBottom - contentBottomRelative);
              const requiredMargin = Math.max(70, imageOverhang + 50);

              section.style.marginBottom = `${requiredMargin}px`;
            }
          }
        }
      });
    };

    if (historyData) {
      setTimeout(positionImages, 200);
      window.addEventListener('resize', positionImages);
      return () => window.removeEventListener('resize', positionImages);
    }
  }, [historyData]);

  if (!historyData || !historyData.sections) {
    return null;
  }

  const renderSection = (section, index) => {
    const content = Array.isArray(section.content) ? section.content : [section.content];
    const hasImage = section.image;
    const isEven = index % 2 === 0;

    return (
      <div key={index} className={`history-section ${hasImage ? 'has-image' : ''} ${isEven ? 'image-right' : 'image-left'}`} data-section={index}>
        {section.title && <h3>{section.title}</h3>}
        <div className="section-content-wrapper">
          <div className="section-text">
            {content.map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>{historyData.title || 'Our History'}</h1>
          <p>{historyData.subtitle || 'A Century of Excellence in Legal Defense'}</p>
        </div>
      </section>

      <section className="content-section section-light">
        <div className="container history-container">
          <div className="content-wrapper history-content">
            {historyData.sections.map((section, index) => renderSection(section, index))}
          </div>
          {historyData.sections.map((section, index) => {
            if (!section.image) return null;
            const isEven = index % 2 === 0;
            return (
              <div key={`img-${index}`} className={`history-image-wrapper ${isEven ? 'image-right' : 'image-left'}`} data-section={index}>
                <ContentImage
                  src={typeof section.image === 'string' ? `/images/content/${section.image}` : section.image.src}
                  alt={typeof section.image === 'string' ? (section.title || 'Historical image') : section.image.alt}
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default History;
