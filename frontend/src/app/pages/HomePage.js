import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

function BounceCards({ items }) {
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Layered transforms for initial positioning
  const transformStyles = [
    'rotate(5deg) translateX(-150px)',
    'rotate(0deg) translateX(-70px)',
    'rotate(-5deg) translateX(0px)',
    'rotate(5deg) translateX(70px)',
    'rotate(-5deg) translateX(150px)',
  ];


  // Initial bounce animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bounce-card',
        { scale: 0 },
        { scale: 1, stagger: 0.15, ease: 'elastic.out(1, 0.6)', delay: 0.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    if (!expanded) {
      // Expand all cards in a line
      items.forEach((_, i) => {
        const target = q(`.bounce-card-${i}`);
        gsap.to(target, {
          x: i * 220 - ((items.length - 1) * 110), // spacing cards in a line
          y: 0,
          scale: 1.2,
          rotation: 0,
          zIndex: 10 - i, // maintain stacking order
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    } else {
      // Collapse back to original stack
      items.forEach((_, i) => {
        const target = q(`.bounce-card-${i}`);
        gsap.to(target, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: transformStyles[i].match(/rotate\((-?\d+)deg\)/)
            ? parseInt(transformStyles[i].match(/rotate\((-?\d+)deg\)/)[1])
            : 0,
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
        height: '300px',
        marginTop: '4rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={`bounce-card bounce-card-${i}`}
          onClick={handleClick} // click on any card expands/collapses all
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '25px',
            background: 'linear-gradient(135deg,#2c47bd,#af0f87)',
            boxShadow: '0 15px 35px rgba(0,0,0,.35)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transform: transformStyles[i],
            transition: 'transform 0.4s ease, z-index 0.4s ease',
            zIndex: 1,
          }}
        >
          <h2 style={{ fontSize: '3.2rem', color: '#fffb02fd' }}>{item.number}</h2>
          <p style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 600 }}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
export function HomePage() {

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


  const sectionStyles = {
    section: {
      padding: '6rem 2rem',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: '3.1rem',
      fontWeight: '850',
      color: '#edfd10ef',
      marginBottom: '2rem',
    },
    subtitle: {
      fontSize: '2.1rem',
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

  return (
    <>

      <style>{`
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

       
        .carousel-wrapper { height: 500px; display: flex; justify-content: center; align-items: center; perspective: 1400px; }
        .carousel { width: 320px; height: 400px; transform-style: preserve-3d; animation: spin 20s linear infinite; }
        .carousel-item { position: absolute; width: 280px; height: 360px; transform-style: preserve-3d; }
        .card-face {
          position: absolute;
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
        }
        .card-back { transform: rotateY(180deg); background: #2574ceef; }
        @keyframes spin { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }

       
        .courses-reels { display: flex; gap: 1rem; height: 420px; }
        .course-reel { flex: 1; position: relative; border-radius: 18px; overflow: hidden; transition: flex 0.5s; }
        .course-reel:hover { flex: 4; }
        .course-reel img { width: 100%; height: 100%; object-fit: cover; }
        .course-reel::after { content:""; position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.7),transparent); }
        .course-content { position:absolute; bottom:20px; left:20px; color:#2574ceef; opacity:0; transition:.4s; }
        .course-reel:hover .course-content { opacity:1; transform:translateY(-10px); }
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


      <section
        style={{
          ...sectionStyles.section,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <h1 style={{ fontSize: '4.8rem', color: '#ffffff' }}>Welcome to YUNI</h1>
          <p style={{ fontSize: '2.4rem', color: '#ffffffef', marginBottom: '2rem' }}>
            Unlock your potential with world-class courses
          </p>
          <Link
            to="/courses"
            style={{
              padding: '1rem 3rem',
              background: '#af0f87f6',
              borderRadius: '40px',
              color: '#ffffffef',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Explore Courses
          </Link>

          <p
            style={{
              fontSize: '2.8rem',
              color: '#ffffff',
              marginTop: '4.5rem',
              lineHeight: '1.5',
            }}
          >
            ستاروں سے آگے جہاں اور بھی ہیں <br />

          </p>
        </div>
      </section>



      <section style={{ ...sectionStyles.section, marginTop: '6rem' }}>
        <h2 style={sectionStyles.title}>Why Choose YUNI?</h2>
        <div className="carousel-wrapper">
          <div className="carousel">
            {features.map((f, i) => (
              <div
                key={i}
                className="carousel-item"
                style={{ transform: `rotateY(${(360 / features.length) * i}deg) translateZ(450px)` }}
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


      <section style={{ ...sectionStyles.section, marginTop: '6rem' }}>
        <h2 style={sectionStyles.title}>Our Impact</h2>
        <BounceCards items={stats} />
      </section>


      <section style={{ ...sectionStyles.section, marginTop: '6rem' }}>
        <h2 style={sectionStyles.title}>Popular Courses</h2>
        <div className="courses-reels">
          {featuredCourses.map((c, i) => (
            <div key={i} className="course-reel">
              <img src={c.image} alt={c.title} />
              <div className="course-content" style={{ color: '#9c18daff' }}>
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
          margin: '7rem auto 9rem',
        }}
      >
        <h2 style={{ fontSize: '3rem', marginBottom: '5rem' }}>Ready to Level Up?</h2>
        <Link
          to="/courses"
          style={{
            padding: '1rem 3rem',
            background: '#fff',
            borderRadius: '40px',
            color: '#3a1f99',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Get Started Now
        </Link>
      </section>
    </>
  );
}
