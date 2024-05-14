import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import { log } from 'console';

// Puerto a ejecutar el servidor
const PORT = 3000;

// Obtiene el directorio actual
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());

// Configura el directorio para archivos estáticos
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));
app.use('/utils', express.static(path.join(__dirname, '..', 'utils')));
app.use('/home', express.static(path.join(__dirname, '..', 'home')));

console.log(path.join(__dirname, '..', 'css'))
console.log('-------------------')
console.log(path.join(__dirname, '..', 'js'))

// Define la ruta base para la carpeta /home/
app.get('/inicio', (req, res) => {
  res.type('text/html');
  res.sendFile(path.resolve(__dirname, '..', 'home', 'inicio.html'));
});


// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});