const express = require("express");
const router = express.Router();
const ExaminationC = require("../models/ExaminationC");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET;
const multer = require("multer");
const path = require("path"); 
const {createExaminationC} = require('../controller/examinationC');
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
router.post("/createExaminationC", upload.single("passportPhoto"),createExaminationC,credentialsMail );



router.post("/login/E", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await ExaminationC.findOne({ username });
        console.log(user);
        if (!user) return res.json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id, role: user.role, university: user.universityName ,passportPhoto:user.passportPhoto, Name:user.Name,email:user.email}, JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.json({ message: "Server error", error: error.message });
    }
});

router.get("/fetchExaminationC", async (req, res) => {
    try {
        const users = await ExaminationC.find({});
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.json({ message: "Error fetching users", error: err.message });
    }
});
router.get("/user/email/:email", async (req, res) => {
    try {
        const user = await ExaminationC.findOne({ email: req.params.email });
        if (!user) return res.json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Fetch user by mobile
router.get("/user/mobile/:mobile", async (req, res) => {
    try {
        const user = await ExaminationC.findOne({ mobile: req.params.mobile });
        if (!user) return res.json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Fetch user by Aadhar
router.get("/user/aadhar/:aadhar", async (req, res) => {
    try {
        const user = await ExaminationC.findOne({ aadhar: req.params.aadhar });
        if (!user) return res.json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Fetch user by username
router.get("/user/username/:username", async (req, res) => {
    try {
        const user = await ExaminationC.findOne({ username: req.params.username });
        if (!user) return res.json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Fetch users by university
router.get("/users/university/:universityId", async (req, res) => {
    try {
        const users = await ExaminationC.find({ university: req.params.universityId });
        if (!users.length) return res.json({ message: "No users found" });
        res.json(users);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
