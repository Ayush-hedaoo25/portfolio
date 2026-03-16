import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiGitBranch, FiStar } from 'react-icons/fi';
import { fetchProjects } from '../utils/api';

const CATEGORY_COLORS = {
  DevOps: { color: '#00ff88', bg: '0,255,136' },
  Cloud: { color: '#00d4ff', bg: '0,212,255' },
  Security: { color: '#7c3aed', bg: '124,58,237' },
  Automation: { color: '#ff6b00', bg: '255,107,0' },
  Infrastructure: { color: '#ff0080', bg: '255,0,128' },
};

const FILTERS = ['All', 'DevOps', 'Cloud', 'Security', 'Automation', 'Infrastructure'];

const fallbackProjects = [
  {
    _id: '1',
    title: 'Zero-Trust CI/CD Pipeline',
    description: 'Built a fully automated CI/CD pipeline with integrated DevSecOps practices including SAST, DAST, container scanning with Trivy, and secrets detection. Deployed on Kubernetes with automated rollback on security failures.',
    tags: ['Jenkins', 'Docker', 'Kubernetes', 'Trivy', 'SonarQube', 'GitHub Actions'],
    category: 'DevOps',
    featured: true,
  },
  {
    _id: '2',
    title: 'AWS Multi-Region Infrastructure',
    description: 'Designed and deployed a fault-tolerant, multi-region AWS infrastructure using Terraform. Includes VPC, EC2 Auto Scaling, RDS with read replicas, S3, CloudFront CDN, and Route53 failover routing.',
    tags: ['AWS', 'Terraform', 'EC2', 'RDS', 'S3', 'CloudFront'],
    category: 'Cloud',
    featured: true,
  },
  {
    _id: '3',
    title: 'Azure DevOps Security Pipeline',
    description: 'Implemented a comprehensive Azure DevOps pipeline with Secure SDLC enforcement, RBAC-based access control, Azure Key Vault integration for secrets, and Azure Monitor + Log Analytics for observability.',
    tags: ['Azure', 'Azure DevOps', 'Key Vault', 'RBAC', 'Azure Monitor'],
    category: 'Security',
    featured: true,
  },
  {
    _id: '4',
    title: 'Kubernetes Cluster Hardening',
    description: 'Hardened a production Kubernetes cluster with Pod Security Policies, Network Policies, OPA/Gatekeeper, encrypted secrets, Falco runtime security, and integrated container image scanning.',
    tags: ['Kubernetes', 'OPA', 'Falco', 'Docker', 'Trivy', 'Helm'],
    category: 'Security',
    featured: false,
  },
  {
    _id: '5',
    title: 'Python AWS Automation Suite',
    description: 'Developed a comprehensive Python automation toolkit using boto3 for AWS resource management: automated EC2 lifecycle, S3 cost optimization, IAM compliance auditing, and CloudWatch alerting.',
    tags: ['Python', 'boto3', 'AWS', 'Lambda', 'CloudWatch', 'IAM'],
    category: 'Automation',
    featured: false,
  },
  {
    _id: '6',
    title: 'Serverless Event-Driven Architecture',
    description: 'Architected a serverless event-driven system on AWS using Lambda, SQS, SNS, EventBridge, and DynamoDB. Implemented observability with X-Ray tracing and CloudWatch dashboards.',
    tags: ['AWS Lambda', 'SQS', 'SNS', 'DynamoDB', 'X-Ray', 'EventBridge'],
    category: 'Cloud',
    featured: false,
  },
];

const ProjectCard = ({ project, index }) => {
  const catStyle = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.DevOps;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      style={{
        background: 'rgba(17, 24, 39, 0.8)',
        border: `1px solid rgba(${catStyle.bg}, 0.15)`,
        borderRadius: '16px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top glow accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${catStyle.color}, transparent)`,
          borderRadius: '16px 16px 0 0',
        }}
      />

      {/* Featured badge */}
      {project.featured && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 10px',
            background: `rgba(${catStyle.bg}, 0.1)`,
            border: `1px solid rgba(${catStyle.bg}, 0.2)`,
            borderRadius: '999px',
          }}
        >
          <FiStar size={10} color={catStyle.color} />
          <span className="mono" style={{ color: catStyle.color, fontSize: '10px', fontWeight: '700' }}>
            Featured
          </span>
        </div>
      )}

      {/* Category */}
      <div style={{ marginBottom: '16px' }}>
        <span
          className="mono"
          style={{
            fontSize: '11px',
            fontWeight: '700',
            color: catStyle.color,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#e2e8f0',
          marginBottom: '12px',
          lineHeight: '1.3',
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: '#94a3b8',
          fontSize: '14px',
          lineHeight: '1.7',
          marginBottom: '20px',
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="mono"
            style={{
              padding: '3px 10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px',
              fontSize: '11px',
              color: '#94a3b8',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '13px',
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'color 0.2s',
            }}
          >
            <FiGithub size={14} />
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '13px',
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'color 0.2s',
            }}
          >
            <FiExternalLink size={14} />
            Live
          </a>
        )}
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <FiGitBranch size={12} color="#4a5568" />
          <span className="mono" style={{ color: '#4a5568', fontSize: '11px' }}>main</span>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch(() => {/* use fallback */});
  }, []);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ background: '#0d1117' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <span
            className="mono"
            style={{ color: '#7c3aed', fontSize: '14px', letterSpacing: '3px', textTransform: 'uppercase' }}
          >
            {'// projects/'}
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: '800',
              marginTop: '12px',
              letterSpacing: '-1px',
            }}
          >
            What I've <span className="gradient-text-purple">Built</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '16px auto 0', fontSize: '16px', lineHeight: '1.7' }}>
            Real-world cloud infrastructure, security pipelines, and automation systems.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          {FILTERS.map((filter) => {
            const catColor = CATEGORY_COLORS[filter]?.color || '#00d4ff';
            const isActive = activeFilter === filter;
            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '8px 18px',
                  borderRadius: '6px',
                  border: `1px solid ${isActive ? catColor : 'rgba(255,255,255,0.08)'}`,
                  background: isActive ? `rgba(${CATEGORY_COLORS[filter]?.bg || '0,212,255'}, 0.1)` : 'transparent',
                  color: isActive ? catColor : '#94a3b8',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {filter}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project._id || i} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#4a5568', padding: '60px' }}>
            <span className="mono" style={{ fontSize: '14px' }}>
              {'// No projects found in this category yet'}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
