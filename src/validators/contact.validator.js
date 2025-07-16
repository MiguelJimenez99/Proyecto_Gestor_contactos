const { body } = require("express-validator");

exports.validateContact = [
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("email").isEmail().withMessage("Ingrese un correo email valido"),
  body("phone").isNumeric().withMessage("Ingrese un numero valido"),
];
