import { useState, useEffect } from 'react';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

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

  // 🔹 Updated handleSubmit to integrate backend API
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
          phoneNumber: formData.phone, // backend expects phoneNumber
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! Welcome to YUNI!');
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

  const styles = {
    page: {
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    },
    container: { maxWidth: '500px', width: '100%', position: 'relative', zIndex: 10 },
    card: {
      background: 'white',
      borderRadius: '25px',
      padding: '2rem 2rem',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      animation: 'slideInScale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    logo: {
      fontSize: '3rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: { color: '#666', fontSize: '1.1rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.95rem', fontWeight: 600, color: '#555' },
    input: {
      padding: '1rem',
      fontSize: '1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      outline: 'none',
    },
    submitButton: {
      padding: '1.2rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
    },
  };

  const parallaxDir = (dx, dy, depth) => ({
    transform: `translate(${offset.x * dx * depth}px, ${offset.y * dy * depth}px)`,
    transition: 'transform 0.15s ease-out',
  });

  const parallaxMid = () => {
    const maxMove = 35;
    const x = Math.max(Math.min(offset.x * 0.07, maxMove), -maxMove);
    const y = Math.max(Math.min(offset.y * 0.07, maxMove), -maxMove);

    return {
      transform: `translate(${x}px, ${y}px)`,
      transition: 'transform 0.2s ease-out',
    };
  };

  return (
    <>
      <style>{`
        @keyframes slideInScale {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes floatOrbit {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(40px, -30px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
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

        .planet:hover {
          transform: scale(1.2);
        }

        .continuous {
          animation: floatOrbit 12s linear infinite;
        }
      `}</style>

      <div style={styles.page}>
        <img src="/images/background.png" className="bg-layer background" />
        <img src="/images/mid.png" className="bg-layer mid" style={parallaxMid()} />

        <img src="/images/earth.png" className="planet"
          style={{ top: '6%', left: '4%', width: '280px', ...parallaxDir(1, -1, 1.1) }} />

        <img src="/images/mars.png" className="planet"
          style={{ top: '18%', right: '8%', width: '160px', ...parallaxDir(-1, 1, 0.9) }} />

        <img src="/images/jupiter.png" className="planet"
          style={{ bottom: '22%', left: '12%', width: '240px', ...parallaxDir(1, 1, 1.2) }} />

        <img src="/images/venus.png" className="planet"
          style={{ top: '52%', right: '20%', width: '180px', ...parallaxDir(-0.8, -1, 1) }} />

        <img src="/images/saturn.png" className="planet continuous"
          style={{ bottom: '10%', right: '5%', width: '260px', ...parallaxDir(0.6, -0.6, 0.8) }} />

        <img src="/images/rock.png" className="planet"
          style={{ top: '32%', left: '42%', width: '130px', ...parallaxDir(-1.2, 0.8, 1.3) }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
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

                <button type="submit" style={styles.submitButton}>Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
