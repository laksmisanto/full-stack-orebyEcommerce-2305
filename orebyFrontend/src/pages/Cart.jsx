import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAdd, MdOutlineClose } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { FaRegHeart, FaLongArrowAltRight } from "react-icons/fa";
import { BsEmojiFrownFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const [allCartProducts, setAllCartProducts] = useState([]);

  const userId = useSelector((data) => data.userInfo.value._id);

  useEffect(() => {
    async function getCartProduct() {
      await axios
        .get(`http://localhost:3000/api/v1/cart/allcart/${userId}`)
        .then((data) => {
          setAllCartProducts(data.data?.allCartProduct);
          console.log(data.data);
        })
        .catch((error) => {
          console.log("get quantity error: ", error);
        });
    }
    getCartProduct();
  }, []);

  let totalPrice = allCartProducts.reduce(
    (prev, curr) => curr.productId.sellingPrice * curr.quantity + prev,
    0
  );

  const handleIncrement = async (item) => {
    await axios
      .post("http://localhost:3000/api/v1/cart/quantityupdate?increment=inc", {
        productId: item.productId._id,
      })
      .then(() => {
        console.log("quantity is update");
      });
  };

  const handleDecrement = async (item) => {
    await axios
      .post("http://localhost:3000/api/v1/cart/quantityupdate?decrement=dec", {
        productId: item.productId._id,
      })
      .then(() => {
        console.log("quantity is update");
      });
  };

  console.log(allCartProducts);

  const handleCartProductDelete = async (item) => {
    await axios
      .post("http://localhost:3000/api/v1/cart/cartproductdelete", {
        id: item._id,
      })
      .then(() => {
        console.log("cart product delete successful");
      });
  };

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
          Shopping Cart
        </h2>
        {allCartProducts.length > 0 ? (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none  lg:max-w-2xl xl:max-w-4xl">
              {allCartProducts.map((item, i) => (
                <div key={i} className="space-y-6 mb-6 ">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <img
                        className="h-20 w-auto"
                        src={item.productId.image}
                        alt="image"
                      />

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          {item.quantity > 1 ? (
                            <button
                              onClick={() => handleDecrement(item)}
                              type="button"
                              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-300 hover:bg-gray-400 focus:outline-none  focus:ring-2 focus:ring-gray-400"
                            >
                              <AiOutlineMinus />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="disabled inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-300 hover:bg-gray-400 focus:outline-none  focus:ring-2 focus:ring-red-400"
                            >
                              <AiOutlineMinus />
                            </button>
                          )}
                          <div>
                            <span className="mx-2 text-gray-700">
                              {item.quantity}
                            </span>
                          </div>
                          <button
                            onClick={() => handleIncrement(item)}
                            type="button"
                            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-300 hover:bg-gray-400 focus:outline-none  focus:ring-2 focus:ring-gray-400"
                          >
                            <MdOutlineAdd />
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 ">
                            $ {item.productId.sellingPrice}
                          </p>
                        </div>
                      </div>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <p className="text-base font-medium text-gray-600">
                          {item.productId.name}
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                          >
                            <FaRegHeart />
                            Add to Favorites
                          </button>
                          <button
                            onClick={() => handleCartProductDelete(item)}
                            type="button"
                            className="inline-flex items-center text-sm gap-1 font-medium text-red-600 hover:underline "
                          >
                            <MdOutlineClose size={20} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm   sm:p-6">
                <p className="text-xl font-semibold text-gray-900 ">
                  Order summary
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 d">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        ${totalPrice}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        -$00.00
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        $00
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        $000
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <dt className="text-base font-bold text-gray-900 ">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 ">
                      ${totalPrice}
                    </dd>
                  </dl>
                </div>
                <Link
                  to={"/checkout"}
                  state={{ totalPrice: totalPrice }}
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium bg-sky-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-sky-700 hover:bg-sky-700"
                >
                  Proceed to Checkout
                </Link>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 ">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to={"/products"}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline "
                  >
                    Continue Shopping
                    <FaLongArrowAltRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center my-10 mx-auto">
            <div className="flex justify-center gap-2 mb-5">
              <BsEmojiFrownFill size={48} fill="#821131" className="mt-4" />
              <BsEmojiFrownFill size={48} fill="#B8001F" />
              <BsEmojiFrownFill size={48} fill="#821131" className="mt-4" />
            </div>
            <h2 className="font-bold text-2xl text-red-600">
              You have not added any products
            </h2>
            <p className="text-base text-gray-600">Please add product</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
