import axios from "axios";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [allProductInfo, setAllProductInfo] = useState([]);

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
      <div>
        {allProductInfo.map((item, i) => (
          <div key={i}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <img src={item.image} alt="" className="w-28 h-auto" />
            <p>{item.sellingPrice}</p>
            <p className="line-through text-red-800">{item.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllProducts;
