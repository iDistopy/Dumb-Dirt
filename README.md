<h1><img src="https://i.imgur.com/HHrWPSf.png" alt="Dumb Dirt Logo" width="35"> Dumb Dirt</h1>
Dumb Dirt es una página web enfocada en la venta y distribución de diversos tipos de plantas y árboles pequeños. Nuestro objetivo es acercar la naturaleza a los hogares y espacios de nuestros clientes, ofreciendo una amplia variedad de especies y brindando información y consejos para su cuidado

## Requisitos
- [node.js](https://nodejs.org/en/download)
- [npm](https://nodejs.org/en/download)
- [git](https://git-scm.com/download/win)
- nodemon _(opcional)_

## Instalación
- Clonar el Proyecto
```text
git clone https://github.com/iDistopy/Dumb-Dirt.git
```
- Ingresar al Proyecto
```text
cd Dumb-Dirt
```
- Instalar Dependencias
```text
npm -i install
```
- Iniciar el Servidor
```text
node --experimental-modules .\public\js\server.mjs
```
Listo! Servidor iniciado en http://127.0.0.1:3000/home/inicio

## Importante
- De querer modificar el puerto de inicio, se deberá ingresar a `./public/js/server.mjs` y modificar la variable **PUERTO** por la de preferencia.
- Si quieres mantener el servidor iniciado siempre, escuchando cambios dentro del proyecto, deberás utilizar **nodemon**
```text
nodemon --experimental-modules .\public\js\server.mjs
```
## Autores
- Esteban Guerra
- Carlos Diaz
