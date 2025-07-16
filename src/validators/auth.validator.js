const { body } = require("express-validator");

exports.signUpValidator = [
  body("name")
    .notEmpty()
    .withMessage("El nombre no puede ir vacio")
    .isLength({ min: 6 })
    .withMessage("El nombre debe contener mas de tres caracteres "),
  body("email").isEmail().withMessage("Ingresa un email valido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener mas de seis caracteres"),
];

exports.signInValidator = [
  body("email").isEmail().withMessage("Ingresa un email valido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe contener mas de seis caracteres"),
];
