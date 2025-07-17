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
  getContactFavorites,
} = require("../controllers/contact.controller");

const { validateContact } = require("../validators/contact.validator");
const upload = require("../middlewares/upload.middlerware");
const validate = require("../middlewares/validator.middleware");

router.get("/favorites", verifyToken, getContactFavorites);
router.get("/contacts", verifyToken, getContactAll);
router.get("/contact/:id", verifyToken, getContact);
router.post(
  "/newContact",
  verifyToken,
  upload.single("avatar"),
  validateContact,
  validate,
  postContact
);
router.put(
  "/updateContact/:id",
  verifyToken,
  upload.single("avatar"),
  updateContact
);
router.delete("/deleteContact/:id", verifyToken, deleteContact);
router.patch("/contactFavorite/:id", verifyToken, contactFavorite);

module.exports = router;
