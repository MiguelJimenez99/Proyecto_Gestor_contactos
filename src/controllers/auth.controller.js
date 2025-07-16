const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

//controlador para crear un nuevo registro de usuario
exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Todos los datos son requeridos",
      });
    }

    //verificamos si el email esta registrado
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: "El email ya se encuentra registrado",
      });
    }

    //encriptamos la contraseña
    const encryptPassword = await bcrypt.hash(password, 10);

    // si todo esta correcto registramos el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: encryptPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

//controlador para inicar sesion
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //verificamos que los campos no vayan vacios
    if (!email || !password) {
      return res.status(400).json({
        message: "Por favor, ingrese su email y contraseña",
      });
    }

    //verificamos que el usuario exista
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Error al iniciar sesion, usuario no encontrado",
      });
    }

    //comparamos contraseñas
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(403).json({
        message: "Error contraseña incorrecta",
      });
    }

    //si todo esta correcto creamos el token
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "inicio de sesion exitoso",
      token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};
