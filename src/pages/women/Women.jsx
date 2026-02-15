import { useState, useEffect } from 'react';
import './Women.css';
import DiversityPageHero from '../../components/diversity/page-hero';
import { getImageUrl } from '../../utils/imageUtils';
import phillyBanner from '/images/banner/Philly.png';

const Women = () => {
  const [womenContent, setWomenContent] = useState(null);

  useEffect(() => {
    fetch('/content/women-of-sc/women-of-sc.json')
      .then(response => response.json())
      .then(data => setWomenContent(data))
      .catch(error => console.error('Error loading women content:', error));
  }, []);

  return (
    <>
      <DiversityPageHero
        title="THE WOMEN OF SWARTZ CAMPBELL"
        bannerImage={phillyBanner}
      />

      <section className="content-section-women section-light">
        <div className="container">
          <div className="content-with-image">
            <div className="content-wrapper">
              {womenContent?.paragraphs?.map((paragraph, index) => (
                <div key={index} className="paragraph-container">
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>

            {womenContent?.image && (
              <div className="women-image-container">
                <img src={getImageUrl(womenContent.image)} alt={womenContent.title} className="women-image" />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Women;
