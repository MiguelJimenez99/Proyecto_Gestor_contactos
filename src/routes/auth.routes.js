const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../controllers/auth.controller");
const {
  signUpValidator,
  signInValidator,
} = require("../validators/auth.validator");

const validate = require("../middlewares/validator.middleware");

router.post("/signUp", signUpValidator, validate, signUp);
router.post("/signIn", signInValidator, validate, signIn);

module.exports = router;
