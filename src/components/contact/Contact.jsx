import { useState } from 'react';
import ContactInfo from './contact/ContactInfo';
import OfficeSelector from './contact/OfficeSelector';
import './Contact.css';

const Contact = () => {
  const [selectedOffice, setSelectedOffice] = useState(null);

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Get the Legal Help You Need Today</p>
        </div>

        <ContactInfo />
        <OfficeSelector
          selectedOffice={selectedOffice}
          setSelectedOffice={setSelectedOffice}
        />
      </div>
    </section>
  );
};

export default Contact;