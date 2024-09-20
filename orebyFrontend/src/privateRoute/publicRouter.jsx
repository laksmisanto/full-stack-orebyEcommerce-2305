import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = () => {
  const user = useSelector((data) => data.userInfo.value);
  return user.role == "admin" || user.role == "merchant" ? (
    <Navigate to={"/admin"} />
  ) : (
    <Outlet />
  );
};

export default PublicRouter;
