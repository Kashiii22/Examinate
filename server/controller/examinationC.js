const ExaminationC = require("../models/ExaminationC");
const path = require("path"); 


async function generateUniqueUsername(dob, aadhar) {
    try {
        if (!dob || !aadhar || aadhar.length < 3) throw new Error("Invalid DOB or Aadhar number");
        const dateOfBirth = new Date(dob);
        if (isNaN(dateOfBirth.getTime())) throw new Error("Invalid date format");
        const YY = String(dateOfBirth.getFullYear()).slice(-2);
        const MM = String(dateOfBirth.getMonth() + 1).padStart(2, "0");
        const DD = String(dateOfBirth.getDate()).padStart(2, "0");
        const baseID = `${YY}${MM}${DD}`;
        let uniqueDigits = aadhar.slice(-3);
        let username = `E${baseID}${uniqueDigits}`;
        let existingUser = await ExaminationC.findOne({ username });
        while (existingUser) {
            uniqueDigits = (parseInt(uniqueDigits) + 1).toString().padStart(3, "0");
            username = `E${baseID}${uniqueDigits}`;
            existingUser = await ExaminationC.findOne({ username });
        }
        return username;
    } catch (error) {
        console.error("Error generating username:", error);
        return "E9999999999";
    }
}
  
 module.exports.createExaminationC=async(req,res,next)=>{try {
        const { email, Name, mobile, university, aadhar, city, pincode, address, state, dob, universityName } = req.body;

        const dobDate = new Date(dob);
        const username = await generateUniqueUsername(dobDate, aadhar);

        let password = Name.trim(); // Use raw password (Mongoose will hash it)

        let user = await ExaminationC.findOne({ username });
        if (user) return res.json({ message: "Username already exists" });

        const passportPhotoPath = req.file ? path.join("uploads/profile", req.file.filename) : null;

        const newUser = new ExaminationC({
            email,
            Name,
            mobile,
            university,
            aadhar,
            city,
            pincode,
            address,
            state,
            dob,
            username,
            password,  // Mongoose middleware will hash it
            universityName,
            passportPhoto: passportPhotoPath,
        });
        req.body.username= username;
        req.body.password=password;
        await newUser.save();
        res.json({ message: "ExaminationC Registered", username });
        next();
    } catch (err) {
        res.json({ message: "Error creating ExaminationC", error: err.message });
    }
}