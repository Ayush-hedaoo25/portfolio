const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Seed data for projects
const seedProjects = [
  {
    title: 'Zero-Trust CI/CD Pipeline',
    description:
      'Built a fully automated CI/CD pipeline with integrated DevSecOps practices including SAST, DAST, container scanning with Trivy, and secrets detection. Deployed on Kubernetes with automated rollback on security failures.',
    tags: ['Jenkins', 'Docker', 'Kubernetes', 'Trivy', 'SonarQube', 'GitHub Actions'],
    category: 'DevOps',
    featured: true,
    order: 1,
  },
  {
    title: 'AWS Multi-Region Infrastructure',
    description:
      'Designed and deployed a fault-tolerant, multi-region AWS infrastructure using Terraform. Includes VPC, EC2 Auto Scaling, RDS with read replicas, S3, CloudFront CDN, and Route53 failover routing.',
    tags: ['AWS', 'Terraform', 'EC2', 'RDS', 'S3', 'CloudFront', 'Route53'],
    category: 'Cloud',
    featured: true,
    order: 2,
  },
  {
    title: 'Azure DevOps Security Pipeline',
    description:
      'Implemented a comprehensive Azure DevOps pipeline with Secure SDLC enforcement, RBAC-based access control, Azure Key Vault integration for secrets, and Azure Monitor + Log Analytics for observability.',
    tags: ['Azure', 'Azure DevOps', 'Key Vault', 'RBAC', 'Azure Monitor'],
    category: 'Security',
    featured: true,
    order: 3,
  },
  {
    title: 'Kubernetes Cluster Hardening',
    description:
      'Hardened a production Kubernetes cluster with Pod Security Policies, Network Policies, OPA/Gatekeeper, encrypted secrets, Falco runtime security, and integrated container image scanning.',
    tags: ['Kubernetes', 'OPA', 'Falco', 'Docker', 'Trivy', 'Helm'],
    category: 'Security',
    featured: false,
    order: 4,
  },
  {
    title: 'Python AWS Automation Suite',
    description:
      'Developed a comprehensive Python automation toolkit using boto3 for AWS resource management: automated EC2 lifecycle, S3 cost optimization, IAM compliance auditing, and CloudWatch alerting.',
    tags: ['Python', 'boto3', 'AWS', 'Lambda', 'CloudWatch', 'IAM'],
    category: 'Automation',
    featured: false,
    order: 5,
  },
  {
    title: 'Serverless Event-Driven Architecture',
    description:
      'Architected a serverless event-driven system on AWS using Lambda, SQS, SNS, EventBridge, and DynamoDB. Implemented observability with X-Ray tracing and CloudWatch dashboards.',
    tags: ['AWS Lambda', 'SQS', 'SNS', 'DynamoDB', 'X-Ray', 'EventBridge'],
    category: 'Cloud',
    featured: false,
    order: 6,
  },
];

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    let projects = await Project.find().sort({ order: 1, createdAt: -1 });

    // Seed if empty
    if (projects.length === 0) {
      projects = await Project.insertMany(seedProjects);
    }

    const { category, featured } = req.query;
    if (category) projects = projects.filter((p) => p.category === category);
    if (featured === 'true') projects = projects.filter((p) => p.featured);

    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
