import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Rootlayout from "./component/layout/Rootlayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import Admin from "./admin/Admin";
import Forgetpassword from "./pages/Forgetpassword";
import Changepassword from "./pages/Changepassword";
import AllUser from "./admin/AllUser";
import UpdateUser from "./admin/UpdateUser";
import AllProducts from "./admin/AllProducts";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import AllCategory from "./admin/AllCategory";
import AddCategory from "./admin/AddCategory";
import UpdateCategory from "./admin/UpdateCategory";
import Store from "./admin/Store";
import BannerImage from "./admin/BannerImage";
import Discount from "./admin/Discount";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<Home title="Home" />}></Route>
        <Route path="/products" element={<Products title="Shop" />}></Route>
        <Route path="/forgetpassword" element={<Forgetpassword />}></Route>
        <Route
          path="/changepassword/:token"
          element={<Changepassword />}
        ></Route>
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path="/admin/alluser" element={<AllUser />} />
        <Route path="/admin/updateuser" element={<UpdateUser />} />
        <Route path="/admin/allproducts" element={<AllProducts />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/admin/updateproduct" element={<UpdateProduct />} />
        <Route path="/admin/allcategory" element={<AllCategory />} />
        <Route path="/admin/addcategory" element={<AddCategory />} />
        <Route path="/admin/updatecategory" element={<UpdateCategory />} />
        <Route path="/admin/store" element={<Store />} />
        <Route path="/admin/bannerimage" element={<BannerImage />} />
        <Route path="/admin/discount" element={<Discount />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
