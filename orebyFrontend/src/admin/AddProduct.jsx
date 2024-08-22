import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function getAllCategory() {
      await axios
        .get("http://localhost:3000/api/v1/category/allcategory")
        .then((data) => {
          setCategoryData(data.data.category);
        });
    }

    getAllCategory();
  }, []);
  console.log(categoryData);
  const handleCategory = (e) => {
    const data = e.target.value;
    console.log(data);
  };

  console.log(imageUrl);
  return (
    <>
      <div className="relative bg-white w-2/5">
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
              value={value}
              onChange={setValue}
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
              name="productCategory"
              onChange={handleCategory}
              id="productCategory"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            >
              <option selected>Chose a category</option>
              {categoryData.map((item, i) => (
                <option key={i} value={item.name}>
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
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              />
            </div>
            <div className="w-2/4">
              <label className="block mb-2 text-md font-medium text-gray-900">
                Product Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              />
            </div>
          </div>
          <button
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
