import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip parallax on mobile

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * 600;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * 600;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        alert(`Registration failed: ${data.msg || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Could not connect to the server. Please ensure the backend is running.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const parallaxDir = (dx, dy, depth) => {
    if (isMobile) return {};
    return {
      transform: `translate(${offset.x * dx * depth}px, ${offset.y * dy * depth}px)`,
      transition: 'transform 0.15s ease-out',
    };
  };

  const parallaxMid = () => {
    if (isMobile) return {};
    const maxMove = 35;
    const x = Math.max(Math.min(offset.x * 0.07, maxMove), -maxMove);
    const y = Math.max(Math.min(offset.y * 0.07, maxMove), -maxMove);
    return {
      transform: `translate(${x}px, ${y}px)`,
      transition: 'transform 0.2s ease-out',
    };
  };

  const getPlanetSize = (desktopSize) => {
    return isMobile ? `${parseInt(desktopSize) * 0.5}px` : desktopSize;
  };

  const styles = {
    page: {
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    },
    container: {
      maxWidth: isMobile ? '100%' : '500px',
      width: '100%',
      position: 'relative',
      zIndex: 10,
      padding: isMobile ? '0 1rem' : '0',
    },
    card: {
      background: 'white',
      borderRadius: isMobile ? '15px' : '25px',
      padding: isMobile ? '1.5rem' : '2rem 2rem',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      animation: 'slideInScale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    header: { textAlign: 'center', marginBottom: isMobile ? '2rem' : '2.5rem' },
    logo: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'fadeInUp 0.8s ease-out',
    },
    subtitle: {
      color: '#666',
      fontSize: isMobile ? '1rem' : '1.1rem',
      animation: 'fadeInUp 0.8s ease-out 0.2s backwards'
    },
    form: { display: 'flex', flexDirection: 'column', gap: isMobile ? '1.2rem' : '1.5rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.95rem', fontWeight: 600, color: '#555' },
    input: {
      padding: isMobile ? '0.9rem' : '1rem',
      fontSize: '1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      outline: 'none',
      minHeight: '44px',
    },
    submitButton: {
      padding: isMobile ? '1rem' : '1.2rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      flex: 1,
      minHeight: '44px',
    },
    cancelButton: {
      padding: isMobile ? '1rem' : '1.2rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      background: '#ff4d4d',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      flex: 1,
      transition: 'background 0.3s',
      minHeight: '44px',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '1rem',
      marginTop: '1rem',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.4s ease-out',
    },
    modal: {
      background: 'white',
      padding: '3rem 2rem',
      borderRadius: '30px',
      textAlign: 'center',
      maxWidth: '400px',
      width: '90%',
      animation: 'slideUpBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    },
    successIcon: {
      fontSize: '5rem',
      marginBottom: '1rem',
      display: 'block',
      animation: 'scaleUp 0.5s ease-out 0.3s backwards',
    },
    modalButton: {
      marginTop: '2rem',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      fontSize: '1.1rem',
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInScale {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatOrbit {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(40px, -30px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpBounce {
          from { opacity: 0; transform: translateY(50px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes scaleUp {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        .bg-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          top: 0;
          left: 0;
        }

        .background { z-index: 1; }
        .mid { z-index: 2; }

        .planet {
          position: absolute;
          z-index: 3;
          transition: transform 0.25s ease;
        }

        /* Desktop-only hover and animations */
        @media (min-width: 768px) {
          .planet:hover {
            transform: scale(1.2);
          }

          .continuous {
            animation: floatOrbit 12s linear infinite;
          }
        }

        /* Accessibility: Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .continuous,
          .planet,
          .bg-layer,
          .modal,
          .modalOverlay,
          .successIcon {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div style={styles.page}>
        <img src="/images/bacs.jpg" className="bg-layer background" alt="" />
        <img src="/images/mid.png" className="bg-layer mid" style={parallaxMid()} alt="" />

        <img src="/images/earth.png" className="planet"
          style={{ top: '6%', left: '4%', width: getPlanetSize('280px'), ...parallaxDir(1, -1, 1.1) }} alt="" />

        <img src="/images/mars.png" className="planet"
          style={{ top: '18%', right: '8%', width: getPlanetSize('160px'), ...parallaxDir(-1, 1, 0.9) }} alt="" />

        <img src="/images/jupiter.png" className="planet"
          style={{ bottom: '22%', left: '12%', width: getPlanetSize('240px'), ...parallaxDir(1, 1, 1.2) }} alt="" />

        <img src="/images/venus.png" className="planet"
          style={{ top: '52%', right: '20%', width: getPlanetSize('180px'), ...parallaxDir(-0.8, -1, 1) }} alt="" />

        <img src="/images/saturn.png" className="planet continuous"
          style={{ bottom: '10%', right: '5%', width: getPlanetSize('260px'), ...parallaxDir(0.6, -0.6, 0.8) }} alt="" />

        <img src="/images/rock.png" className="planet"
          style={{ top: '32%', left: '42%', width: getPlanetSize('130px'), ...parallaxDir(-1.2, 0.8, 1.3) }} alt="" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: isMobile ? '2rem 0' : '0' }}>
          <div style={styles.container}>
            <div style={styles.card}>
              <div style={styles.header}>
                <div style={styles.logo}>YUNI</div>
                <p style={styles.subtitle}>Register Now</p>
              </div>

              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={styles.input} required />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} required />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} required />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Confirm Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={styles.input} required />
                </div>

                <div style={styles.buttonGroup}>
                  <button type="button" onClick={() => navigate('/')} style={styles.cancelButton}>Cancel</button>
                  <button type="submit" style={styles.submitButton}>Create Account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <span style={styles.successIcon}>🎉</span>
            <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '0.5rem' }}>Success!</h2>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Registration successful!<br />Welcome to YUNI.
            </p>
            <button
              style={styles.modalButton}
              onClick={() => navigate('/')}
            >
              Go to Home
            </button>
            <button
              style={{
                ...styles.modalButton,
                background: 'none',
                color: '#667eea',
                marginTop: '0.5rem',
                border: '2px solid #667eea',
              }}
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

