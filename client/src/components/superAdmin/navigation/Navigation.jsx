import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ManageUniversity } from '../ManageUniversity/ManageUniversity';

export const NAVIGATION = [
    {
      segment: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      segment: 'AddUniversity',
      title: 'Add University',
      icon: <AddIcon />,
    },
    {
      segment: 'ManageUniversities',
      title: 'Manage University',
      icon: <ManageAccountsIcon />,
    },
  ];