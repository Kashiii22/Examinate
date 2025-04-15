const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET;
const DOE = require('../models/DOE');
const multer = require("multer");
const path = require("path"); 
const {createDOE} = require('../controller/DOEController.js')
const {credentialsMail} = require('../mail.js');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profile"); // Store in 'uploads/profile'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage });



router.post("/createDOE",upload.single("passportPhoto"),createDOE,credentialsMail);

  router.post('/login/D', async (req, res) => {
    try {
      
      const { username, password } = req.body;
      const user = await DOE.findOne({ username });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ id: user._id, role: user.role, university: user.universityName ,passportPhoto:user.passportPhoto, Name:user.Name,email:user.email}, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  module.exports = router;