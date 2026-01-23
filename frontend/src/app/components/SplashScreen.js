import { useEffect, useState } from 'react';

export function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // progress animation (3 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 3.33));
    }, 100);

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onFinish]);

  // Parallax mouse movement
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes moveBg {
          from { transform: scale(1); }
          to { transform: scale(1.2); }
        }

        .space-bg { position: fixed; inset: 0; z-index: -1; overflow: hidden; }
        .bg-layer { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .planet { position: absolute; transition: transform 0.25s ease; }
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

      {/* ===== Animated Space Background ===== */}
      <div className="space-bg">
        <img src="/images/background.png" className="bg-layer" alt="" />
        <img src="/images/mid.png" className="bg-layer" style={parallaxMid()} alt="" />
        <img src="/images/earth.png" className="planet" style={{ top: '6%', left: '4%', width: '260px', ...parallaxDir(1, -1, 1.1) }} alt="" />
        <img src="/images/mars.png" className="planet" style={{ top: '18%', right: '8%', width: '150px', ...parallaxDir(-1, 1, 0.9) }} alt="" />
        <img src="/images/jupiter.png" className="planet" style={{ bottom: '22%', left: '10%', width: '240px', ...parallaxDir(1, 1, 1.2) }} alt="" />
        <img src="/images/venus.png" className="planet" style={{ top: '52%', right: '18%', width: '170px', ...parallaxDir(-0.8, -1, 1) }} alt="" />
        <img src="/images/saturn.png" className="planet orbit" style={{ bottom: '10%', right: '5%', width: '260px', ...parallaxDir(0.6, -0.6, 0.8) }} alt="" />
        <img src="/images/rock.png" className="planet" style={{ top: '32%', left: '42%', width: '120px', ...parallaxDir(-1.2, 0.8, 1.3) }} alt="" />
        <img src="/images/uranus.png" className="planet continuous-orbit" style={{ top: '40%', left: '60%', width: '180px', ...parallaxDir(0.8, -0.5, 1) }} alt="" />
      </div>

      {/* ===== Splash Screen Content ===== */}
      <div style={styles.container}>
        <div style={styles.logoBox}>
          <img
            src="/YUNILOGO.png"
            alt="YUNI Logo"
            style={styles.logoImg}
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>

        <div style={styles.title}>YUNI</div>
        <div style={styles.subtitle}>Your experience is loading</div>

        <div style={styles.progressWrapper}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    zIndex: 9999,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.12), transparent 40%)',
    animation: 'moveBg 6s ease-in-out infinite alternate',
  },
  logoBox: {
    width: 90,
    height: 90,
    borderRadius: 20,
    background: 'rgba(255,255,255,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backdropFilter: 'blur(10px)',
    animation: 'fadeDown 1s ease',
    zIndex: 2,
  },
  logoImg: {
    width: '70%',
    height: '70%',
    objectFit: 'contain',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 700,
    letterSpacing: '4px',
    animation: 'fadeUp 1s ease',
    zIndex: 2,
  },
  subtitle: {
    fontSize: '1rem',
    opacity: 0.85,
    marginTop: 6,
    marginBottom: 30,
    animation: 'fadeUp 1.2s ease',
    zIndex: 2,
  },
  progressWrapper: {
    width: 220,
    height: 6,
    background: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 2,
  },
  progressBar: {
    height: '100%',
    background: '#ffffff',
    borderRadius: 20,
    transition: 'width 0.1s linear',
  },
};
