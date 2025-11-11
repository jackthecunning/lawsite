# Swartz Campbell Law Firm - React Website

A modern, responsive React website for Swartz Campbell law firm, featuring detailed attorney profiles, service descriptions, and contact functionality.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Modern React**: Built with React 18 and modern hooks
- **Router Integration**: React Router for seamless navigation
- **Component Architecture**: Modular, reusable components
- **Professional Styling**: Clean, professional design matching legal industry standards
- **Attorney Profiles**: Comprehensive attorney information with photos and credentials
- **Service Showcase**: Detailed practice area descriptions
- **Contact Forms**: Functional contact form for client inquiries

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navigation.jsx   # Main navigation bar
│   ├── Hero.jsx        # Hero section with slideshow
│   ├── About.jsx       # About section
│   ├── Services.jsx    # Practice areas display
│   ├── Attorneys.jsx   # Attorney cards for home page
│   ├── Contact.jsx     # Contact form and info
│   └── Footer.jsx      # Site footer
├── pages/              # Page-level components
│   ├── Home.jsx        # Main landing page
│   └── Team.jsx        # Full team page
├── data/              # Static data
│   └── firmData.js    # Attorney and firm information
├── App.jsx           # Main app component
├── main.jsx          # Application entry point
├── index.css         # Global styles
└── App.css           # App-specific styles
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Copy Images**:
   Copy the attorney images and other assets from the original website to `public/images/`

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Key Components

### Navigation
- Responsive navigation with mobile hamburger menu
- Active route highlighting
- Smooth scrolling to sections

### Hero Section
- Rotating background slideshow
- Call-to-action buttons
- Firm statistics display

### Attorney Profiles
- Complete attorney information
- Professional photos
- Education and credentials
- Direct contact information

### Services
- Practice area cards
- Feature lists for each service
- Professional icons

### Contact Form
- Functional form with validation
- Multiple contact methods
- Office information display

## Customization

### Adding New Attorneys
Edit `src/data/firmData.js` and add new attorney objects to the `attorneys` array.

### Adding Services
Add new service objects to the `services` array in `src/data/firmData.js`.

### Styling Changes
Main styles are in `src/index.css`. Component-specific styles can be added to individual components.

## Technologies Used

- **React 18**: Modern React with hooks
- **React Router DOM**: Client-side routing
- **Vite**: Fast build tool and development server
- **CSS3**: Modern CSS with Grid and Flexbox
- **Font Awesome**: Professional icons
- **Google Fonts**: Crimson Text and Open Sans fonts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Swartz Campbell. All rights reserved.