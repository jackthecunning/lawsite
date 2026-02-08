

import React, { useEffect, useState, useRef } from "react";
import "./Testimonials.css";



const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    fetch("/content/testimonials/testimonials.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load testimonials");
        return res.json();
      })
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || error) return;
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      cardRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportCenter - cardCenter);
        const maxDistance = window.innerHeight * 0.6; // Reduced from full height for faster fade

        // Calculate scale and opacity based on distance from center
        const proximity = Math.max(0, 1 - distanceFromCenter / maxDistance);
        const scale = 0.7 + proximity * 0.45; // Scale from 0.7 to 1.15
        const opacity = proximity; // Fades to 0 completely

        ref.style.transform = `translateY(0) scale(${scale})`;
        ref.style.opacity = opacity;

        // Add visible class when in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          ref.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [testimonials, loading, error]);

  if (loading) return <div style={{padding: '3rem', textAlign: 'center'}}>Loading...</div>;
  if (error) return <div style={{padding: '3rem', textAlign: 'center'}}>Error: {error}</div>;

  return (
    <div style={{background: '#f7fafc', minHeight: '100vh', padding: '0', margin: '0', position: 'relative'}}>
      <div className="testimonials-header">
        <h1 className="testimonials-title">Client Testimonials</h1>
        <p className="testimonials-subtitle">Hear what our clients have to say</p>
        <div className="testimonials-line"></div>
      </div>
      <div className="testimonials-list">
        {testimonials.map((quote, idx) => (
          <blockquote
            key={idx}
            className={`testimonial-quote ${idx % 2 === 0 ? 'left' : 'right'}`}
            ref={el => cardRefs.current[idx] = el}
          >
            {quote}
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
