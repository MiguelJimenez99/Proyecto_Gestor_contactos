const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const {
  getContactAll,
  getContact,
  postContact,
  updateContact,
  deleteContact,
  contactFavorite,
  getContactFavorite,
} = require("../controllers/contact.controller");

const { validateContact } = require("../validators/contact.validator");
const validate = require("../middlewares/validator.middleware");
const { route } = require("./auth.routes");

router.get("/favorites", verifyToken, getContactFavorite);
router.get("/contacts", verifyToken, getContactAll);
router.get("/contact/:id", verifyToken, getContact);
router.post("/newContact", validateContact, validate, verifyToken, postContact);
router.put("/updateContact/:id", verifyToken, updateContact);
router.delete("/deleteContact/:id", verifyToken, deleteContact);
router.patch("/contactFavorite/:id", verifyToken, contactFavorite);

module.exports = router;
