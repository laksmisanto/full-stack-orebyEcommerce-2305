import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillWarning } from "react-icons/ai";

const AllUser = () => {
  const [userList, setUserList] = useState([]);
  const [userEditModel, setUserEditModel] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateRole, setUpdateRole] = useState("");
  const [deleteModel, setDeleteModel] = useState(false);

  const [userId, setUserId] = useState("");

  async function Allusers() {
    await axios
      .get("http://localhost:3000/api/v1/auth/userlist")
      .then((data) => {
        setUserList(data.data);
      });
  }

  useEffect(() => {
    Allusers();
  }, [userList]);

  //Opening model button onClick function
  const handleEditUser = (item) => {
    setUserEditModel(true);
    setUpdateId(item._id);
    setUpdateName(item.name);
    setUpdateEmail(item.email);
    setUpdateRole(item.role);
  };

  // finally update user onClick function
  let handleUpdateUserInfoSubmit = () => {
    axios
      .post("http://localhost:3000/api/v1/auth/userupdate", {
        _id: updateId,
        name: updateName,
        email: updateEmail,
        role: updateRole,
      })
      .then(() => {
        setUserEditModel(false);
      });
  };

  const handleDeleteUser = async (id) => {
    setUserId(id);
    setDeleteModel(true);
  };

  const handlePermanentDelete = async () => {
    await axios
      .post("http://localhost:3000/api/v1/auth/userdelete", {
        _id: userId,
      })
      .then(() => {
        console.log("Successfully Delete User");
        setDeleteModel(false);
      });
  };
  const handleCancelDelete = () => {
    setDeleteModel(false);
  };

  return (
    <>
      <div className="mx-3 w-full overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-800 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Update/Delete
              </th>
            </tr>
          </thead>
          {userList.map((item, i) => (
            <tbody key={i}>
              <tr className="bg-white border-b text-base text-gray-800">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEditUser(item)}
                    className="py-1 px-2 bg-green-800 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(item._id)}
                    className="py-1 px-2 bg-red-800 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {userEditModel && (
        <div className="absolute z-50 w-full h-full flex justify-center items-center  backdrop-blur">
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  User Data Update
                </h3>
                <button
                  onClick={() => setUserEditModel(false)}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setUpdateName(e.target.value)}
                    name="name"
                    value={updateName}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="name"
                    required=""
                  />
                </div>
                <div className="my-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {/* You can not update email */}
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setUpdateEmail(e.target.value)}
                    name="email"
                    value={updateEmail}
                    id="email"
                    // disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="name"
                    required=""
                  />
                </div>
                <div className="my-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Role
                  </label>
                  <select
                    defaultValue={updateRole}
                    onChange={(e) => setUpdateRole(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="merchant">Merchant</option>
                  </select>
                </div>
                <button
                  type="submit"
                  onClick={handleUpdateUserInfoSubmit}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 outline-none"
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* confirmation popup delete model */}
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

export default AllUser;
