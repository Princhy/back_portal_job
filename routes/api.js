
const { signup, login } = require("../controllers/userController");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/UserValidations");


const router = require("express").Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);


module.exports = router;
