import React from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';
import { Link } from 'react-scroll';

const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', to: 'hero' },
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Projects', to: 'projects' },
    { label: 'Contact', to: 'contact' },
  ];

  return (
    <footer
      style={{
        background: '#0a0a0f',
        borderTop: '1px solid rgba(0, 212, 255, 0.08)',
        padding: '48px 0 32px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FiTerminal color="#0a0a0f" size={16} />
              </div>
              <span className="mono" style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '15px' }}>
                <span style={{ color: '#00d4ff' }}>ayush</span>
                <span style={{ color: '#00ff88' }}>@devops</span>
              </span>
            </div>
            <p style={{ color: '#4a5568', fontSize: '13px', lineHeight: '1.7', maxWidth: '220px' }}>
              Cloud & DevOps Engineer building secure, scalable infrastructure with a security-first mindset.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="mono"
              style={{ color: '#00d4ff', fontSize: '12px', letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}
            >
              {'// Navigate'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  spy smooth
                  duration={600}
                  offset={-70}
                  style={{
                    color: '#4a5568',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    textDecoration: 'none',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#00d4ff')}
                  onMouseLeave={(e) => (e.target.style.color = '#4a5568')}
                >
                  {`> ${link.label}`}
                </Link>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h4
              className="mono"
              style={{ color: '#00ff88', fontSize: '12px', letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}
            >
              {'// Stack'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['AWS & Azure', 'Docker & Kubernetes', 'Python & Bash', 'CI/CD Pipelines', 'DevSecOps'].map(
                (item) => (
                  <span
                    key={item}
                    className="mono"
                    style={{ color: '#4a5568', fontSize: '13px' }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Social / Contact */}
          <div>
            <h4
              className="mono"
              style={{ color: '#7c3aed', fontSize: '12px', letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}
            >
              {'// Connect'}
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <FiGithub size={18} />, href: 'https://github.com/Ayush-hedaoo25' },
                // TODO: Replace with your actual LinkedIn profile URL
                { icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/in/ayush-hedaoo' },
              ].map(({ icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, color: '#00d4ff' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(0, 212, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#4a5568',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
            <div style={{ marginTop: '16px' }}>
              <span className="mono" style={{ color: '#4a5568', fontSize: '12px' }}>
                Status:{' '}
                <span style={{ color: '#00ff88' }}>● Available</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span className="mono" style={{ color: '#4a5568', fontSize: '12px' }}>
            © {year} Ayush Hedaoo — All rights reserved
          </span>
          <span
            style={{
              color: '#4a5568',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Built with{' '}
            <FiHeart size={12} style={{ color: '#ff0080' }} />{' '}
            using{' '}
            <span className="mono" style={{ color: '#00d4ff' }}>React</span>
            {' '}&{' '}
            <span className="mono" style={{ color: '#00ff88' }}>Node.js</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
