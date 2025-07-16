const Contact = require("../models/contact.model");
const User = require("../models/user.model");

//controlador para listar los contactos del usuario
exports.getContactAll = async (req, res) => {
  try {
    const userId = req.userId;
    const contacts = await Contact.find({ userId });

    //verificamos si hay contactos guardados por el usuario
    if (contacts == "" || contacts.length == 0) {
      return res.status(404).json({
        message: "No tienes contactos registrados",
        data: [],
      });
    }

    res.status(200).json({
      message: "Contactos",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

//controlador para mostrar un solo contacto
exports.getContact = async (req, res) => {
  try {
    const userId = req.userId;
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(400).json({
        message: "Contacto no encontrado",
      });
    }

    //validamos que el userId sea el mismo en el modelo del contacto y
    // el que obtenemos al iniciar sesion
    if (contact.userId.toString() != userId.toString()) {
      return res.status(403).json({
        message: "No tienes permisos para ver este contacto",
      });
    }

    res.status(200).json({
      message: "Detalles de contacto",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

//controlado para crear un contacto nuevo
exports.postContact = async (req, res) => {
  try {
    const IdUser = req.userId;
    const { name, email, phone } = req.body;

    //validamos que ningun campo vaya vacio
    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Todos los datos son requeridos",
      });
    }

    //validamos si el contacto existe
    const existContact = await Contact.findOne({ phone });
    if (existContact) {
      return res.status(400).json({
        message: "Ya existe un contacto registrado con ese numero",
      });
    }

    //validamos si el email ya esta registrado
    const existEmail = await Contact.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: "Ya existe un contacto con ese correo electronico",
      });
    }

    //si todo esta bien creamos el nuevo contacto
    const newContact = new Contact({
      name,
      email,
      phone,
      userId: IdUser,
    });

    await newContact.save();

    res.status(201).json({
      message: "Contacto creado correctamente",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

//controlado para editar un contacto
exports.updateContact = async (req, res) => {
  try {
    const userId = req.userId;
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);

    //verificamos que el contacto exista
    if (!contact) {
      return res.status(400).json({
        message: "Contacto no encontrado",
      });
    }

    //verificamos que sea el usuario sea el dueño del contacto
    if (contact.userId.toString() != userId.toString()) {
      return res.status(403).json({
        message: "No tienes permisos para editar este contacto",
      });
    }

    const { name, email, phone } = req.body;

    //verificamos que no se repita un numero aunque ya este registrado
    const existPhone = await Contact.findOne({
      phone,
      _id: { $ne: contactId },
    });
    if (existPhone) {
      return res.status(400).json({
        message: "Este numero de celular pertenece a otro contacto",
      });
    }

    const contactUpdate = await Contact.findByIdAndUpdate(
      contactId,
      {
        name,
        email,
        phone,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      data: contactUpdate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en la base de datos",
      error: error.message,
    });
  }
};

//controlador para eliminar un contacto
exports.deleteContact = async (req, res) => {
  try {
    const userId = req.userId;
    const contactId = req.params.id;

    //verificamos si el contacto existe
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(400).json({
        message: "Error al eliminar, contacto no encontrado",
      });
    }

    //verificamos que el userId sea del usuario que esta logueado
    if (contact.userId.toString() != userId.toString()) {
      return res.status(403).json({
        message: "Error, no tienes permisos para eliminar este contacto",
      });
    }

    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({
      message: "Contacto eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

//controlador para marcar un contacto como favorito
exports.contactFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(400).json({
        message: "Error,contacto no encontrado ",
      });
    }

    contact.favorite = !contact.favorite;

    await contact.save();

    res.status(200).json({
      message: "Contacto marcado como favorito",
      favorite: contact.favorite,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

//controlador para filtrar los usuarios favoritos.
exports.getContactFavorite = async (req, res, next) => {
  try {
    const userId = req.userId;

    const contact = await Contact.find({ favorite: true });

    if (contact == "" || contact.length == 0) {
      const error = new Error("No tienes contactos favoritos");
      error.statusCode = 400;
      return next(error);
    }

    // if (contact.userId.toString() != userId.toString()) {
    //   return res.status(403).json({
    //     message: "No tienes permisos para realizar esta accion",
    //   });
    // }

    res.status(200).json({
      message: "Tus favoritos",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro en el servidor",
      error: error.message,
    });
  }
};
