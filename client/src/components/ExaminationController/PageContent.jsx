import { DashboardElement } from './Dashboard/Dashboard.jsx';
import { ManageDepartment } from './ManageDepartment/ManageDepartment.jsx';
import { ManageDEO } from './ManageDEO/ManageDEO.jsx';
import AddDepartment2step from './AddDepartment/AddDepartment2step.jsx';
import { AddDEO } from './AddDEO/AddDEO.jsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // ✅ Import Typography

export function PageContent({ pathname }) {
  let element;

  switch (pathname) {
    case '/admin/ExaminationController':
      element = <DashboardElement />;
      break;
    case '/Create-Department':
      element = <AddDepartment2step/>;
      break;
    case '/Manage-Department':
    element = <ManageDepartment/>
    break;
    default:
      element = <Typography variant="h6">Welcome to the Application</Typography>; // ✅ Fixed
  }

  return (
    <Box
      sx={{
        py: 4,
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
