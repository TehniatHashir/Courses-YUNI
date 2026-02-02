import { useState, useEffect } from 'react';

export function BlogsPage() {
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
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#fff', 
    },
    blogsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2.5rem',
    },
    blogCard: {
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer',
      transform: 'translateZ(0)',
    },
    blogImage: {
      width: '100%',
      height: '220px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '4rem',
      transition: 'transform 0.4s',
    },
    blogContent: {
      padding: '1.8rem',
    },
    blogMeta: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem',
      fontSize: '0.9rem',
      color: '#999',
    },
    blogTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#333',
      lineHeight: '1.4',
    },
    blogExcerpt: {
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
    },
    blogFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: '1px solid #eee',
    },
    readMore: {
      color: '#667eea',
      fontWeight: 'bold',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'gap 0.3s',
    },
    author: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
    },
    authorAvatar: {
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
    },
    authorName: {
      fontSize: '0.9rem',
      color: '#555',
      fontWeight: 500,
    },
  };

  const blogs = [
    {
      id: 1,
      title: '10 Tips for Effective  Learning',
      excerpt: 'Discover proven strategies to maximize your learning potential in  courses and stay motivated throughout your journey.',
      author: 'Tehniat Hashir',
      avatar: '👨‍💼',
      date: 'Jan 10, 2026',
      readTime: '5 min read',
      icon: '📚',
      link: 'https://tehniathashir.wixsite.com/learning'
    },
    {
      id: 2,
      title: 'The Future of Web Development in 2026',
      excerpt: 'Explore the latest trends and technologies shaping the future of web development, from AI integration to progressive web apps.',
      author: 'Tehniat Hashir',
      avatar: '👩‍💻',
      date: 'Jan 28, 2026',
      readTime: '8 min read',
      icon: '🚀',
      link: 'https://tehniathashir.wixsite.com/future-of-web-dev'
    },
    {
      id: 3,
      title: 'How to Build Your First Mobile App',
      excerpt: 'A beginner-friendly guide to creating your first mobile application using React Native and modern development practices.',
      author: 'Tehniat Hashir',
      avatar: '👨‍💻',
      date: 'Jan 5, 2026',
      readTime: '10 min read',
      icon: '📱',
      link: 'https://yourblog.com/mobile-app'
    },
    {
      id: 4,
      title: 'Design Thinking: A Practical Guide',
      excerpt: 'Learn how to apply design thinking principles to solve complex problems and create user-centered solutions.',
      author: 'Tehniat Hashir',
      avatar: '👩‍🎨',
      date: 'Jan 3, 2026',
      readTime: '7 min read',
      icon: '🎨',
      link: 'https://yourblog.com/online-learning'
    },
    {
      id: 5,
      title: 'Mastering Data Visualization',
      excerpt: 'Transform raw data into compelling visual stories using modern tools and best practices in data visualization.',
      author: 'Tehniat Hashir',
      avatar: '👨‍🔬',
      date: 'Dec 30, 2025',
      readTime: '6 min read',
      icon: '📊',
      link: 'https://yourblog.com/data-visualization'
    },
    {
      id: 6,
      title: 'AI and Machine Learning Demystified',
      excerpt: 'Break down complex AI concepts into easy-to-understand explanations and practical applications for beginners.',
      author: 'Tehniat Hashir',
      avatar: '👩‍🔬',
      date: 'Feb 2, 2026',
      readTime: '12 min read',
      icon: '🤖',
      link: 'https://tehniathashir.wixsite.com/aimachinelearning'
    },
  ];

  return (
    <>
     
      <style>{`
        .blog-card:hover {
          transform: translateY(-10px) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        .blog-card:hover .blog-image {
          transform: scale(1.1) !important;
        }
        .blog-card:hover .read-more {
          gap: 1rem !important;
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
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.title}>Our Blog</h1>
            <p style={styles.subtitle}>Insights, tutorials, and stories from our community</p>
          </div>

          <div style={styles.blogsGrid}>
            {blogs.map((blog) => (
              <article key={blog.id} className="blog-card" style={styles.blogCard}>
                <div className="blog-image" style={styles.blogImage}>
                  {blog.icon}
                </div>
                <div style={styles.blogContent}>
                  <div style={styles.blogMeta}>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h2 style={styles.blogTitle}>{blog.title}</h2>
                  <p style={styles.blogExcerpt}>{blog.excerpt}</p>
                  <div style={styles.blogFooter}>
                    <div style={styles.author}>
                      <div style={styles.authorAvatar}>{blog.avatar}</div>
                      <span style={styles.authorName}>{blog.author}</span>
                    </div>
                    <a href={blog.link} className="read-more" style={styles.readMore} target="_blank" rel="noopener noreferrer">
                   Read more →
                      </a>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
