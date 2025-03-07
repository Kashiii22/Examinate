const express= require('express');
const router= express.Router();
const University = require('../models/University');
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Store in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });
  

// Creating a new university
router.post("/addUni", upload.single("universityLogo"), async (req, res) => {
    try {
      // Create a new University entry with universityLogo and req.body data
      const newUni = new University({
        ...req.body,
        universityLogo: req.file ? `/uploads/${req.file.filename}` : null,
      });
  
      await newUni.save();
      res.json("New University Added with Logo");
    } catch (err) {
      res.json({ err });
    }
  });

router.get("/fetchUniversities",async(req,res)=>{
    try{
        const result= await University.find({});
        res.json(result);
    }
    catch(err){
        res.json("Error occured in fetching",err);
    }
})



router.get("/getByName/:name", async (req, res) => {
    try {
        const university = await University.findOne({ Name: req.params.name });
        res.json(university);
    } catch (err) {
        res.json({ error: err });
    }
});


router.get("/getByEmail/:email", async (req, res) => {
    try {
        const university = await University.findOne({ email: req.params.email });
        res.json(university);
    } catch (err) {
        res.json({ error: err });
    }
});

router.get("/getByCity/:city", async (req, res) => {
    try {
        const universities = await University.find({ city: req.params.city });
        res.json(universities);
    } catch (err) {
        res.json({ error: err });
    }
});

router.get("/getByStateCity/:state/:city", async (req, res) => {
    try {
        const universities = await University.find({ 
            state: req.params.state, 
            city: req.params.city 
        });
        res.json(universities);
    } catch (err) {
        res.json({ error: err });
    }
});


router.get("/count-universities", async (req, res) => {
    try {
        const statusCounts = await University.aggregate([
            {
                $group: {
                    _id: "$status",  
                    count: { $sum: 1 } 
                }
            }
        ]);

        res.json({ success: true, data: statusCounts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.put("/editUni/:id", async (req, res) => {
    try {
        const id = req.params.id; 
        const updatedUniversity = await University.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true } 
        );
        if (!updatedUniversity) {
            return res.status(404).json({ error: "University not found" });
        }
        
        res.json({ message: "University updated successfully", university: updatedUniversity });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while editing", details: err.message });
    }
});


router.delete("/deleteUni/:id", async (req, res) => {
    try {
        const id = req.params.id; 
        const deletedUniversity = await University.findByIdAndDelete(id);

        if (!deletedUniversity) {
            return res.status(404).json({ error: "University not found" });
        }

        res.json({ message: "University deleted successfully", university: deletedUniversity });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while deleting", details: err.message });
    }
});



module.exports=router