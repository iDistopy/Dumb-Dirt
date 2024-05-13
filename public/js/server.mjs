import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

// Puerto a ejecutar el servidor
const PORT = 3000;

// Obtiene el directorio actual
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());

// Configura el directorio para archivos estáticos
app.use('/css', express.static(path.join('css')));
app.use('/js', express.static(path.join('js')));
app.use('/utils', express.static(path.join('utils')));
app.use('/home', express.static(path.join('home')));

// Define la ruta base para la carpeta /home/
app.get('/inicio', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'home', 'inicio.html'));
});


// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});