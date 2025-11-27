import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import AttorneyDetail from './pages/AttorneyDetail';
import PracticeAreas from './pages/PracticeAreas';
import PracticeAreaDetail from './pages/PracticeAreaDetail';
import Careers from './pages/Careers';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import History from './pages/History';
import Offices from './pages/Offices';
import Diversity from './pages/Diversity';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/attorney/:id" element={<AttorneyDetail />} />
          <Route path="/practice-areas" element={<PracticeAreas />} />
          <Route path="/practice-areas/:area" element={<PracticeAreaDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/offices" element={<Offices />} />
          <Route path="/diversity" element={<Diversity />} />
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