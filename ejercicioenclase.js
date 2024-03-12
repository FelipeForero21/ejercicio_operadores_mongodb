// use('diezusuarios');
// db.getCollection('diezusuarios').insertOne({
// });

// db.diezusuarios.insertMany([
//     {
//     nombres: "Felipe Forero",
//     correo: "elipeforero21@gmail.com",
//     edad: 20
//     },
//     {
//     nombres: "Julian Rodriguez",
//     correo: "juliro@hotmail.com",
//     edad: 5
//     },
//     {
//     nombres: "Camilo Atehortua",
//     correo: "camiloa598@outlook.com",
//     edad: 10
//     },
//     {
//     nombres: "Jose Paez",
//     correo: "josepa63@gmail.com",
//     edad: 25
//     },
//     {
//     nombres: "Robinson Gaviria",
//     correo: "robinhood@hotmail.com",
//     edad: 15
//     },
//     {
//     nombres: "Raul Parra",
//     correo: "rauuul22@outlook.com",
//     edad: 30
//     },
//     {
//     nombres: "Emilse Monedero",
//     correo: "emilyfd5@gmail.com"
//     },
//     {
//     nombres: "Martha Quiceno",
//     correo: "martica5646@hotmail.com",
//     edad: 20
//     },
//     {
//     nombres: "Dayana Ramirezr",
//     correo: "dayanita45@outlook.com"
//     },
//     {
//     nombres: "Luisa Perez",
//     correo: "lupe56@gmail.com",
//     edad: 20
//     }
//     ])
// Importando los módulos requeridos
const express = require("express");
const mongoose = require("mongoose");

// Conectándose a MongoDB Atlas
mongoose.connect(
  "mongodb+srv://elipeforero21:elipeforero21@cluster0.laag0sa.mongodb.net/"
);
const db = mongoose.connection;

// Manejando errores de conexión a MongoDB
db.on("error", console.error.bind(console, "error de conexión"));
db.once("open", function () {
  console.log("conexión exitosa a MongoDB"); // Una vez que la conexión está abierta, registra un mensaje de éxito

  // Definiendo el esquema del usuario
  userSchema = mongoose.Schema({
    nombre: String, // Campo para almacenar el nombre del usuario
    correo: String, // Campo para almacenar el correo electrónico del usuario
  });

  // Creando un modelo basado en el esquema definido
  const base_de_10_usuarios = mongoose.model("diezusuarios", userSchema);

  // Creando la aplicación Express
  const app = express();
  app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud entrante como JSON

  // Endpoint de la API para obtener todos los usuariosF
  app.get("/api/todos", async (req, res) => {
    // Obteniendo todos los usuarios de la colección MongoDB
    const usuarios = await base_de_10_usuarios.find();
    res.json(usuarios); // Enviando los usuarios obtenidos como respuesta JSON
    // console.log(usuarios); // Opcional: registrar los usuarios obtenidos
  });
  
  //   Se utiliza para comparar si un campo es igual a un valor específico  $eq: 30
  app.get("/api/users", async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $eq: 30 } });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para comparar si un campo no es igual a un valor específico. $ne: 20
  app.get("/api/users2", async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $ne: 20 } });
    res.json(users);
    // console.log(users);
  });

  // Se utiliza para comparar si un campo es mayor que un valor específico. $gt: 20
  app.get("/api/users3", async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $gt: 20 } });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para comparar si un campo es menor que un valor específico. $lt: 20
  app.get("/api/users4", async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $lt: 20 } });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para comparar si un campo es mayor o igual que un valor específico. $gte: 20
  app.get("/api/users5", async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $gte: 20 } });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para comparar si un campo es menor o igual que un valor específico. $lte: 20
  app.get("/api/users6", async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $lte: 20 } });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para buscar documentos donde el valor de un campo se encuentra dentro de un array de valores. $in: [5,10,15]
app.get('/api/users7', async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $in: [5, 10, 15] } });
    res.json(users);
    // console.log(users);
  });

  // Se utiliza para buscar documentos donde el valor de un campo no se encuentra dentro de un array de valores. $nin:  [5, 10, 15]
  app.get("/api/users8", async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $nin: [5, 10, 15] } });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para buscar documentos donde un campo específico existe o no existe. $exists = true
  app.get("/api/users9", async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $exists: true } });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para buscar documentos donde un campo específico no existe. $exists = false
  app.get("/api/users10", async (req, res) => {
    const users = await base_de_10_usuarios.find({ edad: { $exists: false } });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para buscar documentos donde un campo coincide con una expresión regular. $regex: /^felipe/
  app.get("/api/users11", async (req, res) => {
    const users = await base_de_10_usuarios.find({ nombres: { $regex: /^Felipe/ } });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para buscar documentos que cumplan con múltiples condiciones. $and:
  app.get("/api/users12", async (req, res) => {
    const users = await base_de_10_usuarios.find(
        {$and: [
            {edad: {$gt: 20}},
            {edad: {$lt: 30}}
        ]
    });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para buscar documentos que cumplan al menos una de varias condiciones. $or
  app.get('/api/users13', async (req, res) => {
    const users = await base_de_10_usuarios.find(
        {$or: [
            {edad: {$gt: 20}},
            {edad: {$lt: 30}}
        ]
    });
    res.json(users);
    // console.log(users);
  });

  //Se utiliza para invertir la selección de documentos basada en una condición. $not
  app.get('/api/users14', async (req, res) => {
    const users = await base_de_10_usuarios.find(
        {edad: {$not: {$gt: 30}}}
    );
    res.json(users);
});

//Se utiliza para buscar documentos que no cumplan ninguna de varias condiciones. $nor

app.get('/api/users15', async (req, res) => {
    const users = await base_de_10_usuarios.find(
        {$nor: [
            {edad: {$gt: 20}},
            {edad: {$lt: 30}}
        ]
    });
    res.json(users);
    // console.log(users);
  });

  app.listen(3000, function () {
    console.log("server arriba");
  });
});
