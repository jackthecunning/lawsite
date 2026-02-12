import { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [expandedState, setExpandedState] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const officeLocations = {
    'DELAWARE': {
      address: '300 Delaware Avenue',
      suite: 'Suite 1410',
      poBox: 'P.O. Box 330',
      city: 'Wilmington, DE 19801',
      phone: '(P) 302 656 5935',
      fax: '(F) 302 656 1434'
    },
    'MARYLAND': {
      address: '100 East Pratt Street',
      suite: 'Suite 2600',
      city: 'Baltimore, MD 21202',
      phone: '(P) 410 555 8900',
      fax: '(F) 410 555 8901'
    },
    'NEW JERSEY': {
      address: '1060 N Kings Highway',
      suite: 'Suite 200',
      city: 'Mount Laurel, NJ 08054',
      phone: '(P) 856 234 5600',
      fax: '(F) 856 234 5601'
    },
    'NEW YORK': {
      address: '350 Fifth Avenue',
      suite: 'Suite 4820',
      city: 'New York, NY 10118',
      phone: '(P) 212 555 7300',
      fax: '(F) 212 555 7301'
    },
    'OHIO': {
      address: '1301 East Ninth Street',
      suite: 'Suite 3500',
      city: 'Cleveland, OH 44114',
      phone: '(P) 216 555 7200',
      fax: '(F) 216 555 7201'
    },
    'PENNSYLVANIA': [
      {
        name: 'Philadelphia',
        address: '2001 Market Street',
        suite: 'Suite 2815',
        city: 'Philadelphia, PA 19103',
        phone: '(P) 215 564 5190',
        fax: '(F) 215 564 5191'
      },
      {
        name: 'Pittsburgh',
        address: 'Koppers Building, 436 7th Avenue',
        suite: 'Floors 7 & 8',
        city: 'Pittsburgh, PA 15219',
        phone: '(P) 412 232 9800',
        fax: '(F) 412 232 9801'
      }
    ],
    'WEST VIRGINIA': {
      address: 'One Valley Square',
      suite: 'Suite 1000',
      city: 'Charleston, WV 25301',
      phone: '(P) 304 555 6100',
      fax: '(F) 304 555 6101'
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
        "https://8hlu3gzl3e.execute-api.us-east-1.amazonaws.com/email/contact",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
        );

        const data = await response.json();

        if (data.success) {
        setShowSuccess(true);

        setFormData({
            firstName: '',
            email: '',
            phone: '',
            message: ''
        });

        setTimeout(() => {
            onClose();
            setShowSuccess(false);
        }, 1500);

        } else {
        alert("Something went wrong.");
        }

    } catch (error) {
        console.error(error);
        alert("Error sending message.");
    }
    };


    // Show success message
//     setShowSuccess(true);

//     // Reset form
//     setFormData({
//       firstName: '',
//       email: '',
//       phone: '',
//       message: ''
//     });

//     // Close form after a brief delay
//     setTimeout(() => {
//       onClose();
//       // Hide success message after form closes
//       setTimeout(() => {
//         setShowSuccess(false);
//       }, 300);
//     }, 1500);
//   };

  const toggleState = (state) => {
    setExpandedState(expandedState === state ? null : state);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="contact-form-overlay" onClick={onClose}></div>
      <div className="contact-form-container">
        {showSuccess && (
          <div className="success-notification">
            <i className="fas fa-check-circle"></i>
            <span>Message Sent!</span>
          </div>
        )}

        <button className="contact-form-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>

        <div className="contact-form-content">
          <div className="contact-form-left">
            <div className="contact-form-header">
              <h2>GET IN TOUCH WITH US</h2>
            </div>

            <p className="contact-disclaimer">
              Please note that completing this form and submitting it to us will not establish an attorney-client relationship. Messages containing confidential or time-sensitive information should not be sent.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name*"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email*"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please type your message here"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                CONTACT NOW
              </button>
            </form>
          </div>

          <div className="contact-form-right">
            {Object.keys(officeLocations).map((state) => (
              <div key={state} className="office-accordion-item">
                <button
                  className={`office-accordion-header ${expandedState === state ? 'active' : ''}`}
                  onClick={() => toggleState(state)}
                >
                  <span>{state}</span>
                  <i className={`fas fa-${expandedState === state ? 'minus' : 'plus'}`}></i>
                </button>

                {expandedState === state && (
                  <div className="office-accordion-content">
                    {Array.isArray(officeLocations[state]) ? (
                      officeLocations[state].map((office, index) => (
                        <div key={index} className="office-location-info">
                          {office.name && <h4>{office.name}</h4>}
                          <p>{office.address}</p>
                          {office.suite && <p>{office.suite}</p>}
                          {office.poBox && <p>{office.poBox}</p>}
                          <p>{office.city}</p>
                          <p className="office-phone">{office.phone}</p>
                          <p className="office-fax">{office.fax}</p>
                          {office.directions && (
                            <a href={office.directions} className="directions-link">
                              Click here for directions
                            </a>
                          )}
                          {index < officeLocations[state].length - 1 && (
                            <div className="office-divider"></div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="office-location-info">
                        <p>{officeLocations[state].address}</p>
                        {officeLocations[state].suite && <p>{officeLocations[state].suite}</p>}
                        {officeLocations[state].poBox && <p>{officeLocations[state].poBox}</p>}
                        <p>{officeLocations[state].city}</p>
                        <p className="office-phone">{officeLocations[state].phone}</p>
                        <p className="office-fax">{officeLocations[state].fax}</p>
                        {officeLocations[state].directions && (
                          <a href={officeLocations[state].directions} className="directions-link">
                            Click here for directions
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
