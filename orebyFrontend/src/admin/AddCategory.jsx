import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const [storeCategory, setStoreCategory] = useState({
    name: "",
    description: "",
  });

  let handleCategoryInfo = (e) => {
    let { name, value } = e.target;
    setStoreCategory({ ...storeCategory, [name]: value });
  };

  let handleAddCategoryInfo = async () => {
    try {
      await axios
        .post("http://localhost:3000/api/v1/category/createcategory", {
          name: storeCategory.name,
          description: storeCategory.description,
        })
        .then(() => {
          navigate("/admin/allcategory");
          console.log("Category Create Successful");
        });
    } catch (error) {
      console.log("Category Error : ", error);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-xl">
            {/* Modal header */}
            <div className="p-4 md:p-5 border-b rounded-t border-gray-200">
              <h3 className="text-2xl text-center font-semibold text-gray-900">
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
                  onChange={handleCategoryInfo}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  placeholder="name"
                />
              </div>
              <div className="my-3">
                <label className="block mb-2 text-md font-medium text-gray-900">
                  {/* You can not update email */}
                  Description
                </label>
                <textarea
                  onChange={handleCategoryInfo}
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="min-h-32  bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                />
              </div>
              <button
                onClick={handleAddCategoryInfo}
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center outline-none"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
