

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

  /* Escoger un usuario aleatorio, registrado en la base de datos para darle el premio.*/
  async function selectWinner() {
    try {
      const database = client.db('Sorteos');
      const collection = database.collection('Villa-FC');
      
      // Contar el total de documentos (participantes) y seleccionar uno al azar
      const count = await collection.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);
      const winner = await collection.find().limit(1).skip(randomIndex).next();
      
      return winner;
    } catch (error) {
      console.error('Error al seleccionar ganador:', error);
      throw error;
    }
  }

  app.get('/ganador', async (req, res) => {
    try {
      const winner = await selectWinner();
      if (winner) {
        res.status(200).json({
          message: 'Ganador seleccionado',
          ganador: {
            nombre: winner.nombre,
            apellido: winner.apellido,
            correo: winner.correo
          }
        });
      } else {
        res.status(404).json({ message: 'No se encontró ningún participante' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al seleccionar el ganador' });
    }
  });


// Iniciar el servidor y la conexión a la base de datos
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
});