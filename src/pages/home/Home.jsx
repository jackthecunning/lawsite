import { useState, useEffect, useRef } from 'react';
import Hero from '../../components/hero';
import Attorneys from '../../components/attorneys';
import Services from '../../components/services';
import HomeNews from '../../components/home-news';
import QuickAccess from '../../components/quick-access';
import HeritageSection from '../../components/home/heritage-section';
import ContactSection from '../../components/home/contact-section';

const Home = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [quickAccessVisible, setQuickAccessVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setQuickAccessVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getYearsSinceFounding = () => {
    const foundingYear = 1921;
    const currentYear = new Date().getFullYear();
    return currentYear - foundingYear;
  };

  return (
    <>
      <Hero />
      <QuickAccess quickAccessVisible={quickAccessVisible} />
      <HeritageSection yearsSinceFounding={getYearsSinceFounding()} />
      <Services />
      <Attorneys />
      <HomeNews />
      <ContactSection />
    </>
  );
};

export default Home;
