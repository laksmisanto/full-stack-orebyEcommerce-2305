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
  console.log(storeCategory);

  let handleAddCategoryInfo = async () => {
    try {
      await axios
        .post("http://localhost:3000/api/v1/category/createcategory", {
          name: storeCategory.name,
          description: storeCategory.description,
        })
        .then(() => {
          console.log("Category Create Successful");
          navigate("/admin/allcategory");
        });
    } catch (error) {
      console.log("Category Error : ", error);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center  backdrop-blur">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
                Create Your Category
              </h3>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  onChange={handleCategoryInfo}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                  placeholder="name"
                  required=""
                />
              </div>
              <div className="my-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {/* You can not update email */}
                  Description
                </label>
                <textarea
                  onChange={handleCategoryInfo}
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                />
              </div>
              <button
                onClick={handleAddCategoryInfo}
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 outline-none"
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
