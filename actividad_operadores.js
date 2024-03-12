const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://elipeforero21:elipeforero21@cluster0.laag0sa.mongodb.net/"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error de conexión"));

db.once("open", function () {
  console.log("conexión exitosa a MongoDB"); // Una vez que la conexión está abierta, registra un mensaje de éxito

  const Schema = mongoose.Schema({
    nombres: String,
    apellidos: String,
    correo: String,
    salario: Number,
  });

  const operadores = mongoose.model("operadoresmongodbs", Schema);

  const app = express();
  app.use(express.json());

  // 1. Obtener todos los usuarios que sean mayores de 18 años.
  app.get("/api/mayoresa18", async (req, res) => {
    const listar = await operadores.find({ edad: { $gt: 18 } });
    res.json(listar);
  });

  // 2. Obtener todos los usuarios que sean de Londres o de París.
  app.get("/api/londresoparis", async (req, res) => {
    const listar = await operadores.find({
      pais: { $in: ["Reino Unido", "París"] },
    });
    //como no hay ni en londres en paris filtre por reino unido
    res.json(listar);
  });

  // 3. Obtener a todos los usuarios que ganen más de $2000 al mes y tengan menos de 30 años.
app.get('/api/salariomayor2000ymenor30', async (req, res) => {
    const listar = await operadores.find({
        salario: {$gt: 2000},
        edad: {$lt: 30}})
        res.json(listar);
});


  // 4. Obtener a todos los usuarios que sean de España y ganen más de $3000 al mes.
  app.get("/api/espanasalario", async (req, res) => {
    const listar = await operadores.find({
      país: "España",
      salario: { $gt: 3000 },
    });
    res.json(listar);
  });

  // 5. Obtener todos los usuarios que tengan entre 25 y 35 años.
  app.get("/api/entre25y35", async (req, res) => {
    const listar = await operadores.find({ edad: { $gte: 25, $lte: 35 } });
    res.json(listar);
  });

  // 6. Obtener a todos los usuarios que no sean de Estados Unidos.
  app.get("/api/noestadosunidos", async (req, res) => {
    const listar = await operadores.find({ país: { $ne: "Estados Unidos" } });
    res.json(listar);
  });

  // 7. Obtener a todos los usuarios que sean de Londres y que ganen más de $2500 o que tengan más de 30 años.
  app.get("/api/londresaltossalario", async (req, res) => {
    const listar = await operadores.find({
      ciudad: "Londres",
      $or: [{ salario: { $gt: 2500 } }, { edad: { $gt: 30 } }],
    });
    res.json(listar);
  });

  // 8. Obtener a todos los usuarios que sean de Australia y tengan un peso mayor a 140 libras.
  app.get("/api/australiapeso", async (req, res) => {
    const listar = await operadores.find({
      país: "Australia",
      peso: { $gt: 140 },
    });
    res.json(listar);
  });

  // 9. Obtener a todos los usuarios que no sean de Londres ni de París.
  app.get("/api/nolondresparis", async (req, res) => {
    const listar = await operadores.find({
      ciudad: { $nin: ["Londres", "París"] },
    });
    res.json(listar);
  });

  // 10. Obtener a todos los usuarios que ganen menos de $2000 al mes o que tengan más de 40 años.
  app.get("/api/salariomayor40", async (req, res) => {
    const listar = await operadores.find({
      $or: [{ salario: { $lt: 2000 } }, { edad: { $gt: 40 } }],
    });
    res.json(listar);
  });

  // 11. Obtener a todos los usuarios que sean de Canadá y ganen más de $4000 al mes o que tengan una altura mayor a 180 cm.
  app.get("/api/canadaltossalario", async (req, res) => {
    const listar = await operadores.find({
      país: "Canadá",
      $or: [{ salario: { $gt: 4000 } }, { altura: { $gt: 180 } }],
    });
    res.json(listar);
  });

  // 12. Obtener todos los usuarios que sean de Italia y tengan entre 20 y 30 años.
  app.get("/api/italia20a30", async (req, res) => {
    const listar = await operadores.find({
      país: "Italia",
      edad: { $gte: 20, $lte: 30 },
    });
    res.json(listar);
  });

  // 13. Obtener todos los usuarios que no tengan un correo electrónico registrado.
  app.get("/api/sincorreo", async (req, res) => {
    const listar = await operadores.find({ correo: { $exists: false } });
    res.json(listar);
  });

  // 14. Obtener todos los usuarios que sean de Francia y que su salario esté entre $3000 y $5000 al mes.
  app.get("/api/francia3000a5000", async (req, res) => {
    const listar = await operadores.find({
      país: "Francia",
      salario: { $gte: 3000, $lte: 5000 },
    });
    res.json(listar);
  });

  // 15. Obtener todos los usuarios que sean de Brasil y que tengan un peso menor a 120 libras o más de 140 libras.
  app.get("/api/brasilpeso", async (req, res) => {
    const listar = await operadores.find({
      país: "Brasil",
      $or: [{ peso: { $lt: 120 } }, { peso: { $gt: 140 } }],
    });
    res.json(listar);
  });

  // 16. Obtener todos los usuarios que sean de Argentina o de Chile y que tengan una edad menor a 25 años.
  app.get("/api/argentinachilemenor25", async (req, res) => {
    const listar = await operadores.find({
      $or: [{ país: "Argentina" }, { país: "Chile" }],
      edad: { $lt: 25 },
    });
    res.json(listar);
  });

  // 17. Obtener a todos los usuarios que no sean de España ni de México y que ganen menos de $3000 al mes.
  app.get("/api/noespanamexico3000", async (req, res) => {
    const listar = await operadores.find({
      país: { $nin: ["España", "México"] },
      salario: { $lt: 3000 },
    });
    res.json(listar);
  });

  // 18. Obtener todos los usuarios que sean de Alemania y que tengan un salario menor a $4000 o una edad mayor a 35 años.
  app.get("/api/alemania4000", async (req, res) => {
    const listar = await operadores.find({
      país: "Alemania",
      $or: [{ salario: { $lt: 4000 } }, { edad: { $gt: 35 } }],
    });
    res.json(listar);
  });

  // 19. Obtener todos los usuarios que no sean de Colombia y que su altura sea menor a 170 cm.
  app.get("/api/nocolombiaaltura", async (req, res) => {
    const listar = await operadores.find({
      país: { $ne: "Colombia" },
      altura: { $lt: 170 },
    });
    res.json(listar);
  });

  // 20. Obtener todos los usuarios que sean de India y que no tengan un salario registrado.
  app.get("/api/indiasinsalario", async (req, res) => {
    const listar = await operadores.find({
      país: "India",
      salario: { $exists: false },
    });
    res.json(listar);
  });

  //servidor localhost
  app.listen(3000, function () {
    console.log("server arriba");
  });
});

