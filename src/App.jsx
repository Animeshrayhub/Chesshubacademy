import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimatedStats from './components/AnimatedStats';
import WhyChooseUs from './components/WhyChooseUs';
import CoursesPreview from './components/CoursesPreview';
import StudentAchievements from './components/StudentAchievements';
import Testimonials from './components/Testimonials';
import TournamentCalendar from './components/TournamentCalendar';
import FAQ from './components/FAQ';
import DemoBooking from './components/DemoBooking';
import ChessFeatures from './components/ChessFeatures';
import Footer from './components/Footer';
import AdminView from './components/AdminView';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Add parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.hero-section');
      parallaxElements.forEach((el) => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  if (showAdmin) {
    return <AdminView />;
  }

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <AnimatedStats />
      <WhyChooseUs />
      <ChessFeatures />
      <CoursesPreview />
      <StudentAchievements />
      <Testimonials />
      <TournamentCalendar />
      <FAQ />
      <DemoBooking />
      <Footer onAdminClick={() => setShowAdmin(true)} />
    </div>
  );
}

export default App;
