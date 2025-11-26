import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Import all CSS files in order
import './styles/base.css'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/services.css'
import './styles/attorneys.css'
import './styles/team.css'
import './styles/contact.css'
import './styles/footer.css'
import './styles/practice-areas.css'
import './styles/practice-area-detail.css'
import './styles/attorney-detail.css'
import './styles/news.css'
import './styles/utilities.css'
import './styles/animations.css'
import './styles/responsive.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)