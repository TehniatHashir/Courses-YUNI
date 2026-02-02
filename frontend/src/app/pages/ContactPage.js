import { useState, useEffect } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
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

  // ===== Mouse parallax effect for background =====
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * 600;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * 600;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxDir = (dx, dy, depth) => ({
    transform: `translate(${offset.x * dx * depth}px, ${offset.y * dy * depth}px)`,
    transition: 'transform 0.15s ease-out',
  });

  const parallaxMid = () => {
    const maxMove = 35;
    const x = Math.max(Math.min(offset.x * 0.07, maxMove), -maxMove);
    const y = Math.max(Math.min(offset.y * 0.07, maxMove), -maxMove) + 100;
    return {
      transform: `translate(${x}px, ${y}px)`,
      transition: 'transform 0.2s ease-out',
    };
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'transparent',
      position: 'relative',
      zIndex: 10,
    },
    hero: {
      padding: '4rem 2rem',
      background: 'rgba(102, 126, 234, 0.21)',
      color: 'white',
      textAlign: 'center',
      borderRadius: '15px',
    },
    heroTitle: { fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' },
    heroSubtitle: { fontSize: '1.2rem', opacity: 0.95 },
    content: { padding: '5rem 2rem' },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3rem',
    },
    formSection: {
      background: 'white',
      padding: '2.5rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    sectionTitle: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#333' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.95rem', fontWeight: 600, color: '#555' },
    input: { padding: '1rem', fontSize: '1rem', border: '2px solid #e0e0e0', borderRadius: '10px', outline: 'none', transition: 'border-color 0.3s, transform 0.3s' },
    textarea: { padding: '1rem', fontSize: '1rem', border: '2px solid #e0e0e0', borderRadius: '10px', outline: 'none', minHeight: '150px', resize: 'vertical', fontFamily: 'inherit', transition: 'border-color 0.3s, transform 0.3s' },
    submitButton: { padding: '1.2rem', fontSize: '1.1rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' },
    infoSection: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    infoCard: { background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s, box-shadow 0.3s' },
    infoIcon: { fontSize: '2.5rem', marginBottom: '1rem', display: 'block' },
    infoTitle: { fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.8rem', color: '#333' },
    infoText: { color: '#666', lineHeight: '1.6' },
    socialLinks: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    socialIcon: { width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', cursor: 'pointer', transition: 'transform 0.3s' },
  };

  return (
    <>
      <style>{`
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

        body { margin: 0; overflow-x: hidden; }
        .space-bg { position: fixed; inset: 0; z-index: -20; overflow: hidden; }
        .bg-layer { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .planet { position: absolute; z-index: 2; transition: transform 0.25s ease; }
        .planet:hover { transform: scale(1.15); }
        .orbit { animation: floatOrbit 14s linear infinite; }
        .continuous-orbit { animation: continuousOrbit 12s linear infinite; }

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
      `}</style>

      
      <div className="space-bg">
        <img src="/images/bacs.jpg" className="bg-layer" />
        <img src="/images/mid.png" className="bg-layer" style={parallaxMid()} />
        <img src="/images/earth.png" className="planet" style={{ top: '6%', left: '4%', width: '260px', ...parallaxDir(1, -1, 1.1) }} />
        <img src="/images/mars.png" className="planet" style={{ top: '18%', right: '8%', width: '150px', ...parallaxDir(-1, 1, 0.9) }} />
        <img src="/images/jupiter.png" className="planet" style={{ bottom: '22%', left: '10%', width: '240px', ...parallaxDir(1, 1, 1.2) }} />
        <img src="/images/venus.png" className="planet" style={{ top: '52%', right: '18%', width: '170px', ...parallaxDir(-0.8, -1, 1) }} />
        <img src="/images/saturn.png" className="planet orbit" style={{ bottom: '10%', right: '5%', width: '260px', ...parallaxDir(0.6, -0.6, 0.8) }} />
        <img src="/images/rock.png" className="planet" style={{ top: '32%', left: '42%', width: '120px', ...parallaxDir(-1.2, 0.8, 1.3) }} />
        <img src="/images/uranus.png" className="planet continuous-orbit" style={{ top: '40%', left: '60%', width: '180px', ...parallaxDir(0.8, -0.5, 1) }} />
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
                  <div className="social-icon" style={styles.socialIcon}>📘</div>
                  <div className="social-icon" style={styles.socialIcon}>🐦</div>
                  <div className="social-icon" style={styles.socialIcon}>📸</div>
                  <div className="social-icon" style={styles.socialIcon}>💼</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
