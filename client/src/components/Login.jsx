import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { TextField, Button, Box, Typography, Snackbar, Alert, Link } from '@mui/material'; // Import Material-UI components
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { useDispatch } from "react-redux";
import { loginSuccess } from '../redux/authslice';

const BRANDING = {
  logo: (
    <AssignmentIcon style={{ fontSize: 35, color: "#1976d2" }} />
  ),
  title: 'Examinate',
};

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const validateUsername = () => {
    if (!username.trim()) {
      setUsernameError('Username cannot be empty.');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError('Password cannot be empty.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateUsername() && validatePassword()) {
      try {
        const firstLetter = username.charAt(0);
        const response = await axios.post(`http://localhost:8000/api/login/${firstLetter}`, { username, password });
        console.log(response);
        if(response.data.token){
          dispatch(loginSuccess({ token: response.data.token }));
        }
        const decoded = JSON.parse(atob(response.data.token.split(".")[1]));
        console.log(decoded)
        switch (decoded.role) {
          case "superAdmin":
            navigate("/admin/super");
            break;
          case "ExaminationController":
            navigate("/admin/ExaminationController"); 
            break;
          case "DEO":
            navigate("/admin/DEO")
            break;
            default:
              navigate("/unauthorized");
        }

      } catch (err) {
        setErrorMessage('Invalid username or password');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <AppProvider branding={BRANDING} theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#f4f6f8"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          maxWidth="400px"
          p={4}
          bgcolor="white"
          borderRadius={2}
          boxShadow={3}
        >
          <AssignmentIcon style={{ fontSize: 50, color: "#1976d2", marginBottom: 20 }} />
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Sign In to Examinate
          </Typography>
          <TextField
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            onBlur={validateUsername}
            helperText={usernameError}
            error={Boolean(usernameError)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
            helperText={passwordError}
            error={Boolean(passwordError)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Sign In
          </Button>
          
          {/* Forgot Username and Password Links */}
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            marginTop={2}
          >
            <Link href="#" variant="body2" color="primary">
              Forgot Username?
            </Link>
            <Link href="#" variant="body2" color="primary">
              Forgot Password?
            </Link>
          </Box>
        </Box>
      </Box>
      
      {/* Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </AppProvider>
  );
}
