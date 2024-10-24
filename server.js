require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar JSON y CORS
app.use(express.json());
app.use(cors());

// URI desde las variables de entorno
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Conectar a la base de datos
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
}

// Agregar un participante a la base de datos
async function addParticipant(participant) {
  try {
    const database = client.db('Sorteos'); // Nombre de la base de datos
    const collection = database.collection('Villa-FC'); // Nombre de la colección
    const result = await collection.insertOne(participant);
    console.log(`Nuevo participante añadido con el id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error al añadir participante:', error);
    throw error; // Lanzar error para manejarlo más tarde
  }
}

// Ruta para recibir los datos del formulario
app.post('/participar', async (req, res) => {
  const { nombre, correo, apellido } = req.body;
  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const participant = { nombre, correo, apellido, fecha: new Date() };

  try {
    await addParticipant(participant);
    res.status(200).json({ message: 'Participación registrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar participación' });
  }
});

// Iniciar el servidor y la conexión a la base de datos
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
});
