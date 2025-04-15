import React from "react";
import { TextField, Grid } from "@mui/material";

export const AddCluster = ({ clusterData, setClusterData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClusterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Cluster ID"
            variant="outlined"
            fullWidth
            name="clusterID"
            value={clusterData.clusterID || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Cluster Name"
            variant="outlined"
            fullWidth
            name="clusterName"
            value={clusterData.clusterName || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Cluster Email"
            variant="outlined"
            fullWidth
            name="clusterEmail"
            value={clusterData.clusterEmail || ""}
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
            value={clusterData.mobile || ""}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>
    </form>
  );
};
