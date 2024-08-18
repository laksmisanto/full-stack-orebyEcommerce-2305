import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AllCategory = () => {
  const user = useSelector((data) => data.userInfo.value);
  const [showAllCategory, setShowAllCategory] = useState([]);

  useEffect(() => {
    let getAllCategory = async () => {
      await axios
        .get("http://localhost:3000/api/v1/category/allcategory")
        .then((data) => {
          setShowAllCategory(data.data.category);
        });
    };
    getAllCategory();
  }, [showAllCategory]);

  const handleActionChange = async (item, e) => {
    await axios
      .post("http://localhost:3000/api/v1/category/categoryapprove", {
        email: user.email,
        categoryId: item._id,
        categoryAction: e.target.value,
      })
      .then(() => {
        console.log("Successfully change your action");
      });
  };

  const handleCategoryInfo = (item) => {
    console.log(item);
  };

  const handleCategoryDelete = async (item) => {
    await axios
      .post("http://localhost:3000/api/v1/category/categorydelete", {
        email: user.email,
        categoryId: item._id,
      })
      .then(() => {
        console.log("Category data successfully delete");
      });
  };

  const handlePermanentDelete = (e) => {
    console.log("Permanent Delete : ", e.target.value);
  };
  const handleCancelDelete = (e) => {
    console.log("Cancel delete : ", e.target.value);
  };
  return (
    <>
      <div className="mx-3 w-full overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-800 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Is Active
              </th>
              <th scope="col" className="px-6 py-3">
                Update/Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {showAllCategory.map((item, i) => (
              <tr key={i} className="bg-white border-b text-base text-gray-800">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4 w-2/6">{item.description}</td>
                <td className="px-6 py-4">
                  <div className="relative flex justify-start items-center h-full">
                    <div>
                      {item.isActive ? (
                        <option
                          value={true}
                          className="py-1 px-2 bg-green-800 text-white rounded-l outline-none"
                        >
                          Active
                        </option>
                      ) : (
                        <option
                          value={false}
                          className="py-1 px-2 bg-red-800 text-white rounded-l outline-none"
                        >
                          De-Active
                        </option>
                      )}
                    </div>

                    <select
                      onChange={(e) => handleActionChange(item, e)}
                      defaultValue={item.isActive}
                      className="py-1 text-white bg-sky-600 w-[22px] h-full outline-none rounded-r cursor-pointer border border-b-sky-60"
                    >
                      <option
                        value="true"
                        className="py-1 px-2 bg-green-800 text-white rounded outline-none"
                      >
                        Active
                      </option>
                      <option
                        value="false"
                        className="py-1 px-2 bg-red-800 text-white rounded outline-none"
                      >
                        De-Active
                      </option>
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleCategoryInfo(item)}
                    className="py-1 px-2 bg-green-800 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCategoryDelete(item)}
                    className="py-1 px-2 bg-red-800 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* confirmation pop up */}
      <div className="absolute w-full h-full  backdrop-blur flex justify-center items-center">
        <div className="rounded bg-gray-800 px-5 py-6 flex justify-center items-center flex-col">
          <h4 className="text-xl text-red-600">Permanent delete your data</h4>
          <div className="flex gap-8 mt-5">
            <button
              onClick={handlePermanentDelete}
              className="px-4 py-1 text-white bg-red-600 rounded"
            >
              Yes
            </button>
            <button
              onClick={handleCancelDelete}
              className="px-4 py-1 text-white bg-sky-600 rounded"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategory;
