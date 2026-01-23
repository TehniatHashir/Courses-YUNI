import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { SplashScreen } from './app/components/SplashScreen';
import { Navbar } from './app/components/Navbar';

import { HomePage } from './app/pages/HomePage';
import { CoursesPage } from './app/pages/CoursesPage';
import { AboutPage } from './app/pages/AboutPage';
import { BlogsPage } from './app/pages/BlogsPage';
import { ContactPage } from './app/pages/ContactPage';
import { RegisterPage } from './app/pages/RegisterPage';

function Footer() {
  const styles = {
    footer: {
      background: ' #526de2',
      color: 'white',
      padding: '4rem 2rem 2rem',
      marginTop: 'auto',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '3rem',
      marginBottom: '3rem',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    link: {
      color: 'rgba(255,255,255,0.7)',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    bottom: {
      borderTop: '1px solid rgba(255,255,255,0.1)',
      paddingTop: '2rem',
      textAlign: 'center',
      color: 'rgba(255,255,255,0.6)',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.section}>
            <h3 style={styles.title}>YUNI</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
              Empowering learners worldwide with quality education and innovative teaching methods.
            </p>
          </div>

          <div style={styles.section}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Quick Links</h4>
            <a href="/" style={styles.link}>Home</a>
            <a href="/courses" style={styles.link}>Courses</a>
            <a href="/about" style={styles.link}>About Us</a>
            <a href="/blogs" style={styles.link}>Blog</a>
          </div>

          <div style={styles.section}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Support</h4>
            <a href="/contact" style={styles.link}>Contact Us</a>
            <a href="#" style={styles.link}>FAQ</a>
            <a href="#" style={styles.link}>Help Center</a>
            <a href="#" style={styles.link}>Terms of Service</a>
          </div>

          <div style={styles.section}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Newsletter</h4>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              Subscribe to get updates on new courses and features.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: 'none',
                }}
              />
              <button
                style={{
                  padding: '0.8rem 1.5rem',
                  background: 'linear-gradient(135deg, #7184dd 0%, #455dc9 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <p>© 2026 YUNI Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';

  return (
    <>
      <ScrollToTop />
      {!isRegisterPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {!isRegisterPage && <Footer />}
    </>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const styles = {
    app: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
        }

        a:hover {
          opacity: 0.8;
        }
      `}</style>

      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <BrowserRouter>
          <div style={styles.app}>
            <AppContent />
          </div>
        </BrowserRouter>
      )}
    </>
  );
}
