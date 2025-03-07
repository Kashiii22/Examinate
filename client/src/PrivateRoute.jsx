import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default PrivateRoute;
