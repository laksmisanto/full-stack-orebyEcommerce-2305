const express = require("express");
const {
  RegistrationController,
  LoginController,
  OtpverifyController,
  ForgetPasswordController,
  ChangepasswordController,
  UserListController,
  UserUpdateController,
  UserDeleteController,
} = require("../../../controller/authController");
const router = express.Router();

router.post("/registration", RegistrationController);
router.post("/login", LoginController);
router.post("/otpverify", OtpverifyController);
router.post("/forgetpassword", ForgetPasswordController);
router.post("/changepassword", ChangepasswordController);
router.get("/userlist", UserListController);
router.post("/userupdate", UserUpdateController);
router.post("/userdelete", UserDeleteController);
module.exports = router;
