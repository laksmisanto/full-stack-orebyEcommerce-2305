import axios from "axios";
import { useLocation } from "react-router-dom";

const CheckOut = () => {
  const { state } = useLocation();

  const handlePayment = () => {
    // console.log("totalPrice:", state.totalPrice);
    axios
      .get("http://localhost:3000/api/v1/payment/init")
      .then((data) => {
        const url = data.data?.GatewayPageURL;
        window.location.replace(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="font-sans bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">
              Checkout
            </h2>
          </div>
          <div className="mt-12">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">01</h3>
                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  Personal Details
                </h3>
              </div>
              <div className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First name"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last name"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Phone number"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">02</h3>
                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  Shopping Address
                </h3>
              </div>
              <div className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Street address"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Zip Code"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-4 mt-12">
              <button
                type="button"
                onClick={handlePayment}
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-sky-600 text-white rounded-md hover:bg-sky-700"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
