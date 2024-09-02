import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillWarning } from "react-icons/ai";

const Store = () => {
  const user = useSelector((data) => data.userInfo.value);
  const [storeName, setStoreName] = useState("");
  const [showAllStore, setShowAllStore] = useState([]);
  const [storeId, setStoreId] = useState("");
  const [deleteModel, setDeleteModel] = useState(false);

  const handleSubmitStoreInfo = async () => {
    await axios
      .post("http://localhost:3000/api/v1/store/createstore", {
        name: storeName,
        userId: user._id,
      })
      .then(() => {
        console.log("Store created successful");
        setStoreName("");
      });
  };

  useEffect(() => {
    async function getAllStoreData() {
      await axios
        .get("http://localhost:3000/api/v1/store/allstore")
        .then((data) => {
          setShowAllStore(data.data.store);
        });
    }
    getAllStoreData();
  }, [showAllStore]);

  const handleDeleteStoreDta = (item) => {
    setStoreId(item._id);
    setDeleteModel(true);
  };
  const handlePermanentDelete = async () => {
    try {
      await axios
        .post("http://localhost:3000/api/v1/store/deletestore", {
          _id: storeId,
        })
        .then(() => {
          setDeleteModel(false);
        });
    } catch (error) {
      console.log("store data delete error :", error);
    }
  };
  const handleCancelDelete = () => {
    setDeleteModel(false);
  };

  return (
    <>
      <div className="w-full">
        {/* create store field and header files */}
        <div className="bg-gray-200 w-full pt-4 pb-6 px-4 fixed shadow-lg">
          <h2 className="font-semibold text-2xl text-gray-800 pb-2 mb-4">
            Create Store
          </h2>
          <div>
            <input
              onChange={(e) => setStoreName(e.target.value)}
              value={storeName}
              type="text"
              name="store"
              id="store"
              className="border border-gray-400 rounded-l outline-none px-2 py-1"
              placeholder="store name"
            />
            <button
              onClick={handleSubmitStoreInfo}
              className="bg-sky-700 text-white px-3 py-1 border border-sky-700 rounded-r"
            >
              Add
            </button>
          </div>
        </div>

        {/* Show All Store Data  */}
        <div className="w-full px-4 mt-36">
          <div>
            <table className="w-1/3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-800 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Store Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Store Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {showAllStore.map((item, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b text-base text-gray-800"
                  >
                    <td className="px-6 py-2">{item.name}</td>
                    <td className="px-6 py-2 flex gap-3">
                      <button className="py-1 px-2 bg-green-800 text-white rounded">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStoreDta(item)}
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
        </div>
      </div>

      {/* confirmation pop up */}
      {deleteModel && (
        <div className="absolute w-full h-full  backdrop-blur-sm flex justify-center items-center">
          <div className="rounded bg-gray-800 px-5 py-6 shadow ">
            <div className="flex justify-start items-start border-b border-gray-600 pb-2">
              <AiFillWarning size={28} color="#DC143C" />
              <span className="text-lg pl-2 font-semibold text-red-600">
                Delete Category?
              </span>
            </div>
            <div className="pt-2">
              <p className="text-base text-gray-400">
                Are you sure you want to delete this category?
              </p>
              <div className="mt-5 text-center">
                <button
                  onClick={handlePermanentDelete}
                  className="mr-10 px-4 py-1 text-white bg-red-600 rounded"
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
        </div>
      )}
    </>
  );
};

export default Store;
