import axios from "axios";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [allProductInfo, setAllProductInfo] = useState([]);
  let shortDes, limitDescription, shortName, limitName;

  useEffect(() => {
    async function getProductData() {
      await axios
        .get("http://localhost:3000/api/v1/product/allproduct")
        .then((data) => {
          setAllProductInfo(data.data.product);
        });
    }

    getProductData();
  }, []);
  return (
    <>
      <div className="mx-3 w-full overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-800 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-4 py-3">
                Product Image
              </th>
              <th scope="col" className="px-4 py-3">
                Product Name
              </th>
              <th scope="col" className="px-4 py-3">
                Product Description
              </th>
              <th scope="col" className="px-4 py-3">
                Selling Price
              </th>
              <th scope="col" className="px-4 py-3">
                Price
              </th>
              <th scope="col" className="px-4 py-3">
                Update/Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {allProductInfo.map(
              (item, i) => (
                (shortDes = item.description),
                (limitDescription = shortDes.slice(0, 50)),
                (shortName = item.name),
                (limitName = shortName.slice(0, 40)),
                (
                  <tr
                    key={i}
                    className="bg-white border-b text-base text-gray-800"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={item.image}
                        alt="Product Image"
                        className="max-w-16 h-auto"
                      />
                    </td>
                    <td className="px-4 py-2">{limitName + "..."}</td>
                    <td className="px-4 py-2 ">
                      <div
                        className="text-gray-800"
                        dangerouslySetInnerHTML={{
                          __html: limitDescription + "...",
                        }}
                      />
                    </td>
                    <td className="px-4 py-2">{item.sellingPrice}</td>
                    <td className="px-4 py-2">{item.price}</td>
                    <td colSpan={2} className="px-6 py-2 gap-2">
                      <table cellPadding={4}>
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
                      </table>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProducts;
