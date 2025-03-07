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
import axios from 'axios';

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic({ window }) {
  const router = useDemoRouter('/dashboard');
  const navigate = useNavigate(); 
  const demoWindow = window ? window() : undefined;

  const [session, setSession] = React.useState({
    user: {
      name: localStorage.getItem('username') || 'Guest',
      email: localStorage.getItem('email') || '',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession({
        user: {
          name: localStorage.getItem('username') || 'Guest',
          email: localStorage.getItem('email') || '',
          image: 'https://avatars.githubusercontent.com/u/19550456',
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

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
