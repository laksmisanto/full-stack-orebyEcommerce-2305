import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCartPlus, FaStar, FaUser } from "react-icons/fa";
import { MdOutlineReviews, MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";
import Container from "../component/Container";

const ProductDetails = () => {
  const user = useSelector((data) => data.userInfo.value);
  const param = useParams();
  const [product, setProduct] = useState({});
  const [ratingModel, setRatingModel] = useState(false);
  const [ratingMessage, setRatingMessage] = useState("");
  const [showReview, setShowReview] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      await axios
        .get(`http://localhost:3000/api/v1/product/singleproduct/${param.id}`)
        .then((data) => {
          setProduct(data.data.singleProduct);
          setShowReview(data.data.singleProduct.review);
        })
        .catch((error) => {
          console.log("frontend params error: ", error);
        });
    }
    getProduct();
  }, []);

  let revArr = [];
  showReview.map(({ review }) => {
    revArr.push(review);
  });
  let sum = revArr.reduce((acc, rating) => acc + rating, 0);
  let average = sum / revArr.length;

  const handleRating = (value) => {
    setRating(value);
  };
  const handleHoverRating = (value) => {
    setHoverRating(value);
  };

  const handleReviewSubmit = async () => {
    await axios
      .post("http://localhost:3000/api/v1/review/submitreview", {
        review: rating,
        message: ratingMessage,
        product: product._id,
        reviewBy: user._id,
      })
      .then(() => {
        console.log("Review Submit");
        setRatingModel(false);
      })
      .catch((error) => {
        console.log("review submit error: ", error);
      });
  };

  const handleCart = async () => {
    await axios
      .post("http://localhost:3000/api/v1/cart/addcart", {
        productId: param.id,
        ownerId: user._id,
        quantity: 1,
      })
      .then(() => {
        navigate("/cart");
      });
  };

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
                  ${product.sellingPrice}
                  <sub className="font-normal text-sm">taka</sub>
                </p>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i + 1 <= average ? "fill-orange-600" : "fill-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 ">
                    ({average ? average.toPrecision(2) : "0.0"})
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
                  >
                    {showReview && showReview.length} Reviews
                  </a>
                </div>
              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  onClick={handleCart}
                  className="bg-sky-700 text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none  flex items-center justify-center gap-2"
                  role="button"
                >
                  <FaCartPlus size={"20px"} />
                  Add to cart
                </button>
                <button
                  onClick={() => setRatingModel(true)}
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium  focus:outline-none rounded-lg bg-sky-700 hover:bg-sky-800 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 gap-2 text-white"
                  role="button"
                >
                  <MdOutlineReviews size={"20px"} />
                  Rating & Writing
                </button>
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

      <Container className=" border-t border-gray-500">
        <h2 className="font-semibold text-xl text-gray-700 py-2 px-4 bg-gray-100">
          Ratings & Reviews of {product.name}
        </h2>
        <div className="flex justify-start items-end gap-1 mt-4 mb-2 px-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={28}
              className={`${
                i + 1 <= average ? "fill-orange-600" : "fill-gray-400"
              } `}
            />
          ))}
          <p className="text-sm font-medium leading-none text-gray-500 ">
            ({average ? average.toPrecision(2) : "0.0"})/5
          </p>
        </div>
        <p className="text-sm font-medium leading-none text-gray-500 px-4">
          {showReview && showReview.length} Reviews
        </p>

        {/* Review and Message Section */}

        {/* {showReview.map((item) => console.log(item.reviewBy.name))} */}

        <div className="px-4 mt-5  border-t border-gray-400">
          {showReview.map((item, i) => (
            <div key={i} className="border-b border-gray-400 pb-3 pt-5">
              <div className="flex">
                <div className="bg-gray-800 w-12 h-12 flex justify-center items-center rounded">
                  <FaUser fill="white" size={28} />
                </div>
                <div className="ml-4">
                  <div className="flex gap-1 justify-start items-end">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i + 1 <= item.review
                            ? "fill-orange-600"
                            : "fill-gray-400"
                        } `}
                      />
                    ))}
                    <p className="text-sm font-medium leading-none text-gray-500 ">
                      ({item.review ? item.review : "0"})/5
                    </p>
                  </div>
                  <h4>
                    <span className="font-semibold text-base text-gray-800">
                      UserId:{" "}
                    </span>{" "}
                    {item.reviewBy && item.reviewBy.name}
                  </h4>
                </div>
              </div>
              <p className="text-base text-gray-600 pt-2">
                <span className="font-semibold text-lg text-gray-800">
                  Message:{" "}
                </span>{" "}
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {ratingModel && (
        <div className="absolute w-full h-screen left-0 top-0 backdrop-blur-sm z-50">
          <button
            onClick={() => setRatingModel(false)}
            className="absolute right-10 top-10 flex justify-center items-center w-10 h-10 rounded bg-red-600"
          >
            <MdOutlineClose fill="white" size={"30px"} />
          </button>
          <div className="w-full h-full flex justify-center items-center">
            <div className="py-10 px-8 radius bg-gray-100 rounded shadow ">
              <h2 className="font-semibold text-2xl text-gray-800 mb-5">
                Rating and Writing your opinion
              </h2>
              <div className="mb-2">
                <div className="flex gap-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i + 1}
                      className={`${
                        i + 1 <= rating
                          ? "fill-orange-600"
                          : i + 1 <= hoverRating
                          ? "fill-green-600"
                          : "fill-gray-500"
                      }`}
                      onClick={() => handleRating(i + 1)}
                      onMouseOver={() => handleHoverRating(i + 1)}
                      onMouseOut={() => handleHoverRating(0)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <label className="block">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={ratingMessage}
                  onChange={(e) => setRatingMessage(e.target.value)}
                  placeholder="Write your message..."
                  className="w-full max-h-28 min-h-28  outline-none px-2 py-1 rounded"
                ></textarea>
              </div>
              <button
                onClick={handleReviewSubmit}
                className="px-5 py-2 bg-sky-700 text-white hover:bg-sky-800 transition-all ease-linear rounded"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
