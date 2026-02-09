import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

function BounceCards({ items }) {
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
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

  // Dynamic transforms based on number of items for balanced desktop centering
  const getTransform = (index, total) => {
    if (isMobile) return 'none';
    const offset = 120; // Distance between cards
    const centerX = (total - 1) * offset / 2;
    const x = index * offset - centerX;
    const rotation = (index - (total - 1) / 2) * 5;
    return `rotate(${rotation}deg) translateX(${x}px)`;
  };

  // Initial bounce animation (simplified on mobile)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Simple fade-in for mobile
        gsap.fromTo(
          '.bounce-card',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
        );
      } else {
        // Full bounce animation for desktop
        gsap.fromTo(
          '.bounce-card',
          { scale: 0 },
          { scale: 1, stagger: 0.15, ease: 'back.out(1.2)', delay: 0.4 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleClick = () => {
    if (isMobile || !containerRef.current) return; // Disable interaction on mobile

    const q = gsap.utils.selector(containerRef);

    if (!expanded) {
      // Expand all cards in a line
      items.forEach((_, i) => {
        const target = q(`.bounce-card-${i}`);
        gsap.to(target, {
          x: i * 220 - ((items.length - 1) * 110),
          y: 0,
          scale: 1.2,
          rotation: 0,
          zIndex: 10 - i,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    } else {
      // Collapse back to original stack with dynamic transform
      items.forEach((_, i) => {
        const target = q(`.bounce-card-${i}`);
        const transform = getTransform(i, items.length);
        const rotationMatch = transform.match(/rotate\((-?\d+)deg\)/);
        const translateMatch = transform.match(/translateX\((-?\d+)px\)/);

        gsap.to(target, {
          x: translateMatch ? parseInt(translateMatch[1]) : 0,
          y: 0,
          scale: 1,
          rotation: rotationMatch ? parseInt(rotationMatch[1]) : 0,
          zIndex: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    }

    setExpanded(!expanded);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: isMobile ? 'auto' : '300px',
        marginTop: isMobile ? '2rem' : '4rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '1.5rem' : '0',
        padding: isMobile ? '0 1rem' : '0',
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={`bounce-card bounce-card-${i}`}
          onClick={handleClick}
          style={{
            position: isMobile ? 'relative' : 'absolute',
            width: isMobile ? '140px' : '200px',
            height: isMobile ? '140px' : '200px',
            borderRadius: '25px',
            background: 'linear-gradient(135deg,#2c47bd,#af0f87)',
            boxShadow: '0 15px 35px rgba(0,0,0,.35)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: isMobile ? 'default' : 'pointer',
            transform: getTransform(i, items.length),
            zIndex: 1,
            margin: isMobile ? '0 auto' : '0',
          }}
        >
          <h2 style={{ fontSize: isMobile ? '2.2rem' : '3.2rem', color: '#fffb02fd' }}>{item.number}</h2>
          <p style={{ fontSize: isMobile ? '0.9rem' : '1.3rem', color: '#fff', fontWeight: 600 }}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function HomePage() {
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

  const sectionStyles = {
    section: {
      padding: isMobile ? '3rem 1rem' : '6rem 2rem',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: isMobile ? '2rem' : '3.1rem',
      fontWeight: '850',
      color: '#edfd10ef',
      marginBottom: '2rem',
    },
    subtitle: {
      fontSize: isMobile ? '1.2rem' : '2.1rem',
      color: '#edfd10ef',
      maxWidth: '700px',
      margin: '0 auto 3rem',
      lineHeight: '1.6',
    },
  };

  const features = [
    { icon: '📚', title: 'Expert Instructors', description: 'Learn from industry professionals' },
    { icon: '🎯', title: 'Hands-on Projects', description: 'Build real-world projects' },
    { icon: '🏆', title: 'Certificates', description: 'Earn recognized certificates' },
    { icon: '💬', title: 'Community Support', description: 'Get help when needed' },
    { icon: '🧠', title: 'Smart Learning Paths', description: 'Structured skill journeys' },
    { icon: '🛠️', title: 'Practical Skills', description: 'Real-life guided exercises' },
  ];

  const stats = [
    { number: '10K+', label: 'Students' },
    { number: '50+', label: 'Courses' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Support' },
  ];

  const featuredCourses = [
    { title: 'Artificial Intelligence', image: '/Ai.jpg', frontDesc: 'AI, ML & Python from scratch.' },
    { title: 'Cyber Security', image: '/cybersecurity.jpg', frontDesc: 'Ethical Hacking & Security.' },
    { title: 'Web Development', image: '/webdev.jpg', frontDesc: 'Learn HTML, CSS, JavaScript, React, backend basics' },
  ];

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

  return (
    <>
      <style>{`
        body { margin: 0; overflow-x: hidden; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .space-bg { position: fixed; inset: 0; z-index: -20; overflow: hidden; }
        .bg-layer { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .planet { position: absolute; z-index: 2; transition: transform 0.25s ease; }
        
        /* Desktop-only hover and animations */
        @media (min-width: 768px) {
          .planet:hover { transform: scale(1.15); }
          .orbit { animation: floatOrbit 14s linear infinite; }
          .continuous-orbit { animation: continuousOrbit 12s linear infinite; }
        }

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

        /* 3D Carousel - Desktop only */
        .carousel-wrapper { 
          height: ${isMobile ? 'auto' : '500px'}; 
          display: flex; 
          flex-direction: ${isMobile ? 'column' : 'row'};
          justify-content: center; 
          align-items: center; 
          perspective: ${isMobile ? 'none' : '1400px'};
          gap: ${isMobile ? '1rem' : '0'};
        }
        
        .carousel { 
          width: ${isMobile ? '100%' : '320px'}; 
          height: ${isMobile ? 'auto' : '400px'}; 
          transform-style: ${isMobile ? 'flat' : 'preserve-3d'};
        }
        
        @media (min-width: 768px) {
          .carousel { animation: spin 20s linear infinite; }
        }
        
        .carousel-item { 
          position: ${isMobile ? 'relative' : 'absolute'}; 
          width: ${isMobile ? '100%' : '280px'}; 
          height: ${isMobile ? 'auto' : '360px'}; 
          transform-style: ${isMobile ? 'flat' : 'preserve-3d'};
          margin-bottom: ${isMobile ? '1rem' : '0'};
        }
        
        .card-face {
          position: ${isMobile ? 'relative' : 'absolute'};
          inset: 0;
          border-radius: 18px;
          background: white;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          backface-visibility: hidden;
          padding: 1.5rem;
          min-height: ${isMobile ? '150px' : 'auto'};
        }
        
        .card-back { 
          transform: ${isMobile ? 'none' : 'rotateY(180deg)'}; 
          background: #2574ceef;
          display: ${isMobile ? 'none' : 'flex'};
        }
        
        @keyframes spin { 
          from { transform: rotateY(0deg); } 
          to { transform: rotateY(360deg); } 
        }

        /* Course Reels - Responsive */
        .courses-reels { 
          display: flex; 
          flex-direction: ${isMobile ? 'column' : 'row'};
          gap: 1rem; 
          height: ${isMobile ? 'auto' : '420px'}; 
        }
        
        .course-reel { 
          flex: 1; 
          position: relative; 
          border-radius: 18px; 
          overflow: hidden; 
          transition: flex 0.5s;
          min-height: ${isMobile ? '250px' : 'auto'};
        }
        
        @media (min-width: 768px) {
          .course-reel:hover { flex: 4; }
        }
        
        .course-reel img { width: 100%; height: 100%; object-fit: cover; }
        .course-reel::after { 
          content:""; 
          position:absolute; 
          inset:0; 
          background:linear-gradient(to top,rgba(0,0,0,.7),transparent); 
        }
        
        .course-content { 
          position:absolute; 
          bottom:20px; 
          left:20px; 
          color:#fff; 
          opacity: ${isMobile ? '1' : '0'};
          transition:.4s; 
          z-index: 1;
        }
        
        @media (min-width: 768px) {
          .course-reel:hover .course-content { 
            opacity:1; 
            transform:translateY(-10px); 
          }
        }

        /* Accessibility: Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .orbit,
          .continuous-orbit,
          .carousel {
            animation: none !important;
          }
          
          .planet:hover,
          .course-reel:hover {
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

      <section
        style={{
          ...sectionStyles.section,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ padding: isMobile ? '0 1rem' : '0' }}>
          <h1 style={{
            fontSize: isMobile ? 'clamp(2.5rem, 8vw, 4.8rem)' : '4.8rem',
            color: '#ffffff',
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            Welcome to YUNI
          </h1>
          <p style={{
            fontSize: isMobile ? 'clamp(1.2rem, 4vw, 2.4rem)' : '2.4rem',
            color: '#ffffffef',
            marginBottom: '2rem',
            animation: 'fadeInUp 0.8s ease-out 0.2s backwards'
          }}>
            Unlock your potential with world-class courses
          </p>
          <Link
            to="/courses"
            style={{
              padding: isMobile ? '0.8rem 2rem' : '1rem 3rem',
              background: '#af0f87f6',
              borderRadius: '40px',
              color: '#ffffffef',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
            Explore Courses
          </Link>

          <p
            style={{
              fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2.8rem)' : '2.8rem',
              color: '#ffffff',
              marginTop: '4.5rem',
              lineHeight: '1.5',
            }}
          >
            ستاروں سے آگے جہاں اور بھی ہیں <br />
          </p>
        </div>
      </section>

      <section style={{ ...sectionStyles.section, marginTop: isMobile ? '3rem' : '6rem' }}>
        <h2 style={{ ...sectionStyles.title, marginBottom: isMobile ? '2rem' : '5rem' }}>Why Choose YUNI?</h2>
        <div className="carousel-wrapper">
          <div className="carousel">
            {features.map((f, i) => (
              <div
                key={i}
                className="carousel-item"
                style={{ transform: isMobile ? 'none' : `rotateY(${(360 / features.length) * i}deg) translateZ(450px)` }}
              >
                <div className="card-face">
                  <div style={{ fontSize: '3rem' }}>{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
                <div className="card-face card-back">
                  <h3>{f.title}</h3>
                  <p>Start learning today 🚀</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyles.section, marginTop: isMobile ? '3rem' : '6rem' }}>
        <h2 style={sectionStyles.title}>Our Impact</h2>
        <BounceCards items={stats} />
      </section>

      <section style={{ ...sectionStyles.section, marginTop: isMobile ? '3rem' : '6rem' }}>
        <h2 style={sectionStyles.title}>Popular Courses</h2>
        <div className="courses-reels">
          {featuredCourses.map((c, i) => (
            <div key={i} className="course-reel">
              <img src={c.image} alt={c.title} />
              <div className="course-content">
                <h3>{c.title}</h3>
                <p>{c.frontDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          ...sectionStyles.section,
          background: '#2c47bd',
          borderRadius: '20px',
          maxWidth: '1000px',
          margin: isMobile ? '4rem 1rem' : '7rem auto 9rem',
        }}
      >
        <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: isMobile ? '2rem' : '5rem' }}>Ready to Level Up?</h2>
        <Link
          to="/courses"
          style={{
            padding: isMobile ? '0.8rem 2rem' : '1rem 3rem',
            background: '#fff',
            borderRadius: '40px',
            color: '#3a1f99',
            fontWeight: 'bold',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Get Started Now
        </Link>
      </section>
    </>
  );
}
