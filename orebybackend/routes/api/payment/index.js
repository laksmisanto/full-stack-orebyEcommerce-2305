const express = require("express");
const route = express.Router();

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "lseco66f03d1e82843";
const store_passwd = "lseco66f03d1e82843@ssl";
const is_live = false; //true for live, false for sandbox

route.get("/init", (req, res) => {
  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: "REF123", // use unique tran_id for each api call
    success_url: "http://localhost:3000/api/v1/payment/success",
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // const paymentUrlId = GatewayPageURL.split("/");
    // const uniqId = paymentUrlId[paymentUrlId.length - 1];
    // res.status(200).send(uniqId);
    // console.log(GatewayPageURL);
    // res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
    if (GatewayPageURL) {
      // const paymentSuc = {name, address, }
    }
    res.send({ GatewayPageURL });
  });
});

route.post("/success", async (req, res) => {
  res.redirect("http://localhost:5173/success");
});

module.exports = route;
