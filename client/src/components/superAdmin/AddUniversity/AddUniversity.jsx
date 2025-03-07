import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

export const AddUniversity = ({ uniData, setUniData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUniData({
      ...uniData,
      [name]: value,
    });

    if (name === "pinCode" && value.length === 6) {
      fetchLocationByPincode(value);
    }
  };
  const fetchLocationByPincode = async (pincode) => {
    if (pincode.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = response.data[0];
        if (data.Status === 'Success') {
          setUniData((prev) => ({
            ...prev,
            city: data.PostOffice[0].District,
            state: data.PostOffice[0].State,
          }));
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    }
  };
  return (
    <>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="University Name"
              variant="outlined"
              fullWidth
              name="Name"
              value={uniData.Name}
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
              value={uniData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Pincode"
              variant="outlined"
              fullWidth
              name="pinCode"
              value={uniData.pinCode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              name="city"
              value={uniData.city}
              onChange={handleChange}
              required
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              name="state"
              value={uniData.state}
              onChange={handleChange}
              required
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              name="mobile"
              value={uniData.mobile}
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
              value={uniData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Established Year"
              variant="outlined"
              fullWidth
              name="establishedYear"
              value={uniData.establishedYear}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="University Website URL"
              variant="outlined"
              fullWidth
              name="url"
              value={uniData.url}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>University Type</InputLabel>
              <Select
                label="University Type"
                name="uniType"
                value={uniData.uniType}
                onChange={handleChange}
                required
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="semi-government">Semi-Government</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

