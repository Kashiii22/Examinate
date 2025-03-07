const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// Import Models


// Import Routers
const universityRouter = require('./router/UniversityRouter');
const sAdminRouter = require('./router/sAdminRouter');
const ExaminationCrouter = require('./router/ExaminationC');
const departmentRouter = require("./router/departmentRouter");
const DOERouter = require('./router/DOERouter');
const {credentialsMail} = require('./mail.js')
const app = express();
const path=require('path');

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Database Connection
const mongoURI = process.env.MONGOURL || "mongodb://localhost:27017/yourdbname";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/uploads/profile', express.static(path.join(__dirname, 'uploads/profile')));




// Session Configuration
const sessionOptions = {
  secret: process.env.SECRET || "fallback_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};


// Routes
app.use("/api/", universityRouter, sAdminRouter, ExaminationCrouter, departmentRouter,DOERouter);
app.post("/sendmail",credentialsMail);
// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
