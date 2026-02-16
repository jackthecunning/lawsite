import { preloadAttorneyImages } from './utils/preloadAttorneyImages';
// List of all attorney image filenames (update as needed)
const ATTORNEY_IMAGE_FILES = [
  "Ahern-Brian.jpg",
  "andrea-graf.jpg",
  "Bruch-Daniel-017-683x1024.jpg",
  "Candidus-K-Dougherty.jpg",
  "Christina-Murdoch-3282-683x1024.jpg",
  "Cognetti-Michael-013-683x1024.jpg",
  "Cunningham-Patrick-06-240x300.jpg",
  "Edmund-K.-John.jpg",
  "Eisner-Jillian-07-e1717099262710.jpg",
  "Fuchion-Paige-559-731x1024.jpg",
  "Goldman-Robert-304-731x1024.jpg",
  "Heenan-Chris-002-732x1024.jpg",
  "J.McCarron.png",
  "Joseph-A.-Venuti-Jr..jpg",
  "Kathleen-M.-Carson.jpg",
  "Le-Jejeune-Peter-029-683x1024.jpg",
  "Lombard-Jane-78-683x1024.jpg",
  "Maginnis-Pamela-0589-731x1024.jpg",
  "Michael-E.-Giblin.jpg",
  "Mutzig-Kristin-095.png",
  "N.-Goldstein-047-731x1024.jpg",
  "Naylor-Joseph-088-240x300.jpg",
  "P.-Joseph-Craycraft.jpg",
  "Plonski_Stephen-43728-300x300.jpg",
  "Skiles-Nicholas-058-683x1024.jpg",
  "Smith-Bryan.png",
  "Steiger-Caryn-04271-683x1024.jpg",
  "Stephen-R.Mlinac.jpg",
  "Texter-Allison-023-683x1024.jpg",
  "Upload_20211108-140545-300x200.jpg",
  "William-A.-Jones.jpg",
  "William-F.-Conway.jpg",
  "William-T.-Salzer.jpg",
];

// Preload attorney images on app load
preloadAttorneyImages(ATTORNEY_IMAGE_FILES);
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
import Testimonials from './pages/testimonials/Testimonials';
import Admin from './pages/admin/Admin';
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;