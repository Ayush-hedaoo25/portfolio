const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Contact error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/contact - Get all messages (requires ADMIN_KEY header for protection)
router.get('/', (req, res, next) => {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey || req.headers['x-admin-key'] !== adminKey) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
}, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
