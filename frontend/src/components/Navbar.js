import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiTerminal } from 'react-icons/fi';
import { Link } from 'react-scroll';

const navLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 24px',
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(10, 10, 15, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 212, 255, 0.1)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FiTerminal color="#0a0a0f" size={18} />
          </div>
          <span
            className="mono"
            style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}
          >
            <span style={{ color: '#00d4ff' }}>ayush</span>
            <span style={{ color: '#00ff88' }}>@devops</span>
            <span style={{ color: '#94a3b8' }}>:~$</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              duration={600}
              offset={-70}
            >
              <motion.button
                whileHover={{ color: '#00d4ff', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'JetBrains Mono, monospace',
                  transition: 'color 0.2s',
                  borderRadius: '6px',
                }}
              >
                {link.label}
              </motion.button>
            </Link>
          ))}
          <Link to="contact" spy smooth duration={600} offset={-70}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                border: 'none',
                color: '#0a0a0f',
                cursor: 'pointer',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: '700',
                fontFamily: 'JetBrains Mono, monospace',
                borderRadius: '6px',
                marginLeft: '8px',
              }}
            >
              ./hire-me
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#00d4ff',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(13, 17, 23, 0.98)',
              borderTop: '1px solid rgba(0, 212, 255, 0.1)',
              padding: '16px 0',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                spy smooth
                duration={600}
                offset={-70}
                onClick={() => setMenuOpen(false)}
              >
                <div
                  style={{
                    padding: '12px 24px',
                    color: '#94a3b8',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
