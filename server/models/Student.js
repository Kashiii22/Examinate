const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    universityName: {
        type: String,
        default: null,
        index: true
    },
    aadhar: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    department:{
        type:String,
        default:null,
        index:true,
    },
    cluster:{
        type:String,
        default:null,
        index:true,
    },
    city: { type: String, required: true, trim: true },
    pincode: { type: Number, required: true },
    address: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    role: { type: String, default: "ExaminationController" },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: { type: String, required: true },
    passportPhoto: {
        type: String, // Store the URL of the uploaded image
        default: null
    }
}, { timestamps: true });

// **Indexes for optimized searching**
StudentSchema.index({ email: 1, mobile: 1, username: 1 });
StudentSchema.index({ universityName: 1 }); // Search by university

// **Pre-save middleware for hashing password**
StudentSchema.pre('save', async function (next) {    
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Student', StudentSchema);
