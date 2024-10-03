import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <>
      {/* component */}
      <div className="bg-gray-100 w-full h-screen flex justify-center items-center">
        <div className="bg-white p-6  w-2/5 rounded shadow  md:mx-auto">
          <svg
            x="0px"
            y="0px"
            width="80"
            height="80"
            className="text-center mx-auto"
            viewBox="0 0 48 48"
          >
            <path
              fill="#f44336"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            ></path>
            <path
              fill="#fff"
              d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
            ></path>
            <path
              fill="#fff"
              d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-red-600 font-semibold text-center">
              Payment Error!
            </h3>
            <p className="text-gray-600 my-2">
              Your payment has not been completed.
            </p>
            <p>please try again</p>
            <div className="py-10 text-center">
              <Link
                to={"/cart"}
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded shadow"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFail;
