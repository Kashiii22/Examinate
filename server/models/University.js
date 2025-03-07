const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
        index: true  
    },
    email: {
        type: String,
        required: true,
        unique: true,  
        index: true
    },
    city: {
        type: String,
        required: true,
        index: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,  
        index: true
    },
    address: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        index: true
    },
    establishedYear: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    uniType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "active"],  
        default: "active"
    },
    ExaminationC: {
        type: String,
        default: null
    },
    universityLogo: {
        type: String,  // Store logo URL
        default: null
    }
}, { timestamps: true });  

// Create Indexes
universitySchema.index({ Name: 1 });  
universitySchema.index({ city: 1 });  
universitySchema.index({ state: 1, city: 1 });  
universitySchema.index({ status: 1 });  

module.exports = mongoose.model("University", universitySchema);
