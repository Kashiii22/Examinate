import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Typography,
} from '@mui/material';
import axios from 'axios';

export const AddDEO = () => {
  const initialFormState = {
    Name: '',
    email: '',
    mobile: '',
    university: '',
    aadhar: '',
    city: '',
    pincode: '',
    address: '',
    state: '',
    dob: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/fetchUniversities');
        setUniversities(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatAadhar = (aadhar) => {
    return aadhar.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleAadharChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    if (/^\d{0,12}$/.test(value)) {
      setFormData({ ...formData, aadhar: formatAadhar(value) });
    }
  };

  const fetchLocation = async (pincode) => {
    if (pincode.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = response.data[0];
        if (data.Status === 'Success') {
          setFormData((prev) => ({
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

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData({ ...formData, pincode: value });
    if (value.length === 6) fetchLocation(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:8000/api/createExaminationC', formData);
      setMessage('Form submitted successfully!');
      setFormData(initialFormState); // Reset form fields
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Failed to submit the form.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%', margin: 'auto', padding: 3 }}>
      <Paper sx={{ padding: 5, width: '95%', borderRadius: '15px', backgroundColor: 'transparent' }} elevation={0}>
        {message && (
          <Typography sx={{ textAlign: 'center', mb: 2, color: message.includes('successfully') ? 'green' : 'red' }}>
            {message}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Name" variant="outlined" fullWidth name="Name" value={formData.Name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Email" variant="outlined" fullWidth name="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Mobile" variant="outlined" fullWidth name="mobile" value={formData.mobile} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Address" variant="outlined" fullWidth name="address" value={formData.address} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Pin Code" variant="outlined" fullWidth name="pincode" value={formData.pincode} onChange={handlePincodeChange} required inputProps={{ maxLength: 6 }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="City" variant="outlined" fullWidth name="city" value={formData.city} disabled required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="State" variant="outlined" fullWidth name="state" value={formData.state} disabled required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select label="University" variant="outlined" fullWidth name="university" value={formData.university} onChange={handleChange} required>
                {universities.map((uni) => (
                  <MenuItem key={uni.id} value={uni._id}>{uni.Name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Date of Birth" variant="outlined" fullWidth name="dob" value={formData.dob} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Aadhar Number" variant="outlined" fullWidth name="aadhar" value={formData.aadhar} onChange={handleAadharChange} required inputProps={{ maxLength: 14 }} InputProps={{ startAdornment: <InputAdornment position="start">Aadhar:</InputAdornment> }} />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, marginRight: 3, fontSize: '1.2rem', padding: '12px 24px' }} disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};
