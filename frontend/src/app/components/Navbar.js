import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Navbar() {
  const location = useLocation();
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    
    setAnimateLogo(true);
  }, []);

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
      `}</style>

      <nav style={styles.nav}>
        <div style={styles.container}>
          {/* Left-aligned logo + text */}
          <div style={styles.leftLogo}>
            <Link
              to="/"
              style={{ ...styles.logo, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              className={animateLogo ? 'logo-animate' : ''}
            >
              <img
                src="/Yuni.png"
                alt="YUNI Logo"
                style={{
                  width: '52px',
                  height: '52px',
                  objectFit: 'contain',
                }}
              />
              YUNI
            </Link>
          </div>

          {/* Right-aligned menu */}
          <ul style={styles.menu}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${
                    location.pathname === link.path ? 'active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    width: '100%',
    background: 'rgba(255, 255, 255, 0)',
    boxShadow: '0 2px 20px rgba(38, 16, 165, 0.76)',
    zIndex: 1000,
    padding: '1rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  leftLogo: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: '1', 
     marginLeft: '-280px', 
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#667eea',
    cursor: 'pointer',
  },
  menu: {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
};
