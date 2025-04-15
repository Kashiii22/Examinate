import React, { useState } from "react";
import axios from "axios";
import { Button, Box, Paper, CircularProgress } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { AddCluster } from "./AddCluster";
import { AddUser } from "./AddUser";
import UploadDocuments from "./UploadDocuments";
import { useSelector } from "react-redux";
export default function AddUniversity2step() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passportPhoto, setPassportPhoto] = useState(null);
  const university = useSelector((state) => state.auth.university);

  // University Data
  const [DeanData, setDeanData] = useState({
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


  const [clusterData, setClusterData] = useState({
    clusterID: "",
    clusterName: "",
    clusterEmail: "",
    mobile: "",
  });
  
  // Validation function for each step
  const isStepValid = () => {
    if (activeStep === 0) {
      return Object.values(clusterData).every((val) => val && val.toString().trim() !== "");
    } else if (activeStep === 1) {
      return Object.values(DeanData).every((val) => val && val.toString().trim() !== "");
    } else {
      return passportPhoto;
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
      const clusterFormData = new FormData();
      console.log(clusterData)
      Object.keys(clusterData).forEach((key) => {
        console.log(`Appending: ${key} = ${clusterData[key]}`);
        clusterFormData.append(key, clusterData[key]);
      });

      clusterFormData.append("Dean",DeanData.Name);
      clusterFormData.append("university",university)
      for (let pair of clusterFormData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      const response1 = await axios.post("http://localhost:8000/api/createCluster", clusterFormData, {
        headers: { "Content-Type": "application/json" }});
      console.log(response1);
  
      console.log("University data submitted successfully!");
      // 🔹 FormData for Examination Controller
      const deanFormData = new FormData();
      Object.keys(DeanData).forEach((key) => {
        deanFormData.append(key, DeanData[key]);
      });
  
      // Append files

      deanFormData.append("passportPhoto", passportPhoto.file);
      deanFormData.append("universityName",university)
      console.log(deanFormData)


     const response =  await axios.post("http://localhost:8000/api/createDean", deanFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

      setClusterData({
        clusterID: "",
        clusterName: "",
        clusterEmail: "",
        mobile: "",
      });
  
      setDeanData({
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
      setActiveStep(0); // Reset to Step 1
      if (response1.status === 200 && response.status === 200) {
        setMessage("Dean And Cluster Created Successfully"); // ✅ Now it will show success
      } else {
        setMessage("Failed to submit the form.");
      }
      
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Failed to submit the form.");
    }
  
    setLoading(false);
  };
  

  const steps = [
    "Cluster Details",
    "Dean Details",
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
          <AddCluster clusterData={clusterData} setClusterData={setClusterData}/>
        )}
        {activeStep === 1 && (
          <AddUser
            DeanData={DeanData}
            setDeanData={setDeanData}
          />
        )}
        {activeStep === 2 && (
          <UploadDocuments
            passportPhoto={passportPhoto}
            setPassportPhoto={setPassportPhoto}
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
