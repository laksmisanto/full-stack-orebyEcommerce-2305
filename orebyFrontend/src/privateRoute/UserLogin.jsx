import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLogin = () => {
  const user = useSelector((data) => data.userInfo.value);
  return user.role == "admin" || user.role == "merchant" ? (
    <Outlet />
  ) : (
    <Navigate to={"/admin/login"} />
  );
};

export default UserLogin;
