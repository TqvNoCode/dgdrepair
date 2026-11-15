import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/main.css';

import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Process from './components/Process';
import FAQ from './components/FAQ';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [preselectedService, setPreselectedService] = useState('');

  const handleBookService = (serviceId) => {
    setPreselectedService(serviceId);
    const bookingElement = document.querySelector('#dat-lich');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary">
      {/* Scroll-aware Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        <Hero />
        <Services onBookService={handleBookService} />
        <Pricing onBookService={handleBookService} />
        <Process />
        <FAQ />
        <BookingForm preselectedService={preselectedService} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
