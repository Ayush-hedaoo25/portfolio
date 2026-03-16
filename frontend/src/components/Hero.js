import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { FiArrowDown, FiGithub, FiLinkedin, FiTerminal } from 'react-icons/fi';

// Matrix Rain Canvas
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.4)';
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.3,
        pointerEvents: 'none',
      }}
    />
  );
};

// Floating tech icons
const FloatingIcon = ({ icon, style }) => (
  <motion.div
    animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      position: 'absolute',
      fontSize: '24px',
      opacity: 0.15,
      ...style,
    }}
  >
    {icon}
  </motion.div>
);

const Hero = () => {
  const [commandIndex, setCommandIndex] = useState(0);
  const commands = [
    { cmd: 'whoami', output: 'Ayush Hedaoo — Cloud & DevOps Engineer' },
    { cmd: 'cat skills.txt', output: 'AWS | Azure | Docker | Kubernetes | DevSecOps | Python | CI/CD' },
    { cmd: 'echo $STATUS', output: 'Open to opportunities → Building cloud-native solutions' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCommandIndex((prev) => (prev + 1) % commands.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [commands.length]);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1e 100%)',
      }}
      className="grid-bg"
    >
      <MatrixRain />

      {/* Floating icons */}
      {[
        { icon: '🐳', style: { top: '15%', left: '8%' } },
        { icon: '☁️', style: { top: '20%', right: '12%' } },
        { icon: '⚙️', style: { top: '60%', left: '5%' } },
        { icon: '🔐', style: { top: '70%', right: '8%' } },
        { icon: '🐍', style: { top: '40%', left: '85%' } },
        { icon: '🛡️', style: { top: '35%', left: '10%' } },
      ].map((item, i) => (
        <FloatingIcon key={i} {...item} />
      ))}

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px' }}>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(0, 255, 136, 0.08)',
              border: '1px solid rgba(0, 255, 136, 0.2)',
              borderRadius: '50px',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#00ff88',
                display: 'inline-block',
                boxShadow: '0 0 8px #00ff88',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
            <span
              className="mono"
              style={{ color: '#00ff88', fontSize: '13px', fontWeight: '600' }}
            >
              Available for opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(42px, 7vw, 80px)',
              fontWeight: '900',
              lineHeight: '1.1',
              marginBottom: '16px',
              letterSpacing: '-2px',
            }}
          >
            <span style={{ color: '#e2e8f0' }}>Hi, I'm </span>
            <span className="gradient-text">Ayush</span>
          </motion.h1>

          {/* Role animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ marginBottom: '32px' }}
          >
            <span
              style={{
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: '700',
                color: '#94a3b8',
              }}
            >
              <span className="mono" style={{ color: '#00d4ff' }}>$ </span>
              <TypeAnimation
                sequence={[
                  'Cloud & DevOps Engineer',
                  2000,
                  'DevSecOps Specialist',
                  2000,
                  'AWS & Azure Architect',
                  2000,
                  'Infrastructure Automation Expert',
                  2000,
                  'Kubernetes & Docker Enthusiast',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: '#00d4ff' }}
              />
            </span>
          </motion.div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              background: 'rgba(13, 17, 23, 0.9)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '40px',
              maxWidth: '600px',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(0,212,255,0.1)',
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
              <FiTerminal size={14} color="#94a3b8" style={{ marginLeft: '8px' }} />
              <span className="mono" style={{ color: '#94a3b8', fontSize: '12px' }}>
                ayush@portfolio:~
              </span>
            </div>
            {/* Terminal content */}
            <div style={{ padding: '16px 20px', minHeight: '80px' }}>
              <motion.div
                key={commandIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mono" style={{ fontSize: '13px', marginBottom: '8px' }}>
                  <span style={{ color: '#00ff88' }}>ayush@devops</span>
                  <span style={{ color: '#94a3b8' }}>:</span>
                  <span style={{ color: '#00d4ff' }}>~</span>
                  <span style={{ color: '#94a3b8' }}>$ </span>
                  <span style={{ color: '#e2e8f0' }}>{commands[commandIndex].cmd}</span>
                </div>
                <div
                  className="mono"
                  style={{ color: '#00d4ff', fontSize: '13px', paddingLeft: '4px' }}
                >
                  {commands[commandIndex].output}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Link to="projects" spy smooth duration={600} offset={-70}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#0a0a0f',
                  fontWeight: '700',
                  fontSize: '15px',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                }}
              >
                ./view-projects
              </motion.button>
            </Link>

            <Link to="contact" spy smooth duration={600} offset={-70}>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#00d4ff', color: '#00d4ff' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '14px 32px',
                  background: 'transparent',
                  border: '1px solid rgba(0, 212, 255, 0.4)',
                  borderRadius: '8px',
                  color: '#94a3b8',
                  fontWeight: '600',
                  fontSize: '15px',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ./contact-me
              </motion.button>
            </Link>

            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: <FiGithub />, href: 'https://github.com/Ayush-hedaoo25', label: 'GitHub' },
                // TODO: Replace '#' with your actual LinkedIn profile URL
                { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/ayush-hedaoo', label: 'LinkedIn' },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, color: '#00d4ff' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#94a3b8',
                    fontSize: '20px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 1.5, delay: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#00d4ff',
          cursor: 'pointer',
        }}
      >
        <Link to="about" spy smooth duration={600} offset={-70}>
          <FiArrowDown size={24} />
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
