const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Contact form stricter rate limit
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, message: 'Too many messages sent, please try again later.' },
});

// CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'
    );
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Don't exit - allow server to run without DB for development
  }
};
connectDB();

// Routes
app.use('/api/contact', contactLimiter, require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

// Skills data endpoint
app.get('/api/skills', (req, res) => {
  const skills = {
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
  res.json({ success: true, data: skills });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
