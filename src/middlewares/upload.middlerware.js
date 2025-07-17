const chalk = require("chalk");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

//validamos el tipo de archivo permitido
const allowedTypes = ["image/jpg", "image/png", "image/jpeg"];

const filefilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = [".jpg", ".png", ".jpeg"];

  if (allowedExt.includes(ext) && allowedTypes.includes(file.mimetype)) {
    console.log(chalk.green("Archivo permitido"));
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no admitido"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

module.exports = upload;
