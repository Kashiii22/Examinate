import React, { useState } from "react";
import axios from "axios";
import { Button, Box, Paper, CircularProgress } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { AddUser } from "./AddUser";
import UploadDocuments from "./UploadDocuments";
import { AddDepartment } from "./AddDepartment";
import { useSelector } from "react-redux";

export default function AddDepartment2step() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passportPhoto, setPassportPhoto] = useState(null);


  // Get university name from Redux
  const university = useSelector((state) => state.auth.university);

  // University Data (DOE)
  const [DOE, setDOE] = useState({
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

  // Department Data
  const [departmentData, setDepartmentData] = useState({
    departmentID: "",
    departmentName: "",
    departmentEmail: "",
    mobile: "",
  });

  // Validation function for each step
  const isStepValid = () => {
    return Object.values(departmentData).every((val) => val?.trim() !== "");
  };

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      // Send department data
      const response = await axios.post("http://localhost:8000/api/createDepartment", {
        ...departmentData,
        DOE: DOE.Name,
        university: university,
      });
  
      // Create FormData for DOE
      const DOEData = new FormData();
      Object.keys(DOE).forEach((key) => {
        DOEData.append(key, DOE[key]);
      });  
      DOEData.append("universityName", university);
      DOEData.append("department", departmentData.departmentName);
      DOEData.append("passportPhoto", passportPhoto.file);
      console.log([...DOEData.entries()]);
  
      // Send DOE data
      const response1 = await axios.post("http://localhost:8000/api/createDOE", DOEData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      
      setMessage("Department and DOE created successfully");
  
      // Reset form values and stepper after successful submission
      setDepartmentData({
        departmentID: "",
        departmentName: "",
        departmentEmail: "",
        mobile: "",
      });
  
      setDOE({
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
      setActiveStep(0);
  
    } catch (err) {
      setMessage("Error in creating Department and DOE");
    } finally {
      setLoading(false);
    }
  };
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const steps = [
    "Department Details",
    "Department Examination Officer",
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
          <AddDepartment
            departmentData={departmentData}
            setDepartmentData={setDepartmentData}
          />
        )}
        {activeStep === 1 && <AddUser DOE={DOE} setDOE={setDOE} />}
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
