import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Discount = () => {
  let [allCategory, setAllcategory] = useState([]);
  let [categoryValue, setCategoryValue] = useState("");
  let [discountAmount, setDiscountAmount] = useState("");
  let [allDiscount, setAllDiscount] = useState([]);
  let user = useSelector((data) => data.userInfo.value);
  let category;

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
    await axios
      .post("http://localhost:3000/api/v1/discount/creatediscount", {
        amount: discountAmount,
        categoryId: categoryValue,
        userId: user._id,
      })
      .then(() => {
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
            <button
              onClick={handleSubmitDiscountAmount}
              className="bg-sky-700 text-white px-10 py-2 border border-sky-700 rounded"
            >
              Add
            </button>
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
                {allDiscount.map(
                  (item, i) => (
                    (category = item.categoryId),
                    (
                      <tr
                        key={i}
                        className="bg-white border-b text-base text-gray-800"
                      >
                        <td className="px-6 py-2">
                          {category.slice(0, 10)}...
                        </td>
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
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discount;
