import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const user = useSelector((data) => data.userInfo.value);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const handleProductInfoSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", productInfo.name);
    formData.append("description", description);
    formData.append("image", imageUrl);
    formData.append("categoryId", selectCategory);
    formData.append("sellingPrice", productInfo.sellingPrice);
    formData.append("price", productInfo.price);
    formData.append("ownerId", user._id);
    formData.append("storeId", selectStore);

    console.log("form data :", formData);
    try {
      await axios
        .post("http://localhost:3000/api/v1/product/createproduct", formData)
        .then(() => {
          setLoading(false);
          navigate("/admin/allproducts");
          console.log("successfully save data");
        })
        .catch((err) => {
          console.log("Product upload Error : ", err);
        });
    } catch (error) {
      console.log("Product creation error : ", error);
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
          {loading ? (
            <button
              disabled
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              onClick={handleProductInfoSubmit}
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center outline-none"
            >
              Create Category
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
