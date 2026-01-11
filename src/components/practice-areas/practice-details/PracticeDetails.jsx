import './PracticeDetails.css';

const PracticeDetails = ({ selectedService }) => {
  return (
    <div className="practice-details">
      <section className="practice-section">
        <p>
          At Swartz Campbell, we understand that legal matters in{' '}
          {selectedService.title.toLowerCase()} require both expertise and
          sensitivity. Our experienced attorneys provide comprehensive legal
          services tailored to your specific needs, ensuring that your rights
          are protected and your objectives are achieved.
        </p>
        <p>
          With decades of combined experience, our team has successfully
          represented clients in complex {selectedService.title.toLowerCase()}{' '}
          matters, achieving favorable outcomes through strategic planning,
          thorough preparation, and aggressive advocacy when necessary.
        </p>
      </section>
    </div>
  );
};

export default PracticeDetails;
