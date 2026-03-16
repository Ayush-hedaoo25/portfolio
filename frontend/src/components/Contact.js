import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiSend, FiUser, FiMail, FiMessageSquare, FiFileText,
  FiGithub, FiLinkedin, FiTwitter, FiCheck, FiAlertCircle,
} from 'react-icons/fi';
import { sendContact } from '../utils/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await sendContact(form);
      if (res.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(res.message || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Failed to send. Please try again.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px 14px 44px',
    background: 'rgba(13, 17, 23, 0.8)',
    border: '1px solid rgba(0, 212, 255, 0.15)',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const socialLinks = [
    { icon: <FiGithub size={20} />, href: 'https://github.com/Ayush-hedaoo25', label: 'GitHub' },
    // TODO: Replace with your actual LinkedIn and Twitter profile URLs
    { icon: <FiLinkedin size={20} />, href: 'https://www.linkedin.com/in/ayush-hedaoo', label: 'LinkedIn' },
    { icon: <FiTwitter size={20} />, href: 'https://twitter.com/ayush_hedaoo', label: 'Twitter' },
  ];

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0d1117 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span
            className="mono"
            style={{ color: '#00d4ff', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            {'// contact.sh'}
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: '800',
              marginTop: '12px',
              letterSpacing: '-1px',
            }}
          >
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '16px auto 0', fontSize: '16px', lineHeight: '1.7' }}>
            Open to cloud/DevOps roles, freelance projects, and collaborations. Let's build something great together.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                padding: '32px',
                background: 'rgba(17, 24, 39, 0.8)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
                borderRadius: '16px',
                marginBottom: '24px',
              }}
            >
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  marginBottom: '24px',
                }}
              >
                <span className="mono" style={{ color: '#00d4ff' }}>$ </span>
                Available For
              </h3>

              {[
                { emoji: '💼', title: 'Full-time Roles', desc: 'Cloud Engineer, DevOps, SRE, DevSecOps' },
                { emoji: '🔧', title: 'Freelance Projects', desc: 'Infrastructure setup, CI/CD pipelines, cloud migration' },
                { emoji: '🤝', title: 'Collaborations', desc: 'Open source contributions, cloud architecture reviews' },
                { emoji: '📚', title: 'Mentorship/Learning', desc: 'Pair programming, code reviews, tech discussions' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '16px 0',
                    borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <div style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                      {item.title}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialLinks.map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, borderColor: '#00d4ff', color: '#00d4ff' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'rgba(17, 24, 39, 0.8)',
                    border: '1px solid rgba(0, 212, 255, 0.15)',
                    borderRadius: '10px',
                    color: '#94a3b8',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '32px',
                background: 'rgba(17, 24, 39, 0.8)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
                borderRadius: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  marginBottom: '28px',
                }}
              >
                <span className="mono" style={{ color: '#00ff88' }}>$ </span>
                Send Message
              </h3>

              {/* Name */}
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <FiUser
                  size={16}
                  color="#4a5568"
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00d4ff';
                    e.target.style.boxShadow = '0 0 10px rgba(0,212,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 212, 255, 0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <FiMail
                  size={16}
                  color="#4a5568"
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00d4ff';
                    e.target.style.boxShadow = '0 0 10px rgba(0,212,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 212, 255, 0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Subject */}
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <FiFileText
                  size={16}
                  color="#4a5568"
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00d4ff';
                    e.target.style.boxShadow = '0 0 10px rgba(0,212,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 212, 255, 0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <FiMessageSquare
                  size={16}
                  color="#4a5568"
                  style={{ position: 'absolute', left: '14px', top: '16px' }}
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  rows={5}
                  style={{
                    ...inputStyle,
                    paddingTop: '14px',
                    resize: 'vertical',
                    minHeight: '120px',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00d4ff';
                    e.target.style.boxShadow = '0 0 10px rgba(0,212,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 212, 255, 0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    background: 'rgba(0, 255, 136, 0.08)',
                    border: '1px solid rgba(0, 255, 136, 0.2)',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    color: '#00ff88',
                    fontSize: '14px',
                  }}
                >
                  <FiCheck />
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    background: 'rgba(255, 0, 128, 0.08)',
                    border: '1px solid rgba(255, 0, 128, 0.2)',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    color: '#ff0080',
                    fontSize: '14px',
                  }}
                >
                  <FiAlertCircle />
                  {errorMsg}
                </motion.div>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '14px',
                  background:
                    status === 'loading'
                      ? 'rgba(0, 212, 255, 0.3)'
                      : 'linear-gradient(135deg, #00d4ff, #00ff88)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#0a0a0f',
                  fontWeight: '700',
                  fontSize: '15px',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background 0.2s',
                }}
              >
                {status === 'loading' ? (
                  <>
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={16} />
                    ./send-message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
