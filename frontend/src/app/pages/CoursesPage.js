import { useState, useEffect } from 'react';

export function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
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
      padding: isMobile ? '2rem 1rem' : '4rem 2rem',
      position: 'relative',
      zIndex: 10,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: isMobile ? '2rem' : '4rem',
    },
    title: {
      fontSize: isMobile ? 'clamp(2rem, 6vw, 3rem)' : '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#ffffff',
      animation: 'fadeInUp 0.8s ease-out',
    },
    subtitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      color: '#fff',
      animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
    },
    coursesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: isMobile ? '1.5rem' : '2.5rem',
      perspective: isMobile ? 'none' : '1000px',
    },
    courseCard: {
      background: 'rgba(255,255,255,0.95)',
      borderRadius: isMobile ? '15px' : '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      transformStyle: isMobile ? 'flat' : 'preserve-3d',
    },
    courseImage: {
      width: '100%',
      height: isMobile ? '180px' : '200px',
      transition: 'transform 0.5s',
    },
    courseContent: {
      padding: isMobile ? '1rem' : '1.5rem',
    },
    courseCategory: {
      display: 'inline-block',
      padding: '0.3rem 0.8rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '20px',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      marginBottom: '1rem',
    },
    courseTitle: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.8rem',
      color: '#333',
    },
    courseDescription: {
      color: '#666',
      marginBottom: '1rem',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    courseFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: '1px solid #eee',
    },
    coursePrice: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: 'bold',
      color: '#667eea',
    },
    courseRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      color: '#666',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s',
      padding: isMobile ? '0' : '2rem',
    },
    modalContent: {
      background: 'white',
      borderRadius: isMobile ? '0' : '20px',
      padding: isMobile ? '2rem 1.5rem' : '2.5rem',
      maxWidth: isMobile ? '100%' : '600px',
      width: '100%',
      maxHeight: isMobile ? '100vh' : '80vh',
      height: isMobile ? '100vh' : 'auto',
      overflowY: 'auto',
      animation: 'slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      color: '#666',
      minWidth: '44px',
      minHeight: '44px',
    },
    enrollButton: {
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1.5rem',
      transition: 'transform 0.3s, box-shadow 0.3s',
      minHeight: '44px',
    },
    character: {
      position: 'absolute',
      bottom: '1rem',
      right: '1rem',
      fontSize: isMobile ? '3rem' : '4rem',
      transition: 'transform 0.5s',
      pointerEvents: 'none',
    },
  };

  const courses = [
    {
      id: 1,
      title: 'Cyber Security',
      category: 'IT & Security',
      description: 'Learn how to protect systems, networks, and data from cyber threats',
      students: '2,500',
      image: '/cybersecurity.jpg',
      details: 'Covers ethical hacking, network security, cryptography, malware analysis, and real-world security practices.',
    },
    {
      id: 2,
      title: 'Digital Marketing',
      category: 'Marketing',
      description: 'Learn how to grow brands using digital channels and online strategies',
      students: '1,800',
      image: '/digitalmark.webp',
      details: 'Includes SEO, social media marketing, Google Ads, email marketing, analytics, and campaign strategy.',
    },
    {
      id: 3,
      title: 'AI Automation',
      category: 'Artificial Intelligence',
      description: 'Automate workflows and business processes using AI tools and scripts',
      students: '3,200',
      image: '/Ai.jpg',
      details: 'Learn AI-powered automation, Python scripting, APIs, chatbots, and real-world automation use cases.',
    },
    {
      id: 4,
      title: 'Web Development',
      category: 'Development',
      description: 'Build modern, responsive websites from scratch',
      students: '1,500',
      image: '/webdev.jpg',
      details: 'Learn HTML, CSS, JavaScript, React, backend basics, and deploy real-world web applications.',
    },
    {
      id: 5,
      title: 'Project Management',
      category: 'Management',
      description: 'Learn how to plan, execute, and deliver projects successfully',
      students: '2,100',
      image: '/Projmang.jpg',
      details: 'Covers project planning, risk management, budgeting, leadership skills, and project management tools.',
    },
    {
      id: 6,
      title: 'Communication Skills',
      category: 'Personal Development',
      description: 'Improve verbal, non-verbal, and professional communication skills',
      students: '2,800',
      image: '/communication.jpg',
      details: 'Learn public speaking, interpersonal communication, body language, and workplace communication techniques.',
    },
    {
      id: 7,
      title: 'Prompt Engineering',
      category: 'AI / ML',
      description: 'Learn how to write effective prompts for AI tools like ChatGPT',
      students: '2,800',
      image: '/prompteng.jpg',
      details: 'Covers prompt design, optimization techniques, AI behavior control, and real-world AI use cases.',
    },
    {
      id: 8,
      title: 'Hospitality',
      category: 'Hospitality & Tourism',
      description: 'Learn the fundamentals of hospitality and customer service excellence',
      students: '2,800',
      image: 'hospitality.jpg',
      details: 'Includes hotel management, guest relations, service quality, operations, and hospitality industry standards.',
    },
    {
      id: 9,
      title: 'English Proficiency',
      category: 'Language',
      description: 'Improve English speaking, writing, reading, and listening skills',
      students: '2,800',
      image: 'english.jpg',
      details: 'Focuses on grammar, vocabulary, pronunciation, fluency, and professional English communication.',
    },
    {
      id: 10,
      title: 'Agile Project Management',
      category: 'Management',
      description: 'Manage projects efficiently using Agile methodologies',
      students: '2,800',
      image: 'agile.jpg',
      details: 'Learn Scrum, Kanban, Agile planning, sprint management, and team collaboration techniques.',
    },
    {
      id: 11,
      title: 'Content Creation',
      category: 'Creative',
      description: 'Create engaging content for social media and digital platforms',
      students: '2,800',
      image: 'contentcreation.jpg',
      details: 'Covers content strategy, video creation, copywriting, branding, and monetization techniques.',
    },
  ];

  const selectedCourseData =
    selectedCourse !== null
      ? courses.find((c) => c.id === selectedCourse)
      : null;

  return (
    <>
      {/* ===== GLOBAL STYLES ===== */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Desktop-only hover effects */
        @media (min-width: 768px) {
          .course-card:hover { 
            transform: translateY(-15px) rotateX(5deg) !important; 
            box-shadow: 0 25px 50px rgba(0,0,0,0.2) !important; 
          }
          .course-card:hover .course-image { transform: scale(1.1) !important; }
          .course-card:hover .character { transform: scale(1.2) rotate(10deg) !important; }
        }
        
        .close-button:hover { color: #667eea !important; }
        .enroll-button:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4) !important; }

        body { margin: 0; overflow-x: hidden; }
        .space-bg { position: fixed; inset: 0; z-index: -20; overflow: hidden; }
        .bg-layer { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .planet { position: absolute; z-index: 2; transition: transform 0.25s ease; }
        
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

        /* Accessibility: Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .orbit,
          .continuous-orbit,
          .planet {
            animation: none !important;
          }
          
          .course-card:hover,
          .planet:hover {
            transform: none !important;
          }
        }
      `}</style>

      {/* ===== ANIMATED BACKGROUND ===== */}
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

      {/* ===== COURSES CONTENT ===== */}
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.title}>Explore Our Courses</h1>
            <p style={styles.subtitle}>Choose from our wide range of expertly crafted courses</p>
          </div>

          <div style={styles.coursesGrid}>
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                style={styles.courseCard}
                onClick={() => setSelectedCourse(course.id)}
                onMouseEnter={() => !isMobile && setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="course-image"
                  style={{
                    ...styles.courseImage,
                    backgroundImage: `url(${course.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>

                <div style={styles.courseContent}>
                  <span style={styles.courseCategory}>{course.category}</span>
                  <h3 style={styles.courseTitle}>{course.title}</h3>
                  <p style={styles.courseDescription}>{course.description}</p>
                </div>

                <div
                  className="character"
                  style={{
                    ...styles.character,
                    transform:
                      hoveredCard === course.id && !isMobile
                        ? 'scale(1.2) rotate(10deg)'
                        : 'scale(1)',
                  }}
                >
                  {course.character}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {selectedCourse && selectedCourseData && (
        <div style={styles.modal} onClick={() => setSelectedCourse(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              style={styles.closeButton}
              onClick={() => setSelectedCourse(null)}
              aria-label="Close modal"
            >
              ×
            </button>

            <div style={{ fontSize: isMobile ? '2.5rem' : '3rem', marginBottom: '1rem' }}>
              {selectedCourseData.character}
            </div>

            <h2 style={{ ...styles.courseTitle, fontSize: isMobile ? '1.5rem' : '2rem' }}>
              {selectedCourseData.title}
            </h2>

            <span style={styles.courseCategory}>
              {selectedCourseData.category}
            </span>

            <p style={{ ...styles.courseDescription, margin: '1.5rem 0' }}>
              {selectedCourseData.details}
            </p>

            <button
              className="enroll-button"
              style={styles.enrollButton}
              onClick={() => { window.location.href = '/register'; }}
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
