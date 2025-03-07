import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f6f8"
      px={2}
    >
      <Paper 
        elevation={3} 
        sx={{
          p: 4,
          textAlign: "center",
          maxWidth: 420,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 60, color: "#6c757d", mb: 2 }} />
        <Typography variant="h3" fontWeight="bold" color="textPrimary">
          403
        </Typography>
        <Typography variant="h5" fontWeight="500" color="textSecondary" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          This section is restricted. Please ensure you are logged in with the correct credentials to continue.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/")}
        >
          Return to Homepage
        </Button>
      </Paper>
    </Box>
  );
}
