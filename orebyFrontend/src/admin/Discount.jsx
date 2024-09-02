import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Discount = () => {
  let [allCategory, setAllcategory] = useState([]);
  let [categoryValue, setCategoryValue] = useState("");
  let [discountAmount, setDiscountAmount] = useState("");
  let [allDiscount, setAllDiscount] = useState([]);
  let [loading, setLoading] = useState(false);
  let user = useSelector((data) => data.userInfo.value);

  useEffect(() => {
    async function getCategory() {
      await axios
        .get("http://localhost:3000/api/v1/category/allcategory")
        .then((data) => {
          setAllcategory(data.data.category);
        });
    }
    getCategory();
  }, []);

  let handleSubmitDiscountAmount = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:3000/api/v1/discount/creatediscount", {
        amount: discountAmount,
        categoryId: categoryValue,
        userId: user._id,
      })
      .then(() => {
        setLoading(false);
        console.log("submit discount amount data");
      });
  };

  useEffect(() => {
    async function getDiscount() {
      await axios
        .get("http://localhost:3000/api/v1/discount/alldiscount")
        .then((data) => {
          setAllDiscount(data.data.discount);
        });
    }
    getDiscount();
  }, [allDiscount]);

  return (
    <>
      <div className="w-full">
        {/* create store field and header files */}
        <div className="bg-gray-200 w-full block pt-4 pb-6 px-4 shadow-lg">
          <h2 className="font-semibold text-2xl text-gray-800 pb-2 mb-4">
            Create discount for your category
          </h2>
          <div className="w-80">
            <div className="mb-5">
              <label className="block mb-2 text-md font-medium text-gray-900">
                Category
              </label>
              <select
                onChange={(e) => setCategoryValue(e.target.value)}
                name="category"
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              >
                <option>select category</option>
                {allCategory.map((item, i) => (
                  <option key={i} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-md font-medium text-gray-900">
                Discount amount
              </label>
              <input
                onChange={(e) => setDiscountAmount(e.target.value)}
                type="number"
                name="discount"
                id="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                placeholder="Discount price"
              />
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
                onClick={handleSubmitDiscountAmount}
                className="bg-sky-700 text-white px-10 py-2 border border-sky-700 rounded"
              >
                Add
              </button>
            )}
          </div>
        </div>

        {/* Show All Store Data  */}
        <div className="w-full px-4 mt-10">
          <div>
            <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-800 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allDiscount.map((item, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b text-base text-gray-800"
                  >
                    <td className="px-6 py-2">{item.categoryName}</td>
                    <td className="px-6 py-2">
                      <span>$</span>
                      {item.amount}
                    </td>
                    <td colSpan={2} className="px-6 py-2 gap-2">
                      <table cellPadding={4}>
                        <tbody>
                          <tr>
                            <td>
                              <button className="py-1 px-2  bg-green-800 text-white rounded">
                                Edit
                              </button>
                            </td>
                            <td>
                              <button className="py-1 px-2 bg-red-800 text-white rounded">
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discount;
