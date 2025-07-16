# API de Gestión de Contactos.

Una API RESTful desarrollada con Node.js y Express para gestionar una agenda personal de contactos. Incluye autenticación con JWT, validaciones, y CRUD completo para usuarios y contactos.

---

### Tecnologías Utilizadas:

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (autenticación)
- Bcrypt (encriptación de contraseñas)
- Express-validator (validación de entradas)
- Dotenv (variables de entorno)
---
### Instalación:

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura las variables de entorno en un archivo `.env`.

Ejemplo de `.env`:

```env
# MongoDB local
PUERTO=3000
URL_DATABASE=mongodb://localhost:27017/agenda
JWT_SECRET=miclavesecreta
```

Codigo para genera clave secreta

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

4. Ejecuta `npm start` para iniciar el servidor.

---
### Ejecutar la aplicacion:

### modo desarrollo

```bash
npm run dev
```

### modo produccion

```bash
npm start
```
---
### Endpoints principales:

### Autenticación:

- POST `/api/auth/signUp`: Registro de usuario.
- POST `/api/auth/signIn`: Inicio de sesión y obtener token.

### Contactos:

- GET `/api/favorites`: Obtiene los contactos favoritos.
- GET `/api/contact/:id`: Obtiene un contacto por su ID.
- GET `/api/contacts`: Obtiene todos los contactos.
- POST `/api/newContact`: Crea un nuevo contacto.
- PUT `/api/updateContact/:id`: Actualiza un contacto por su ID.
- PATCH `/api/contactFavorite/:id`: Marca un contacto como favorito.
- DELETE `/api/deleteContact/:id`: Elimina un contacto por su ID.

### Validaciones:

- Campos obligatorios: `name`, `email`, `phone`.
- El correo debe tener formato válido y ser único.
- Sólo el dueño de un contacto puede modificarlo o eliminarlo

---

### Author: 

Miguel Jimenez.
GitHub: https://github.com/MiguelJimenez99
Correo: migueljimenez1799@gmail.com