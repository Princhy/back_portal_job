
const { signup, login  ,getUserById , } = require("../controllers/userController");
const {
  signupValidation,
  loginValidation,

} = require("../middlewares/UserValidations");


const router = require("express").Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get('/user/:id', getUserById);

module.exports = router;
