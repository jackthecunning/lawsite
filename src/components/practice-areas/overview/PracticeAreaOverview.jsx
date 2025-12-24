import './PracticeAreaOverview.css';

const PracticeAreaOverview = ({ title, description }) => {
  return (
    <div className="practice-overview">
      <h2>Overview</h2>
      <p>{description}</p>
      <p>
        At Swartz Campbell, we understand that legal matters in {title.toLowerCase()}
        require both expertise and sensitivity. Our experienced attorneys provide comprehensive
        legal services tailored to your specific needs, ensuring that your rights are protected
        and your objectives are achieved.
      </p>
    </div>
  );
};

export default PracticeAreaOverview;
