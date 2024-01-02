const express = require("express");
const authcontrollers = require("../controller/auth-controller");
const validate = require("../middlewares/auth-middleware");
const signUpSchema = require("../validators/auth-validators");
const router = express.Router();
const PORT = 5000;


router.route('/').get(authcontrollers.home);
router.route('/register').post(validate(signUpSchema),authcontrollers.register);
router.route('/login').post(authcontrollers.login);

module.exports = router;