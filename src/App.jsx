import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Footer from './components/footer';
import ScrollToTop from './components/scroll-to-top';
import Home from './pages/home';
import Team from './pages/team';
import TeamDetail from './pages/team-detail';
import PracticeAreas from './pages/practice-areas';
import Careers from './pages/careers';
import News from './pages/news';
import NewsDetail from './pages/news-detail';
import History from './pages/history/History';
import Offices from './pages/offices';
import OfficeDetail from './pages/office-detail';
import Diversity from './pages/diversity/Diversity';
import Women from './pages/women/Women';
import './App.css';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/attorney/:id" element={<TeamDetail />} />
          <Route path="/practice-areas" element={<PracticeAreas />} />
          <Route path="/history" element={<History />} />
          <Route path="/offices" element={<Offices />} />
          <Route path="/offices/:id" element={<OfficeDetail />} />
          <Route path="/diversity" element={<Diversity />} />
          <Route path="/women" element={<Women />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;