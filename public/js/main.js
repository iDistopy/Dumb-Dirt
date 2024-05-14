// Lado del cliente
async function mostrarPlantas() {
        try {
                const plantas = await obtenerPlantas();
                const plantasContainer = document.getElementById('plantasContainer');
                plantasContainer.innerHTML = '';

                plantas.forEach((planta, index) => {
                        if (index < 8) {
                                const plantaElement = document.createElement('div');
                                plantaElement.classList.add('planta');
                                plantaElement.innerHTML = generarPlantaHTML(planta);
                                plantasContainer.appendChild(plantaElement);
                        }
                });

                // if (plantas.length > 8) {
                //         const loadMoreButton = document.getElementById('loadMoreButton');
                //         loadMoreButton.addEventListener('click', () => {
                //                 mostrarPlantas();

                //         });
                //         plantasContainer.appendChild(loadMoreButton);
                // }
        } catch (error) {
                console.error(error);
        }
}

async function actualizarPlantas(searchValue) {
        const plantasContainer = document.getElementById('plantasContainer');
        const plantasActuales = plantasContainer.querySelectorAll('.planta');

        // Eliminar todas las plantas actuales
        plantasActuales.forEach((planta) => {
                planta.remove();
        });

        // Obtener las nuevas plantas de la búsqueda
        const plantas = await buscarPlantas(searchValue);
        const plantasArray = Array.isArray(plantas) ? plantas : [plantas];

        plantasArray.forEach((planta) => {
                // Crear y agregar las nuevas plantas al contenedor
                const plantaElement = document.createElement('div');
                plantaElement.classList.add('planta');
                plantaElement.dataset.id = planta.id.toString();
                plantaElement.innerHTML = generarPlantaHTML(planta);
            
                // Si no tiene datos, agregar la clase 'no-data' y no agregar al contenedor
                if (planta.common_name === null) {
                    plantaElement.querySelector('.planta-name').classList.add('no-data');
                } else if (planta.scientific_name === null) {
                    plantaElement.querySelector('.planta-scientific').classList.add('no-data');
                } else if (planta.image_url === null) {
                    plantaElement.querySelector('.planta-image').classList.add('no-data');
                } else {
                    plantasContainer.appendChild(plantaElement);
                }
            });
}

// Llamado a la API - Obtiene las plantas
async function obtenerPlantas() {
        const response = await fetch('/api/plantas');
        const data = await response.json();
        console.log(data);

        return data;
}

// Llamado a la API - Busca plantas
async function buscarPlantas(searchValue) {
        const response = await fetch(`/api/search?inputString=${searchValue}`);
        const data = await response.json();
        console.log(data)

        // Verificar si data es un array, de lo contrario, devolver un array vacío
        return data;
}


// Modal de búsqueda de productos
function searchModal() {
        var myModal = new bootstrap.Modal(document.getElementById('searchModal'));
        myModal.show();
        console.log("Modal Abierto");
}

// Solo para pruebas de integración
function testAlert() {
        alert("Alerta de Prueba!");
}

// HTML de la planta
function generarPlantaHTML(planta) {
        return `
            <div class="planta-container">
                <img src="${planta.image_url}" alt="${planta.common_name}" class="planta-image">
                <div class="planta-info">
                    <h5 id="planta-nombre" class="planta-name card-title">${planta.common_name}</h5>
                    <p class="planta-scientific">${planta.scientific_name}</p>
                    <button id="btn-agregar-carrito" class="btn btn-primary">Añadir al Carrito</button>
                    <button id="seeDetails" class="btn">Ver Características</button>
                </div>
            </div>
        `;
}

// Verificar que el documento está cargado
document.addEventListener("DOMContentLoaded", function () {
        // Mostrar plantas al cargar la página
        mostrarPlantas();

        // Escuchar el clic en el botón de búsqueda
        document.getElementById('searchButton').addEventListener('click', async () => {
                const searchInput = document.getElementById('searchInput');
                await actualizarPlantas(searchInput.value.toLowerCase());
        });

        // Auto-Favicon
        var link = document.createElement('link');
        var head = document.querySelector('head');

        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '../utils/images/dumb-dirt.svg';
        head.appendChild(link);

        // Login y Registro
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        const pathName = window.location.pathname;

        // Verificar si estamos en la página de login
        if (pathName === '/login') {

                // Código para la página de login
                signUpButton.addEventListener('click', () => {
                        container.classList.add("right-panel-active");
                        document.title = "Registrarse • Dumb Dirt";
                });

                signInButton.addEventListener('click', () => {
                        container.classList.remove("right-panel-active");
                        document.title = "Iniciar Sesión • Dumb Dirt";
                });
        }
});