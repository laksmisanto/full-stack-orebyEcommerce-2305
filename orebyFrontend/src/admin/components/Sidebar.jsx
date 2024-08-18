import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginInfo } from "../../slice/userSlice";

const Sidebar = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.value);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLoginInfo(""));
    localStorage.setItem("userInfo", "");
    navigate("/admin/login");
  };

  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className="relative top-0 left-0 z-40 min-w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full w-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-normal text-base">
            <li>
              <Link
                to={"/admin"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdDashboard />
                <span className="ms-3">Admin Dashboard</span>
              </Link>
            </li>
            {/* username */}
            <li className="font-normal text-base text-white py-4 pl-2">
              <h2 className="text-lg">
                Name: <span>{user.name}</span>
              </h2>
              <h4 className="text-sm">
                Role: <span>{user.role}</span>
              </h4>
            </li>
            {/* User dropdown start */}
            <li>
              <button
                type="button"
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FaUser />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  User
                </span>
                <FaAngleDown />
              </button>
              <ul
                className={
                  userDropdown ? "py-2 space-y-2" : "hidden py-2 space-y-2"
                }
              >
                <li>
                  <Link
                    to={"/admin/alluser"}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    All User
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/updateuser"}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Update User
                  </Link>
                </li>
              </ul>
            </li>
            {/* product dropdown start */}
            <li>
              <button
                type="button"
                onClick={() => setProductDropdown(!productDropdown)}
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FaUser />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Product
                </span>
                <FaAngleDown />
              </button>
              <ul
                className={
                  productDropdown ? "py-2 space-y-2" : "hidden py-2 space-y-2"
                }
              >
                <li>
                  <Link
                    to={"/admin/allproducts"}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/addproduct"}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/updateproduct"}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Edit/Delete Products
                  </Link>
                </li>
              </ul>
            </li>
            {/* Category dropdown start */}
            <li>
              <button
                type="button"
                onClick={() => setCategoryDropdown(!categoryDropdown)}
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FaUser />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Category
                </span>
                <FaAngleDown />
              </button>
              <ul
                className={
                  categoryDropdown ? "py-2 space-y-2" : "hidden py-2 space-y-2"
                }
              >
                <li>
                  <Link
                    to={"/admin/allcategory"}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    All Category
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/addcategory"}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Category
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/updatecategory"}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Edit/Delete Category
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="font-normal text-base flex items-center gap-2 absolute text-white bottom-6"
          >
            <MdLogout />
            <span>logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
