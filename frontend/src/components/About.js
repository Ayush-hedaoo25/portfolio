import React from 'react';
import { motion } from 'framer-motion';
import {
  FiCloud, FiShield, FiCode, FiServer, FiZap, FiAward,
} from 'react-icons/fi';

const stats = [
  { value: '7+', label: 'Cloud Services', icon: <FiCloud /> },
  { value: '50+', label: 'Projects Deployed', icon: <FiServer /> },
  { value: '3+', label: 'Certifications', icon: <FiAward /> },
  { value: '100%', label: 'Security First', icon: <FiShield /> },
];

const highlights = [
  {
    icon: <FiCloud size={22} />,
    title: 'Multi-Cloud Architect',
    desc: 'Designing resilient, scalable infrastructure across AWS and Azure with cost optimization and high availability.',
    color: '#00d4ff',
  },
  {
    icon: <FiShield size={22} />,
    title: 'DevSecOps Practitioner',
    desc: 'Integrating security at every stage of the SDLC — container scanning, SAST/DAST, secrets management, and compliance.',
    color: '#00ff88',
  },
  {
    icon: <FiZap size={22} />,
    title: 'Automation Fanatic',
    desc: 'Eliminating toil with Python (boto3), Bash, PowerShell, and REST APIs to automate infrastructure and workflows.',
    color: '#7c3aed',
  },
  {
    icon: <FiCode size={22} />,
    title: 'Container & K8s Expert',
    desc: 'Building, securing, and orchestrating containerized applications with Docker and Kubernetes at scale.',
    color: '#ff6b00',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ background: '#0d1117' }}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} style={{ marginBottom: '64px', textAlign: 'center' }}>
            <span
              className="mono"
              style={{ color: '#00d4ff', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase' }}
            >
              {'// about.me'}
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: '800',
                marginTop: '12px',
                letterSpacing: '-1px',
              }}
            >
              Who I <span className="gradient-text">Am</span>
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              alignItems: 'center',
              marginBottom: '64px',
            }}
          >
            {/* Bio */}
            <motion.div variants={itemVariants}>
              {/* Avatar / Visual */}
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  margin: '0 auto 32px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,255,136,0.2))',
                    border: '2px solid rgba(0,212,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '72px',
                    boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)',
                  }}
                >
                  👨‍💻
                </div>
                {/* Orbiting dot */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '1px dashed rgba(0, 212, 255, 0.3)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      left: '50%',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#00d4ff',
                      boxShadow: '0 0 10px #00d4ff',
                    }}
                  />
                </motion.div>
              </div>

              <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '16px', marginBottom: '16px' }}>
                I'm <strong style={{ color: '#e2e8f0' }}>Ayush Hedaoo</strong> — a passionate{' '}
                <span style={{ color: '#00d4ff' }}>Cloud & DevOps Engineer</span> focused on building
                secure, scalable, and automated cloud-native infrastructure.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '16px', marginBottom: '16px' }}>
                Currently mastering <span style={{ color: '#00ff88' }}>AWS</span>,{' '}
                <span style={{ color: '#00ff88' }}>Azure</span>, DevSecOps practices, and cloud automation.
                I believe in{' '}
                <em style={{ color: '#e2e8f0' }}>"automate everything, secure by default"</em>.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '16px' }}>
                My goal is to bridge the gap between development and operations while making security
                a first-class citizen in every pipeline I build.
              </p>

              {/* Tech stack pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
                {['AWS', 'Azure', 'Docker', 'K8s', 'Terraform', 'Python', 'Jenkins'].map((tech) => (
                  <span
                    key={tech}
                    className="mono"
                    style={{
                      padding: '4px 12px',
                      background: 'rgba(0, 212, 255, 0.08)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      borderRadius: '4px',
                      color: '#00d4ff',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Highlights grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -4 }}
                  style={{
                    padding: '24px 20px',
                    background: 'rgba(17, 24, 39, 0.8)',
                    border: `1px solid rgba(${item.color === '#00d4ff' ? '0,212,255' : item.color === '#00ff88' ? '0,255,136' : item.color === '#7c3aed' ? '124,58,237' : '255,107,0'}, 0.15)`,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  <div
                    style={{
                      color: item.color,
                      marginBottom: '12px',
                      padding: '10px',
                      background: `rgba(${item.color === '#00d4ff' ? '0,212,255' : item.color === '#00ff88' ? '0,255,136' : item.color === '#7c3aed' ? '124,58,237' : '255,107,0'}, 0.1)`,
                      borderRadius: '8px',
                      display: 'inline-flex',
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#e2e8f0', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
              padding: '32px',
              background: 'rgba(13, 17, 23, 0.5)',
              border: '1px solid rgba(0, 212, 255, 0.1)',
              borderRadius: '16px',
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                style={{ textAlign: 'center', padding: '16px' }}
              >
                <div style={{ color: '#00d4ff', fontSize: '20px', marginBottom: '8px' }}>
                  {stat.icon}
                </div>
                <div
                  className="gradient-text"
                  style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1px', lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '6px' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
