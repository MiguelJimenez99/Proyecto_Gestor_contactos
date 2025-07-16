const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  favorite: { type: Boolean, default: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  datecreate: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
