import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSkills } from '../utils/api';

const CATEGORIES = [
  { key: 'cloud', label: '☁️ Cloud', color: '#00d4ff' },
  { key: 'devops', label: '⚙️ DevOps', color: '#00ff88' },
  { key: 'devsecops', label: '🔐 DevSecOps', color: '#7c3aed' },
  { key: 'infrastructure', label: '🖥️ Infra', color: '#ff6b00' },
  { key: 'security', label: '🔑 Security', color: '#ff0080' },
  { key: 'monitoring', label: '📊 Monitoring', color: '#febc2e' },
  { key: 'automation', label: '💻 Automation', color: '#00d4ff' },
];

const hexToRgb = (hex) => {
  const map = {
    '#00d4ff': '0,212,255',
    '#00ff88': '0,255,136',
    '#7c3aed': '124,58,237',
    '#ff6b00': '255,107,0',
    '#ff0080': '255,0,128',
    '#febc2e': '254,188,46',
  };
  return map[hex] || '0,212,255';
};

const SkillBar = ({ skill, color, index }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{ marginBottom: '16px' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>{skill.icon}</span>
          <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>
            {skill.name}
          </span>
        </div>
        <span
          className="mono"
          style={{ color, fontSize: '12px', fontWeight: '700' }}
        >
          {skill.level}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: '6px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animated ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + index * 0.08 }}
          style={{
            height: '100%',
            borderRadius: '999px',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 10px rgba(${hexToRgb(color)}, 0.4)`,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 6px ${color}`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const fallbackSkills = {
  cloud: [
    { name: 'Microsoft Azure', level: 80, icon: '☁️' },
    { name: 'Amazon Web Services', level: 85, icon: '🟠' },
  ],
  devops: [
    { name: 'Docker', level: 90, icon: '🐳' },
    { name: 'Kubernetes', level: 80, icon: '⚙️' },
    { name: 'CI/CD Pipelines', level: 85, icon: '🔄' },
    { name: 'Git & GitHub', level: 95, icon: '🐙' },
  ],
  devsecops: [
    { name: 'Secure SDLC', level: 80, icon: '🔐' },
    { name: 'Container Security (Trivy)', level: 85, icon: '🛡️' },
    { name: 'Static & Dynamic Analysis', level: 75, icon: '🔍' },
    { name: 'Secrets Management', level: 80, icon: '🔑' },
  ],
  infrastructure: [
    { name: 'Virtual Machines', level: 90, icon: '🖥️' },
    { name: 'Serverless', level: 80, icon: '⚡' },
    { name: 'Object Storage (S3/Blob)', level: 85, icon: '🗄️' },
    { name: 'Virtual Networks/VPC', level: 80, icon: '🌐' },
  ],
  security: [
    { name: 'IAM', level: 85, icon: '👤' },
    { name: 'RBAC', level: 80, icon: '🔒' },
    { name: 'MFA', level: 90, icon: '📱' },
    { name: 'Encryption & Key Management', level: 80, icon: '🔐' },
  ],
  monitoring: [
    { name: 'CloudWatch', level: 85, icon: '📊' },
    { name: 'Azure Monitor', level: 80, icon: '📈' },
    { name: 'Logging & Metrics', level: 85, icon: '📋' },
    { name: 'Alerting Systems', level: 80, icon: '🚨' },
  ],
  automation: [
    { name: 'Python (boto3)', level: 85, icon: '🐍' },
    { name: 'Bash/Shell Scripting', level: 90, icon: '💻' },
    { name: 'PowerShell', level: 75, icon: '🖥️' },
    { name: 'REST APIs & JSON', level: 90, icon: '🔗' },
  ],
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('cloud');
  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    fetchSkills()
      .then((data) => {
        if (data) setSkills(data);
      })
      .catch(() => {/* use fallback */});
  }, []);

  const currentColor = CATEGORIES.find((c) => c.key === activeCategory)?.color || '#00d4ff';
  const currentSkills = skills[activeCategory] || [];

  return (
    <section
      id="skills"
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0d1117 100%)',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span
            className="mono"
            style={{ color: '#00ff88', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            {'// skills.json'}
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: '800',
              marginTop: '12px',
              letterSpacing: '-1px',
            }}
          >
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '16px auto 0', fontSize: '16px', lineHeight: '1.7' }}>
            A curated stack of cloud, DevOps, and security tools I wield to build production-grade systems.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: `1px solid ${activeCategory === cat.key ? cat.color : 'rgba(255,255,255,0.08)'}`,
                background:
                  activeCategory === cat.key
                    ? `rgba(${hexToRgb(cat.color)}, 0.15)`
                    : 'rgba(17, 24, 39, 0.5)',
                color: activeCategory === cat.key ? cat.color : '#94a3b8',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow:
                  activeCategory === cat.key
                    ? `0 0 15px rgba(${hexToRgb(cat.color)}, 0.2)`
                    : 'none',
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills panel */}
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'rgba(13, 17, 23, 0.8)',
            border: `1px solid rgba(${hexToRgb(currentColor)}, 0.2)`,
            borderRadius: '16px',
            padding: '40px',
            backdropFilter: 'blur(10px)',
            boxShadow: `0 0 40px rgba(${hexToRgb(currentColor)}, 0.05)`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '32px',
                  paddingBottom: '16px',
                  borderBottom: `1px solid rgba(${hexToRgb(currentColor)}, 0.15)`,
                }}
              >
                <span className="mono" style={{ color: currentColor, fontSize: '16px' }}>{'>'}</span>
                <span
                  style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '18px' }}
                >
                  {CATEGORIES.find((c) => c.key === activeCategory)?.label}
                </span>
                <span
                  className="mono"
                  style={{
                    marginLeft: 'auto',
                    color: '#4a5568',
                    fontSize: '12px',
                  }}
                >
                  {currentSkills.length} skills
                </span>
              </div>

              {currentSkills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} color={currentColor} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* All skills badge cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '64px', textAlign: 'center' }}
        >
          <p className="mono" style={{ color: '#4a5568', fontSize: '12px', marginBottom: '24px', letterSpacing: '2px' }}>
            {'// ALL TECHNOLOGIES'}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {Object.values(skills).flat().map((skill, i) => (
              <motion.span
                key={`${skill.name}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ scale: 1.1, color: '#00d4ff', borderColor: '#00d4ff' }}
                style={{
                  padding: '6px 14px',
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '999px',
                  fontSize: '12px',
                  color: '#94a3b8',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'default',
                  transition: 'all 0.2s',
                }}
              >
                {skill.icon} {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
