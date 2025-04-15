const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema(
    {
        clusterName: {
            type: String,
            required: true,
            trim: true,
        },
        clusterID: {
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
        clusterEmail: {
            type: String,
            required: true,
            trim: true,
            unique: true, // Ensures uniqueness
            index: true, // Indexed for fast searches
        },
        Dean: {
            type:String,    
            required: true,
            index: true, // Indexing for faster lookups
        },
    },
    {
        timestamps: true, 
    }
);


clusterSchema.index({ clusterID: 1, university: 1 });

module.exports = mongoose.model("Cluster", clusterSchema);
