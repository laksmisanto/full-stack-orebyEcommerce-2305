import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const user = useSelector((data) => data.userInfo.value);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [storeData, setStoreData] = useState([]);
  const [selectStore, setSelectStore] = useState("");
  const [productInfo, setProductInfo] = useState({
    name: "",
    sellingPrice: "",
    price: "",
  });

  const handleProductInfo = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySubmit = async () => {
    const formData = new FormData();
    formData.append("name", productInfo.name);
    formData.append("description", description);
    formData.append("image", imageUrl);
    formData.append("categoryId", selectCategory);
    formData.append("sellingPrice", productInfo.sellingPrice);
    formData.append("price", productInfo.price);
    formData.append("ownerId", user._id);
    formData.append("storeId", selectStore);

    try {
      await axios
        .post("http://localhost:3000/api/v1/product/createproduct", {
          formData,
        })
        .then(() => {
          navigate("/admin/allproducts");
          console.log("successfully save data");
          alert("product created");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getAllCategory() {
      await axios
        .get("http://localhost:3000/api/v1/category/allcategory")
        .then((data) => {
          setCategoryData(data.data.category);
        });
    }
    async function getAllStore() {
      await axios
        .get("http://localhost:3000/api/v1/store/allstore")
        .then((data) => {
          setStoreData(data.data.store);
        });
    }

    getAllCategory();
    getAllStore();
  }, []);

  return (
    <>
      <div className="relative bg-white w-full lg:w-3/4 xl:w-2/5 ">
        {/* Modal header */}
        <div className="p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900">
            Create Your Category
          </h3>
        </div>
        {/* Modal body */}
        <div className="p-4 md:p-5">
          <div>
            <label className="block mb-2 text-md font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              onChange={handleProductInfo}
              value={productInfo.name}
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              placeholder="name"
            />
          </div>
          <div className="my-3 inline-block w-full">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Description
            </label>
            <ReactQuill
              theme="snow"
              onChange={setDescription}
              value={description}
              className="h-[200px] rounded text-lg"
            />
          </div>
          <div className="my-3">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Category Image
            </label>
            <input
              type="file"
              onChange={(e) => setImageUrl(e.target.files[0])}
              name="productImage"
              id="productImage"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            />
            {imageUrl && (
              <img
                className="h-32 w-auto"
                src={URL.createObjectURL(imageUrl)}
                alt="Category Selected Image"
              />
            )}
          </div>
          <div className="my-3">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Product Category
            </label>
            <select
              onChange={(e) => setSelectCategory(e.target.value)}
              name="productCategory"
              id="productCategory"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            >
              <option>Chose a category</option>
              {categoryData.map((item, i) => (
                <option key={i} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-3">
            <label className="block mb-2 text-md font-medium text-gray-900">
              Product Category
            </label>
            <select
              onChange={(e) => setSelectStore(e.target.value)}
              name="storeData"
              id="storeData"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            >
              <option>Chose a Store</option>
              {storeData.map((item, i) => (
                <option key={i} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex my-3 gap-5">
            <div className="w-2/4">
              <label className="block mb-2 text-md font-medium text-gray-900">
                Product Selling Price
              </label>
              <input
                type="number"
                onChange={handleProductInfo}
                value={productInfo.sellingPrice}
                name="sellingPrice"
                id="sellingPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              />
            </div>
            <div className="w-2/4">
              <label className="block mb-2 text-md font-medium text-gray-900">
                Product Price
              </label>
              <input
                type="number"
                onChange={handleProductInfo}
                value={productInfo.price}
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleCategorySubmit}
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center outline-none"
          >
            Create Category
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
