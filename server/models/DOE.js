const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const DOESchema = new mongoose.Schema({
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
    department:{
        type:String,
        default:null,
        index:true,
    },
    aadhar: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    city: { type: String, required: true, trim: true },
    pincode: { type: Number, required: true },
    address: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    role: { type: String, default: "DOE" },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: { type: String, required: true },
    passportPhoto: {
        type: String, 
        default: null
    },
}, { timestamps: true });


DOESchema.pre('save', async function (next) {    
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});



module.exports = mongoose.model('DOE', DOESchema);
