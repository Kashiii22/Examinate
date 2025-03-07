import { Provider } from "react-redux";
import store from './redux/store.jsx' // Import your Redux store
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DashboardLayoutBasic from "./components/superAdmin/superAdmin";
import ExamintionController from "./components/ExaminationController/superAdmin";
import PrivateRoute from "./PrivateRoute.jsx";
import Unauthorized from "./components/Unauthorized.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Login route */}
          <Route path="/" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Dashboard routes with private access */}
          <Route element={<PrivateRoute allowedRoles={["superAdmin"]} />}>
            <Route path="/admin/super" element={<DashboardLayoutBasic />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["ExaminationController"]} />}>
            <Route path="/admin/ExaminationController" element={<ExamintionController />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
