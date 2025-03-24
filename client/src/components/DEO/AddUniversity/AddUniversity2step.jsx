import React, { useState } from "react";
import axios from "axios";
import { Button, Box, Paper, CircularProgress } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { AddUniversity } from "./AddUniversity";
import { AddUser } from "./AddUser";
import UploadDocuments from "./UploadDocuments";

export default function AddUniversity2step() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [universityLogo, setUniversityLogo] = useState(null);

  // University Data
  const [examinationC, setExaminationC] = useState({
    Name: "",
    email: "",
    mobile: "",
    aadhar: "",
    city: "",
    pincode: "",
    address: "",
    state: "",
    dob: "",
  });

  // University Data
  const [uniData, setUniData] = useState({
    Name: "",
    email: "",
    city: "",
    mobile: "",
    address: "",
    pinCode: "",
    state: "",
    establishedYear: "",
    url: "",
    uniType: "",
  });

  // Validation function for each step
  const isStepValid = () => {
    if (activeStep === 0) {
      return Object.values(uniData).every((val) => val && val.toString().trim() !== "");
    } else if (activeStep === 1) {
      console.log(examinationC)
      return Object.values(examinationC).every((val) => val && val.toString().trim() !== "");
    } else {
      return passportPhoto && universityLogo;
    }
  };
  

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      // 🔹 FormData for University
      const universityFormData = new FormData();
      Object.keys(uniData).forEach((key) => {
        universityFormData.append(key, uniData[key]);
      });
      universityFormData.append("ExaminationC",examinationC.Name);
      universityFormData.append("universityLogo", universityLogo.file);
      console.log(universityLogo);
      await axios.post("http://localhost:8000/api/addUni", universityFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

  
      console.log("University data submitted successfully!");
  
      // 🔹 FormData for Examination Controller
      const examinationFormData = new FormData();
      Object.keys(examinationC).forEach((key) => {
        examinationFormData.append(key, examinationC[key]);
      });
  
      // Append files

      examinationFormData.append("passportPhoto", passportPhoto.file);
      examinationFormData.append("universityName",uniData.Name);

      



     const response =  await axios.post("http://localhost:8000/api/createExaminationC", examinationFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
  
      
      setMessage("University and Examination Controller created successfully!");

      setUniData({
        Name: "",
        email: "",
        city: "",
        mobile: "",
        address: "",
        pinCode: "",
        state: "",
        establishedYear: "",
        url: "",
        uniType: "",
      });
  
      setExaminationC({
        Name: "",
        email: "",
        mobile: "",
        aadhar: "",
        city: "",
        pincode: "",
        address: "",
        state: "",
        dob: "",
      });
  
      setPassportPhoto(null);
      setUniversityLogo(null);
      setActiveStep(0); // Reset to Step 1
      
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Failed to submit the form.");
    }
  
    setLoading(false);
  };
  

  const steps = [
    "University Details",
    "Examination Controller Details",
    "Upload Documents",
  ];

  return (
    <Box sx={{ width: "100%", margin: "auto", padding: 3, height: "100%" }}>
      <Paper
        sx={{
          padding: 5,
          width: "95%",
          borderRadius: "15px",
          backgroundColor: "transparent",
          position: "relative",
        }}
        elevation={0}
      >
        {message && (
          <p style={{ color: message.includes("Error") ? "red" : "green" }}>
            {message}
          </p>
        )}
        <Box sx={{ width: "100%", marginTop: 2, marginBottom: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {activeStep === 0 && (
          <AddUniversity uniData={uniData} setUniData={setUniData} />
        )}
        {activeStep === 1 && (
          <AddUser
            examinationC={examinationC}
            setExaminationC={setExaminationC}
          />
        )}
        {activeStep === 2 && (
          <UploadDocuments
            passportPhoto={passportPhoto}
            setPassportPhoto={setPassportPhoto}
            universityLogo={universityLogo}
            setUniversityLogo={setUniversityLogo}
          />
        )}
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 0",
          marginTop: "20px",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{
            fontSize: "1.2rem",
            padding: "12px 24px",
            visibility: activeStep === 0 ? "hidden" : "visible",
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: "1.2rem", padding: "12px 24px", marginRight: 6 }}
          disabled={loading || !isStepValid()} // Disable button if form is incomplete
          onClick={activeStep === 2 ? handleSubmit : handleNext}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : activeStep === 2 ? (
            "Submit"
          ) : (
            "Next"
          )}
        </Button>
      </Box>
    </Box>
  );
}
