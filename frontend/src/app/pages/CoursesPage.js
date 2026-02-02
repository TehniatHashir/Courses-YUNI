import { useState, useEffect } from 'react';

export function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
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
      padding: '4rem 2rem',
      position: 'relative',
      zIndex: 10, 
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem',
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem',
      color: '#667eea',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#fff', 
    },
    coursesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2.5rem',
      perspective: '1000px',
    },
    courseCard: {
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      transformStyle: 'preserve-3d',
    },
    courseImage: {
      width: '100%',
      height: '200px',
      transition: 'transform 0.5s',
    },
    courseContent: {
      padding: '1.5rem',
    },
    courseCategory: {
      display: 'inline-block',
      padding: '0.3rem 0.8rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '20px',
      fontSize: '0.85rem',
      marginBottom: '1rem',
    },
    courseTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.8rem',
      color: '#333',
    },
    courseDescription: {
      color: '#666',
      marginBottom: '1rem',
      lineHeight: '1.6',
    },
    courseFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: '1px solid #eee',
    },
    coursePrice: {
      fontSize: '1.5rem',
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
      padding: '2rem',
    },
    modalContent: {
      background: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '80vh',
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
    },
    character: {
      position: 'absolute',
      bottom: '1rem',
      right: '1rem',
      fontSize: '4rem',
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
    price: '$99',
    rating: 4.8,
    students: '2,500',
    image: '/cybersecurity.jpg',
    character: '👨‍💻',
    details: 'Covers ethical hacking, network security, cryptography, malware analysis, and real-world security practices.',
  },
  {
    id: 2,
    title: 'Digital Marketing',
    category: 'Marketing',
    description: 'Learn how to grow brands using digital channels and online strategies',
    price: '$79',
    rating: 4.9,
    students: '1,800',
    image: '/digitalmark.webp',
    character: '🎨',
    details: 'Includes SEO, social media marketing, Google Ads, email marketing, analytics, and campaign strategy.',
  },
  {
    id: 3,
    title: 'AI Automation',
    category: 'Artificial Intelligence',
    description: 'Automate workflows and business processes using AI tools and scripts',
    price: '$129',
    rating: 4.7,
    students: '3,200',
    image: '/Ai.jpg',
    character: '📊',
    details: 'Learn AI-powered automation, Python scripting, APIs, chatbots, and real-world automation use cases.',
  },
  {
    id: 4,
    title: 'Web Development',
    category: 'Development',
    description: 'Build modern, responsive websites from scratch',
    price: '$89',
    rating: 4.6,
    students: '1,500',
    image: '/webdev.jpg',
    character: '📱',
    details: 'Learn HTML, CSS, JavaScript, React, backend basics, and deploy real-world web applications.',
  },
  {
    id: 5,
    title: 'Project Management',
    category: 'Management',
    description: 'Learn how to plan, execute, and deliver projects successfully',
    price: '$119',
    rating: 4.8,
    students: '2,100',
    image: '/Projmang.jpg',
    character: '📱',
    details: 'Covers project planning, risk management, budgeting, leadership skills, and project management tools.',
  },
  {
    id: 6,
    title: 'Communication Skills',
    category: 'Personal Development',
    description: 'Improve verbal, non-verbal, and professional communication skills',
    price: '$149',
    rating: 4.9,
    students: '2,800',
    image: '/communication.jpg',
    character: '🤖',
    details: 'Learn public speaking, interpersonal communication, body language, and workplace communication techniques.',
  },
  {
    id: 7,
    title: 'Prompt Engineering',
    category: 'AI / ML',
    description: 'Learn how to write effective prompts for AI tools like ChatGPT',
    price: '$149',
    rating: 4.9,
    students: '2,800',
    image: '/prompteng.jpg',
    character: '🤖',
    details: 'Covers prompt design, optimization techniques, AI behavior control, and real-world AI use cases.',
  },
  {
    id: 8,
    title: 'Hospitality',
    category: 'Hospitality & Tourism',
    description: 'Learn the fundamentals of hospitality and customer service excellence',
    price: '$149',
    rating: 4.9,
    students: '2,800',
    image: 'hospitality.jpg',
    character: '🤖',
    details: 'Includes hotel management, guest relations, service quality, operations, and hospitality industry standards.',
  },
  {
    id: 9,
    title: 'English Proficiency',
    category: 'Language',
    description: 'Improve English speaking, writing, reading, and listening skills',
    price: '$149',
    rating: 4.9,
    students: '2,800',
    image: 'english.jpg',
    character: '🤖',
    details: 'Focuses on grammar, vocabulary, pronunciation, fluency, and professional English communication.',
  },
  {
    id: 10,
    title: 'Agile Project Management',
    category: 'Management',
    description: 'Manage projects efficiently using Agile methodologies',
    price: '$149',
    rating: 4.9,
    students: '2,800',
    image: 'agile.jpg',
    character: '🤖',
    details: 'Learn Scrum, Kanban, Agile planning, sprint management, and team collaboration techniques.',
  },
  {
    id: 11,
    title: 'Content Creation',
    category: 'Creative',
    description: 'Create engaging content for social media and digital platforms',
    price: '$149',
    rating: 4.9,
    students: '2,800',
    image: 'contentcreation.jpg',
    character: '🤖',
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

        .course-card:hover { transform: translateY(-15px) rotateX(5deg) !important; box-shadow: 0 25px 50px rgba(0,0,0,0.2) !important; }
        .course-card:hover .course-image { transform: scale(1.1) !important; }
        .course-card:hover .character { transform: scale(1.2) rotate(10deg) !important; }
        .close-button:hover { color: #667eea !important; }
        .enroll-button:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4) !important; }

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

      {/* ===== ANIMATED BACKGROUND ===== */}
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
                onMouseEnter={() => setHoveredCard(course.id)}
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

                  <div style={styles.courseFooter}>
                    <span style={styles.coursePrice}>{course.price}</span>
                    <div style={styles.courseRating}>
                      ⭐ {course.rating} ({course.students} students)
                    </div>
                  </div>
                </div>

                <div
                  className="character"
                  style={{
                    ...styles.character,
                    transform:
                      hoveredCard === course.id
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
            >
              ×
            </button>

            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {selectedCourseData.character}
            </div>

            <h2 style={{ ...styles.courseTitle, fontSize: '2rem' }}>
              {selectedCourseData.title}
            </h2>

            <span style={styles.courseCategory}>
              {selectedCourseData.category}
            </span>

            <p style={{ ...styles.courseDescription, margin: '1.5rem 0' }}>
              {selectedCourseData.details}
            </p>

            <div style={styles.courseFooter}>
              <span style={styles.coursePrice}>
                {selectedCourseData.price}
              </span>
              <div style={styles.courseRating}>
                ⭐ {selectedCourseData.rating} •{' '}
                {selectedCourseData.students} students
              </div>
            </div>

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
