// Lado del servidor
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';

// Configuración
const PUERTO = 80;
const API_KEY = 'BGoua_i8_bqc9wL7JBLWEwSS_J3Pk59osoIgjRMTMPo';
const app = express();

// Inicia el servidor en el puerto especificado
app.listen(PUERTO, () => {
  console.log(`Servidor Express escuchando en el puerto ${PUERTO}`);
});

// Obtiene el directorio actual
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors());

// Configura el directorio para archivos estáticos
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));
app.use('/utils', express.static(path.join(__dirname, '..', 'utils')));
app.use('/home', express.static(path.join(__dirname, '..', 'home')));

// Define las rutas base para cada archivo HTML
app.get('/', (req, res) => {
  res.type('text/html');
  res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});
app.get('/inicio', (req, res) => {
  res.type('text/html');
  res.sendFile(path.resolve(__dirname, '..', 'home', 'inicio.html'));
});
app.get('/sucursales', (req, res) => {
  res.type('text/html');
  res.sendFile(path.resolve(__dirname, '..', 'home', 'branches.html'));
});
app.get('/login', (req, res) => {
  res.type('text/html');
  res.sendFile(path.resolve(__dirname, '..', 'home', 'secure', 'login.html'));
});

// Obtiene las plantas
app.get('/api/plantas', async (req, res) => {
  try {
    const response = await fetch(`https://trefle.io/api/v1/plants?token=${API_KEY}`);
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener las plantas' });
  }
});

// Busca plantas
app.get('/api/search', async (req, res) => {
  try {
    const { inputString } = req.query;
    const response = await fetch(`https://trefle.io/api/v1/plants/search?token=${API_KEY}&q=${inputString}`);
    const data = await response.json();
    res.json(data.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al realizar la búsqueda' });
  }
});

// Obtiene una planta específica (usualmente para mostrar detalles)
app.get('/api/plantas/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://trefle.io/api/v1/plants/${id}?token=${API_KEY}`);
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener la planta' });
  }
});