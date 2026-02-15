import './ContentImage.css';

const ContentImage = ({ src, alt }) => {
  return (
    <div className="content-image-container">
      <img src={src} alt={alt} className="content-image" loading="lazy" />
    </div>
  );
};

export default ContentImage;
