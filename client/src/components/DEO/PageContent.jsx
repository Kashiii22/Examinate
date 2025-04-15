import { DashboardElement } from './Dashboard/Dashboard.jsx';
import { ManageUniversity } from './ManageUniversity/ManageUniversity.jsx';
import { ManageUser } from './ManageUser/ManageUser.jsx';


import Box from '@mui/material/Box';

import AddUniversity2step from './AddUniversity/AddUniversity2step.jsx';


export function PageContent({ pathname }) {
  let element;
  switch (pathname) {
    case '/dashboard':
      element = <DashboardElement/>;
      break;
    case '/ManageUniversities':
      element = <ManageUniversity/>;
      break;
    case '/ManageUsers':
      element = <ManageUser/>;
      break;
    case '/Create-Deans':
      element = <AddUniversity2step/>;
      break;
    default:
      element = <Typography>Welcome to the Application</Typography>;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {element}
    </Box>
  );
}
