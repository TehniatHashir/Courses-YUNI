import { useEffect, useState } from "react";

export function AboutPage() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * 600;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * 600;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxDir = (dx, dy, depth) => ({
    transform: `translate(${offset.x * dx * depth}px, ${offset.y * dy * depth}px)`,
    transition: "transform 0.15s ease-out",
  });

  const parallaxMid = () => {
    const maxMove = 35;
    const x = Math.max(Math.min(offset.x * 0.07, maxMove), -maxMove);
    const y = Math.max(Math.min(offset.y * 0.07, maxMove), -maxMove) + 100;
    return {
      transform: `translate(${x}px, ${y}px)`,
      transition: "transform 0.2s ease-out",
    };
  };

  const styles = {
    page: { minHeight: "100vh", background: "transparent", position: "relative", zIndex: 10 },
    hero: {
      padding: "5rem 2rem",
      background: "rgba(255, 255, 255, 0)",
      color: "white",
      textAlign: "center",
      borderRadius: "15px",
    },
    heroTitle: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      animation: "fadeInUp 0.8s ease-out",
    },
    heroSubtitle: {
      fontSize: "1.3rem",
      opacity: 0.95,
      maxWidth: "700px",
      margin: "0 auto",
      animation: "fadeInUp 0.8s ease-out 0.2s backwards",
    },
    section: { padding: "5rem 2rem" },
    container: { maxWidth: "1200px", margin: "0 auto" },
    sectionTitle: { fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem", color: "#ffffff", textAlign: "center" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginTop: "3rem" },
    card: {
      padding: "2rem",
      background: "#9bc9f7",
      borderRadius: "15px",
      textAlign: "center",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
    },
    cardIcon: { fontSize: "3.5rem", marginBottom: "1rem", display: "block" },
    cardTitle: { fontSize: "1.3rem", fontWeight: "bold", marginBottom: "0.8rem", color: "#333" },
    cardText: { color: "#666", lineHeight: "1.6" },
    story: { background: "#2f5983a8", padding: "5rem 2rem" },
    storyContent: { maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", fontSize: "1.1rem", color: "#ffffff" },
    team: { padding: "5rem 2rem" },
    teamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2.5rem", marginTop: "3rem" },
    teamMember: { textAlign: "center", transition: "transform 0.3s" },
    memberPhoto: {
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      margin: "0 auto 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "4rem",
      transition: "transform 0.5s",
      overflow: "hidden",

    },
    memberName: { fontSize: "1.3rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#ffffff" },
    memberRole: { color: "#ffffff", marginBottom: "1rem", fontWeight: 500 },
    memberBio: { color: "#ffffff", fontSize: "0.95rem", lineHeight: "1.5" },
  };

  const values = [
    { icon: "🎯", title: "Excellence", text: "We strive for excellence in everything we do, from course content to student support" },
    { icon: "🤝", title: "Community", text: "Building a supportive learning community where everyone can thrive together" },
    { icon: "💡", title: "Innovation", text: "Constantly innovating our teaching methods to provide the best learning experience" },
    { icon: "🌟", title: "Accessibility", text: "Making quality education accessible to everyone, everywhere" },
  ];

 const team = [
  { name: "Abdul Moiz", role: "Founder", bio: "7+ Years Experience in Digital Marketing", image: "/images/team/moiz.jpg.jpeg" },
  { name: "Hafsa Mubbashar", role: "COO", bio: "Student of CS", image: "/images/team/hafsa.jpeg" },
  { name: "Mehrose Fatima", role: "CEO", bio: "Masters in CS", image: "/images/team/mehrose.jpeg" },
];


  useEffect(() => {
    const members = document.querySelectorAll(".team-member");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            members.forEach((member, index) => {
              setTimeout(() => {
                member.classList.add("animate");
              }, index * 1000);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (members.length) observer.observe(members[0]);
  }, []);

  return (
    <>
      <style>{`
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(60px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .team-member { opacity: 0; transform: translateY(60px); }
      .team-member.animate { animation: slideUp 0.8s ease-out forwards; }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .value-card:hover { transform: translateY(-10px) !important; box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important; }
      .team-member:hover { transform: scale(1.05) !important; }
      .team-member:hover .member-photo { transform: rotate(360deg) !important; }

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

      <div style={styles.page}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>About YUNI</h1>
          <p style={styles.heroSubtitle}>
            Empowering learners worldwide with quality education and innovative teaching methods
          </p>
        </div>

        <section style={styles.story}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Our Story</h2>
            <div style={styles.storyContent}>
              <p style={{ marginBottom: '1.5rem' }}>
                YUNI was founded in 2025 with a simple mission: to make high-quality education accessible to everyone,
                regardless of their location or background.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                We believe that education is the key to unlocking human potential.
              </p>
              <p>
                Today, YUNI offers courses across multiple disciplines, with new content added every month.
              </p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Our Values</h2>
            <div style={styles.grid}>
              {values.map((value, index) => (
                <div key={index} className="value-card" style={styles.card}>
                  <span style={styles.cardIcon}>{value.icon}</span>
                  <h3 style={styles.cardTitle}>{value.title}</h3>
                  <p style={styles.cardText}>{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.team}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Meet Our Team</h2>
            <div style={styles.teamGrid}>
              {team.map((member, index) => (
                <div key={index} className="team-member" style={styles.teamMember}>
                  <div className="member-photo" style={styles.memberPhoto}>
  <img
    src={member.image}
    alt={member.name}
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
</div>

                  <h3 style={styles.memberName}>{member.name}</h3>
                  <p style={styles.memberRole}>{member.role}</p>
                  <p style={styles.memberBio}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
