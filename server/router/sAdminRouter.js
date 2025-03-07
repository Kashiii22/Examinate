const express= require('express');
const router= express.Router();
const sAdmin = require('../models/SAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET;



router.post('/createSAdmin', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await sAdmin.findOne({ username });
    if (user) return res.status(400).json({ message: 'Username already exists' });

    user = new sAdmin({ username, email, password });
    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  });
  router.post('/login/S', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await sAdmin.findOne({ username });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id , role:user.role}, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

  router.get('/protected', authenticateToken, async (req, res) => {
    res.json({ message: 'You are authorized', userId: req.user.id });
  });
  
  // Middleware to verify JWT
  function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
  router.get("/logoutSAdmin", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "An error occurred during logout", error: err.message });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to destroy session", error: err.message });
        }
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  });
  
  


module.exports=router;