// Lado del servidor
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';
import fs from 'fs';
import bodyParser from 'body-parser';

// Configuración
const PUERTO = 80;
const API_KEY = 'BGoua_i8_bqc9wL7JBLWEwSS_J3Pk59osoIgjRMTMPo';
const app = express();

// APP & MIDDLEWARE
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Obtiene el directorio actual
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors());

// Configura el directorio para archivos estáticos
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));
app.use('/utils', express.static(path.join(__dirname, '..', 'utils')));
app.use('/home', express.static(path.join(__dirname, '..', 'home')));

// GET
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

// POST
app.post('/sec/register', (req, res) => {
  const { name, email, password } = req.body;
  const user = { nombre: name, correo: email, contrasena: password };

  // Leer los usuarios actuales
  const filePath = path.join(__dirname, '..', 'db', 'cuentas.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error analizando la DB local:', err);
      res.status(500).send('Error del Servidor');
      return;
    }

    let usuarios = [];
    if (data) {
      try {
        usuarios = JSON.parse(data);
      } catch (error) {
        console.error('Error analizando la DB local:', error);
        res.status(500).send('Error del Servidor');
        return;
      }
    }

    // Agregar el nuevo usuario al arreglo
    usuarios.push(user);

    // Escribir el arreglo actualizado en el archivo
    fs.writeFile(filePath, JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        console.error('Error al Registrar al Usuario:', err);
        res.status(500).send('Error del Servidor');
      } else {
        console.log('Usuario registrado:', user);
        res.redirect('/');
      }
    });
  });
});

app.post('/sec/login', async (req, res) => {
  const { email, password } = req.body;

  const filePath = path.join(__dirname, '..', 'db', 'cuentas.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error analizando la DB local:', err);
      res.status(500).send('Error del Servidor');
      return;
    }

    let usuarios = [];
    if (data) {
      try {
        usuarios = JSON.parse(data);
      } catch (error) {
        console.error('Error analizando la DB local:', error);
        res.status(500).send('Error del Servidor');
        return;
      }
    }

    const user = usuarios.find(u => u.correo === email && u.contrasena === password);
    if (user) {
      console.log('Usuario Autenticado:', user);
      res.redirect('/inicio');
    } else {
      console.log('Credenciales Incorrectas:', email);
      res.status(200).send("Credenciales Incorrectas")
    }
  });
});

app.post('/sec/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/inicio');
    }
    req.session.isAuthenticated = false;
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// Middleware para proteger rutas
// function requireAuth(req, res, next) {
//   if (req.session.isAuthenticated) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// }

// Ubicaciones protegidas
app.get('/cuenta', (req, res) => {
  res.type('text/html');
  res.sendFile(path.resolve(__dirname, '..', 'home', 'cuenta.html'));
});

////////////////////////////////////
//                                //
//       SISTEMA DE PLANTAS       //
//                                //
////////////////////////////////////

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

// Inicia el servidor en el puerto especificado
app.listen(PUERTO, () => {
  console.log(`Servidor iniciado en el puerto ${PUERTO}. Operable en http://localhost`);
});
