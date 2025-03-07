const express = require("express");
const router = express.Router();
const Department = require("../models/Department.js");

router.post("/createDepartment", async (req, res) => {
    try {
        const department = new Department(req.body);
        await department.save();
        res.status(200).json({ message: "Department created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error in creating department", details: err.message });
    }
});
router.get("/getDepartments",async(req,res)=>{
    try{
        const {uni} = req.query
        console.log(uni);
        const data = await Department.find({university:uni});
        res.json(data);
    }
    catch(err){
        res.json("Error in fetching departments");
    }
})

module.exports = router;
