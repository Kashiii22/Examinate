import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { demoTheme } from './Theme.jsx';
import { NAVIGATION } from './navigation/Navigation.jsx';
import { PageContent } from './PageContent.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DEOLayout({ window }) {
  const router = useDemoRouter('/dashboard');
  const navigate = useNavigate(); 
  const demoWindow = window ? window() : undefined;

  const user = useSelector((state) => state.auth.user);
  const email = useSelector((state) => state.auth.email);
  const BASE_URL = "http://localhost:8000"; // Update this to your actual server URL

  const passportPhoto = useSelector((state) => state.auth.passportPhoto);
  const sanitizedPassportPhoto = passportPhoto ? passportPhoto.replace(/\\/g, "/") : '';

  const passportPhotoPath = passportPhoto ? `${BASE_URL}/${sanitizedPassportPhoto}` : '';
  console.log("Final Image URL:", passportPhotoPath);
  const [session, setSession] = React.useState({
    user: {
      name: user?.Name || '',
      email: email || '',
      image: passportPhotoPath || '',
    },
  });

  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession({
        user: {
          name: user?.Name || '',
          email: email || '',
          image: passportPhotoPath || '',
        },
      });
    },
    signOut: async () => {
      try {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        setSession(null);
        navigate('/'); // Navigate after clearing session
      } catch (error) {
        console.error('Error during sign out:', error);
      }
    },
  }), [navigate]); // Include `navigate` as a dependency in `useMemo`

  return (
    <AppProvider
      navigation={NAVIGATION}
      authentication={authentication}
      session={session}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        title: 'Examinate',
        logo: (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <AssignmentIcon style={{ color: '#90caf9' }} />
          </Box>
        ),
      }}
    >
      <DashboardLayout>
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DEOLayout.propTypes = {
  window: PropTypes.func,
};

export default DEOLayout;
