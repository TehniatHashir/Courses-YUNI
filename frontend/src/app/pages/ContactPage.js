import { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    const y = Math.max(Math.min(offset.y * 0.07, maxMove), -maxMove) + 100;
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
      background: 'transparent',
      position: 'relative',
      zIndex: 10,
    },
    hero: {
      padding: isMobile ? '3rem 1rem' : '4rem 2rem',
      background: 'transparent',
      color: 'white',
      textAlign: 'center',
      borderRadius: '15px',
    },
    heroTitle: {
      fontSize: isMobile ? 'clamp(2rem, 6vw, 3rem)' : '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      animation: 'fadeInUp 0.8s ease-out'
    },
    heroSubtitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      opacity: 0.95,
      animation: 'fadeInUp 0.8s ease-out 0.2s backwards'
    },
    content: { padding: isMobile ? '3rem 1rem' : '5rem 2rem' },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: isMobile ? '2rem' : '3rem',
    },
    formSection: {
      background: 'white',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#333'
    },
    form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.95rem', fontWeight: 600, color: '#555' },
    input: {
      padding: isMobile ? '0.9rem' : '1rem',
      fontSize: '1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      transition: 'border-color 0.3s, transform 0.3s',
      minHeight: '44px',
    },
    textarea: {
      padding: isMobile ? '0.9rem' : '1rem',
      fontSize: '1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      minHeight: isMobile ? '120px' : '150px',
      resize: 'vertical',
      fontFamily: 'inherit',
      transition: 'border-color 0.3s, transform 0.3s'
    },
    submitButton: {
      padding: isMobile ? '1rem' : '1.2rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.3s, box-shadow 0.3s',
      minHeight: '44px',
    },
    infoSection: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    infoCard: {
      background: 'white',
      padding: isMobile ? '1.5rem' : '2rem',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s'
    },
    infoIcon: { fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '1rem', display: 'block' },
    infoTitle: { fontSize: isMobile ? '1.1rem' : '1.3rem', fontWeight: 'bold', marginBottom: '0.8rem', color: '#333' },
    infoText: { color: '#666', lineHeight: '1.6', fontSize: isMobile ? '0.9rem' : '1rem' },
    socialLinks: { display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' },
    socialIcon: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      cursor: 'pointer',
      transition: 'transform 0.3s',
      minWidth: '44px',
      minHeight: '44px',
    },
  };

  return (
    <>
      <style>{`
        /* Desktop-only hover effects */
        @media (min-width: 768px) {
          .input:focus, .textarea:focus {
            border-color: #667eea !important;
            transform: translateY(-2px) !important;
          }
          .submit-button:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4) !important;
          }
          .info-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 15px 40px rgba(0,0,0,0.12) !important;
          }
          .social-icon:hover {
            transform: scale(1.15) rotate(10deg) !important;
          }
          .planet:hover { transform: scale(1.15); }
          .orbit { animation: floatOrbit 14s linear infinite; }
          .continuous-orbit { animation: continuousOrbit 12s linear infinite; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        body { margin: 0; overflow-x: hidden; }
        .space-bg { position: fixed; inset: 0; z-index: -20; overflow: hidden; }
        .bg-layer { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .planet { position: absolute; z-index: 2; transition: transform 0.25s ease; }

        @keyframes floatOrbit {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(40px,-30px) rotate(180deg); }
          100% { transform: translate(0,0) rotate(360deg); }
        }
        @keyframes continuousOrbit {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(-50px,40px) rotate(180deg); }
          100% { transform: translate(0,0) rotate(360deg); }
        }

        /* Accessibility: Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .orbit,
          .continuous-orbit,
          .planet {
            animation: none !important;
          }
          
          .input:focus,
          .textarea:focus,
          .submit-button:hover,
          .info-card:hover,
          .social-icon:hover,
          .planet:hover {
            transform: none !important;
          }
        }
      `}</style>

      <div className="space-bg">
        <img src="/images/bacs.jpg" className="bg-layer" alt="" />
        <img src="/images/mid.png" className="bg-layer" style={parallaxMid()} alt="" />
        <img src="/images/earth.png" className="planet" style={{ top: '6%', left: '4%', width: getPlanetSize('260px'), ...parallaxDir(1, -1, 1.1) }} alt="" />
        <img src="/images/mars.png" className="planet" style={{ top: '18%', right: '8%', width: getPlanetSize('150px'), ...parallaxDir(-1, 1, 0.9) }} alt="" />
        <img src="/images/jupiter.png" className="planet" style={{ bottom: '22%', left: '10%', width: getPlanetSize('240px'), ...parallaxDir(1, 1, 1.2) }} alt="" />
        <img src="/images/venus.png" className="planet" style={{ top: '52%', right: '18%', width: getPlanetSize('170px'), ...parallaxDir(-0.8, -1, 1) }} alt="" />
        <img src="/images/saturn.png" className="planet orbit" style={{ bottom: '10%', right: '5%', width: getPlanetSize('260px'), ...parallaxDir(0.6, -0.6, 0.8) }} alt="" />
        <img src="/images/rock.png" className="planet" style={{ top: '32%', left: '42%', width: getPlanetSize('120px'), ...parallaxDir(-1.2, 0.8, 1.3) }} alt="" />
        <img src="/images/uranus.png" className="planet continuous-orbit" style={{ top: '40%', left: '60%', width: getPlanetSize('180px'), ...parallaxDir(0.8, -0.5, 1) }} alt="" />
      </div>

      <div style={styles.page}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Get In Touch</h1>
          <p style={styles.heroSubtitle}>We'd love to hear from you</p>
        </div>

        <div style={styles.content}>
          <div style={styles.container}>
            <div style={styles.formSection}>
              <h2 style={styles.sectionTitle}>Send Us a Message</h2>
              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Your Name</label>
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Tehniat"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="ABC@example.com"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Subject</label>
                  <input
                    className="input"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Message</label>
                  <textarea
                    className="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={styles.textarea}
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button className="submit-button" type="submit" style={styles.submitButton}>
                  Send Message
                </button>
              </form>
            </div>

            <div style={styles.infoSection}>
              <div className="info-card" style={styles.infoCard}>
                <span style={styles.infoIcon}>📧</span>
                <h3 style={styles.infoTitle}>Email Us</h3>
                <p style={styles.infoText}>
                  yuniglobal67@gmail.com<br />
                  technospot.nastp@gmail.com
                </p>
              </div>

              <div className="info-card" style={styles.infoCard}>
                <span style={styles.infoIcon}>📞</span>
                <h3 style={styles.infoTitle}>Call Us</h3>
                <p style={styles.infoText}>
                  +92 334 1504808<br />
                  Mon-Fri, 9am-6pm
                </p>
              </div>

              <div className="info-card" style={styles.infoCard}>
                <span style={styles.infoIcon}>📍</span>
                <h3 style={styles.infoTitle}>Visit Us</h3>
                <p style={styles.infoText}>
                  NASTP Rawalpindi<br />
                  Alpha Techno Square<br />
                  Pakistan
                </p>
              </div>

              <div className="info-card" style={styles.infoCard}>
                <span style={styles.infoIcon}>🌐</span>
                <h3 style={styles.infoTitle}>Follow Us</h3>
                <div style={styles.socialLinks}>
                  <div className="social-icon" style={styles.socialIcon} aria-label="Facebook">📘</div>
                  <div className="social-icon" style={styles.socialIcon} aria-label="Twitter">🐦</div>
                  <div className="social-icon" style={styles.socialIcon} aria-label="Instagram">📸</div>
                  <div className="social-icon" style={styles.socialIcon} aria-label="LinkedIn">💼</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
