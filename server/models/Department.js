const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
    {
        departmentName: {
            type: String,
            required: true,
            trim: true,
        },
        departmentID: {
            type: String,
            required: true,
            unique: true,
            index: true, 
            trim: true,
        },
        university: {
            type: String,
            default: null,
            index: true, // Indexed for faster lookups
            sparse: true, // Avoids indexing null values
            trim: true,
        },
        departmentEmail: {
            type: String,
            required: true,
            trim: true,
            unique: true, // Ensures uniqueness
            index: true, // Indexed for fast searches
        },
        DOE: {
            type:String,    
            required: true,
            index: true, // Indexing for faster lookups
        },
    },
    {
        timestamps: true, 
    }
);


departmentSchema.index({ departmentID: 1, universityID: 1 });

module.exports = mongoose.model("Department", departmentSchema);
