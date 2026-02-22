import './Careers.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import careersBannerImage from '/images/banner/Cleveland.jpeg';
import HeroWide from '../../components/hero-wide';

const Careers = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobUrls, setJobUrls] = useState(null);
  const [expandedJobSlug, setExpandedJobSlug] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load job data and URLs
    const loadJobData = async () => {
      try {
        const [professionalLiability, generalLiability, urls] = await Promise.all([
          fetch('/content/careers/professional-liability.json').then(res => res.json()),
          fetch('/content/careers/general-liability.json').then(res => res.json()),
          fetch('/content/careers/job-urls.json').then(res => res.json())
        ]);

        setJobs([professionalLiability, generalLiability]);
        setJobUrls(urls);
      } catch (error) {
        console.error('Error loading job data:', error);
      }
    };

    loadJobData();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleJob = (slug) => {
    setExpandedJobSlug(expandedJobSlug === slug ? null : slug);
  };

  const getJobUrl = (slug) => {
    if (!jobUrls) return jobUrls?.defaultUrl || 'https://www.indeed.com/cmp/Swartz-Campbell-LLC/jobs';

    const jobUrl = jobUrls.jobs[slug];

    // Check if URL exists, is not empty, and is a valid URL format
    if (jobUrl && jobUrl.trim() !== '' && isValidUrl(jobUrl)) {
      return jobUrl;
    }

    return jobUrls.defaultUrl;
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const handleApplyClick = (e, slug) => {
    const url = getJobUrl(slug);

    // If the URL fails to open or navigate, fallback to default
    // This creates a safety net for broken/removed job postings
    if (url === '#' || !url) {
      e.preventDefault();
      window.open(jobUrls?.defaultUrl || 'https://www.indeed.com/cmp/Swartz-Campbell-LLC/jobs', '_blank');
    }
  };

  const handleTeamTransition = (e) => {
    e.preventDefault();
    setIsTransitioning(true);

    // Wait for fade out animation to complete, then navigate
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      navigate('/team', { state: { fromHomepage: true } });
    }, 500);
  };

  return (
    <div className={`page-container ${isTransitioning ? 'page-transitioning' : ''}`}>
      {/* Careers Hero Section replaced by HeroWide */}
      <HeroWide backgroundImage={careersBannerImage}>
        <h1>Join Our Team</h1>
        {/* <p>Build Your Career with Swartz Campbell</p>
        <p>Discover opportunities to grow and make a difference in the legal profession</p> */}
      </HeroWide>

      {/* Why Work Here Section */}
      {/* <section className="why-work-here">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Swartz Campbell?</h2>
            <p>We're committed to fostering a collaborative environment where legal professionals can thrive</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Collaborative Culture</h3>
              <p>Work alongside experienced attorneys who are committed to mentoring and supporting your professional growth.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Continuous Learning</h3>
              <p>Access to CLE programs, professional development opportunities, and conference attendance to stay at the forefront of legal practice.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Work-Life Balance</h3>
              <p>Flexible scheduling options, remote work opportunities, and a focus on maintaining healthy work-life integration.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Comprehensive Benefits</h3>
              <p>Health insurance, dental, vision, 401(k) with matching, paid time off, and professional liability coverage.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Recognition & Growth</h3>
              <p>Clear advancement pathways, performance-based bonuses, and recognition for exceptional client service and legal excellence.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Client Impact</h3>
              <p>Work on meaningful cases that make a real difference in clients' lives and contribute to positive legal outcomes.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Open Positions Section */}
      <section className="open-positions">
        <div className="container">
          <div className="section-header">
            <h2>Current Opportunities</h2>
            <p>Explore our open positions and find the perfect fit for your legal career</p>
          </div>

          {/* Search Bar */}
          <div className="jobs-search-container">
            <div className="jobs-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search by title, location, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            <div className="jobs-count">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'} Available
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="no-positions">
              <p>Loading current opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <p>No positions match your search</p>
              <button className="btn-link" onClick={() => setSearchTerm('')}>
                Clear search
              </button>
            </div>
          ) : (
            <div className="jobs-accordion">
              {filteredJobs.map((job) => (
                <div key={job.slug} className={`accordion-item ${expandedJobSlug === job.slug ? 'expanded' : ''}`}>
                  <button
                    className="accordion-header"
                    onClick={() => toggleJob(job.slug)}
                  >
                    <div className="accordion-header-content">
                      <div className="accordion-title-section">
                        <h3>{job.title}</h3>
                        <div className="accordion-meta">
                          <span className="meta-item">
                            <i className="fas fa-map-marker-alt"></i>
                            {job.location}
                          </span>
                          <span className="meta-item">
                            <i className="fas fa-briefcase"></i>
                            {job.jobType}
                          </span>
                          <span className="meta-item salary">
                            <i className="fas fa-dollar-sign"></i>
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <div className="accordion-icon">
                        <i className={`fas fa-chevron-${expandedJobSlug === job.slug ? 'up' : 'down'}`}></i>
                      </div>
                    </div>
                  </button>

                  <div className="accordion-content">
                    <div className="accordion-content-inner">
                      {job.introduction && (
                        <div className="job-introduction">
                          {job.introduction.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      )}

                      <div className="job-description">
                        <h4>About the Position</h4>
                        <p>{job.description}</p>
                      </div>

                      {job.idealCandidate && (
                        <div className="job-section">
                          <h4>Ideal Candidate</h4>
                          <p>{job.idealCandidate}</p>
                        </div>
                      )}

                      {job.requirements && (
                        <div className="job-section">
                          <h4>Requirements</h4>
                          <ul>
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {job.experience && (
                        <div className="job-section">
                          <h4>Experience</h4>
                          <ul>
                            {job.experience.map((exp, index) => (
                              <li key={index}>{exp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {job.responsibilities && (
                        <div className="job-section">
                          <h4>Key Responsibilities</h4>
                          <ul>
                            {job.responsibilities.map((resp, index) => (
                              <li key={index}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {job.benefits && (
                        <div className="job-section">
                          <h4>Benefits</h4>
                          <ul className="benefits-list">
                            {job.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {job.workArrangement && (
                        <div className="job-section">
                          <h4>Work Arrangement</h4>
                          <p>{job.workArrangement}</p>
                        </div>
                      )}

                      {job.eeoc && (
                        <div className="job-section eeoc">
                          <p className="eeoc-statement">{job.eeoc}</p>
                        </div>
                      )}

                      <div className="position-actions">
                        <a
                          href={getJobUrl(job.slug)}
                          onClick={(e) => handleApplyClick(e, job.slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Apply on Indeed
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                        {job.contactEmail && (
                          <a
                            href={`mailto:${job.contactEmail}`}
                            className="btn btn-secondary"
                          >
                            Email Resume
                            <i className="fas fa-envelope"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Process Section */}
      <section className="application-process">
        <div className="container">
          <div className="section-header">
            <h2>Application Process</h2>
            <p>Here's what to expect when you apply to join our team</p>
          </div>

          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Submit Application</h3>
                <p>Send your resume, cover letter, and any relevant portfolio materials to our HR team.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Initial Review</h3>
                <p>Our hiring team will review your application and contact qualified candidates within 5-7 business days.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Interview Process</h3>
                <p>Participate in interviews with team members and leadership to discuss your experience and goals.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Final Decision</h3>
                <p>We'll make our decision and extend offers to successful candidates with competitive compensation packages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="careers-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join Our Team?</h2>
            <p>Take the next step in your legal career with Swartz Campbell</p>
            <div className="cta-buttons">
              <a
                href={jobUrls?.defaultUrl || 'https://www.indeed.com/cmp/Swartz-Campbell-LLC/jobs'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View All Open Roles
              </a>
              <button onClick={handleTeamTransition} className="btn btn-secondary">
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
