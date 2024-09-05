import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCartPlus, FaRegHeart, FaStar } from "react-icons/fa";
import Rating from "../utils/starRating";
import "./productdetails.css";

const ProductDetails = () => {
  // const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState([]);
  const [reviewRating, setReviewRating] = useState();

  // const handleRatingChange = (newRating) => {
  //   setSelectedRating(newRating);
  //   console.log(`Selected rating: ${newRating}`);
  // };

  const [product, setProduct] = useState({});
  const param = useParams();
  useEffect(() => {
    async function getProduct() {
      await axios
        .get(`http://localhost:3000/api/v1/product/singleproduct/${param.id}`)
        .then((data) => {
          setProduct(data.data.singleProduct);
          setReview(data.data.singleProduct.review);

          setReviewRating(data.data.singleProduct.review[0].review);
        })
        .catch((error) => {
          console.log("frontend params error: ", error);
        });
    }
    getProduct();
  }, []);
  console.log(reviewRating);
  return (
    <>
      <section className="py-8 bg-white md:py-16  antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full h-auto shadow"
                src={product.image}
                alt=""
              />
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                {product.name}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  ${product.sellingPrice}{" "}
                  <sub className="font-normal text-sm">taka</sub>
                </p>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    {/* <Rating
                      initialRating={selectedRating}
                      maxRating={5}
                      onChange={handleRatingChange}
                    /> */}

                    <FaStar fill="#FFA534" />
                    <FaStar fill="#FFA534" />
                    <FaStar fill="#FFA534" />
                    <FaStar fill="#FFA534" />
                    <FaStar fill="#A9A9A9" />
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 ">
                    ({reviewRating ? reviewRating : "0"}.0)
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
                  >
                    {review && review.length} Reviews
                  </a>
                </div>
              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                  href="#"
                  title=""
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-sky-800 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 gap-2"
                  role="button"
                >
                  <FaRegHeart />
                  Add to favorites
                </a>
                <Link
                  to="#"
                  title=""
                  className="bg-sky-700 text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none  flex items-center justify-center gap-2"
                  role="button"
                >
                  <FaCartPlus />
                  Add to cart
                </Link>
              </div>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              <p
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="mb-6 text-gray-500"
              ></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
