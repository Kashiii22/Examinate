import React, { useState } from "react";
import { Grid, TextField, InputAdornment } from "@mui/material";
import axios from "axios";

export const AddUser = ({ DOE, setDOE }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDOE({ ...DOE, [name]: value });
  };

  const formatAadhar = (aadhar) => {
    return aadhar.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleAadharChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (/^\d{0,12}$/.test(value)) {
      setDOE({ ...DOE, aadhar: formatAadhar(value) });
    }
  };

  const fetchLocation = async (pincode) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];

      if (data.Status === "Success" && data.PostOffice?.length > 0) {
        setDOE((prev) => ({
          ...prev,
          city: data.PostOffice[0].District,
          state: data.PostOffice[0].State,
        }));
      } else {
        console.error("Invalid pincode or no location data found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setDOE((prev) => ({ ...prev, pincode: value }));

    if (value.length === 6) fetchLocation(value);
  };

  // Calculate min and max dates for DOB
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0]; // Max date (must be at least 18 years old)
  const minDate = new Date(1900, 0, 1).toISOString().split("T")[0]; // Minimum realistic birth year

  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="Name"
            value={DOE.Name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={DOE.email}
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
            value={DOE.mobile}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            value={DOE.address}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Pin Code"
            variant="outlined"
            fullWidth
            name="pincode"
            value={DOE.pincode}
            onChange={handlePincodeChange}
            required
            inputProps={{ maxLength: 6 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            name="city"
            value={DOE.city}
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            name="state"
            value={DOE.state}
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Date of Birth"
            variant="outlined"
            fullWidth
            name="dob"
            value={DOE.dob}
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
            inputProps={{
              min: minDate, // Earliest date allowed
              max: maxDate, // Must be at least 18 years old
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Aadhar Number"
            variant="outlined"
            fullWidth
            name="aadhar"
            value={DOE.aadhar}
            onChange={handleAadharChange}
            required
            inputProps={{ maxLength: 14 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">Aadhar:</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
};
