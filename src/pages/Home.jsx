import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Attorneys from '../components/Attorneys';
import HomeNews from '../components/HomeNews';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Attorneys />
      <HomeNews />
      {/* <About /> */}
      <Contact />
    </>
  );
};

export default Home;