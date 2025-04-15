const express = require("express");
const router = express.Router();
const Cluster = require("../models/Cluster");

// Create a new Cluster
router.post("/createCluster", async (req, res) => {
  try {
    const newCluster = new Cluster(req.body);
    await newCluster.save();
    res.status(200).json({ message: "Cluster Created Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error in creating Cluster", details: err.message });
  }
});

// Get all Clusters
router.get("/getClusters", async (req, res) => {
  try {
    const clusters = await Cluster.find({});
    res.status(200).json(clusters);
  } catch (err) {
    res.status(500).json({ error: "Error in fetching clusters", details: err.message });
  }
});

module.exports = router;
