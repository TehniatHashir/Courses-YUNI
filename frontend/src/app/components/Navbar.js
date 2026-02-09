import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Navbar() {
  const location = useLocation();
  const [animateLogo, setAnimateLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setAnimateLogo(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/about', label: 'About' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Contact' },
    { path: '/register', label: 'Register' },
  ];

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          text-decoration: none;
          color: #ffffff;
          padding: 0.5rem 1rem;
          font-weight: 800;
          transition: color 0.3s ease;
          display: block;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          height: 2px;
          background-color: #667eea;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #667eea;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: #667eea;
          font-weight: 800;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .logo-animate {
          opacity: 0;
          transform: translateX(-20px) translateY(0px);
          animation: logoFadeIn 1s forwards, logoFloat 4s ease-in-out infinite alternate;
        }

        @keyframes logoFadeIn {
          to { opacity: 1; transform: translateX(0) translateY(0); }
        }

        @keyframes logoFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
          100% { transform: translateY(0px); }
        }

        /* Hamburger Icon */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1002;
        }

        .hamburger span {
          display: block;
          width: 28px;
          height: 3px;
          background-color: #667eea;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }

        /* Mobile Menu Backdrop */
        .mobile-menu-backdrop {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mobile-menu-backdrop.open {
          display: block;
          opacity: 1;
        }

        /* Mobile Menu Drawer */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 280px;
          height: 100vh;
          background: linear-gradient(135deg, #081963 0%, #16213e 100%);
          z-index: 1001;
          transition: right 0.3s ease;
          overflow-y: auto;
          padding: 5rem 2rem 2rem;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-menu .nav-link {
          padding: 1rem;
          font-size: 1.1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .mobile-menu .nav-link:hover {
          background: rgba(102, 126, 234, 0.15);
          color: #667eea;
          padding-left: 1.5rem;
        }

        .mobile-menu .nav-link.active {
          background: rgba(102, 126, 234, 0.2);
          color: #667eea;
        }

        /* Responsive Styles */
        .nav-wrapper {
          position: relative;
          width: 100%;
          background: transparent;
          z-index: 1000;
          padding: 1rem 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .logo-box {
          display: flex;
          justify-content: flex-start;
          transition: all 0.3s ease;
        }

        .nav-menu {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
          transition: all 0.3s ease;
        }

        @media (max-width: 1023px) {
          .hamburger {
            display: flex;
          }

          .nav-menu {
            display: none;
          }

          .nav-container {
            justify-content: space-between;
          }
        }

        /* Accessibility: Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .logo-animate {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .mobile-menu,
          .mobile-menu-backdrop {
            transition: none;
          }
        }
      `}</style>

      <nav className="nav-wrapper">
        <div className="nav-container">
          {/* Logo container */}
          <div className="logo-box">
            <Link
              to="/"
              style={styles.logoLink}
              className={animateLogo ? 'logo-animate' : ''}
            >
              <img
                src="/Yuni.png"
                alt="YUNI Logo"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                }}
              />
              YUNI
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger Menu Button */}
          <button
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const styles = {
  logoLink: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#667eea',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  }
};
