import React from "react";
import { TextField, Grid } from "@mui/material";

export const AddDepartment = ({ departmentData, setDepartmentData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Department ID"
            variant="outlined"
            fullWidth
            name="departmentID"
            value={departmentData.departmentID || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Department Name"
            variant="outlined"
            fullWidth
            name="departmentName"
            value={departmentData.departmentName || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Department Email"
            variant="outlined"
            fullWidth
            name="departmentEmail"
            value={departmentData.departmentEmail || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Mobile"
            variant="outlined"
            fullWidth
            name="mobile"
            value={departmentData.mobile || ""}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>
    </form>
  );
};
