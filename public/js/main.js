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

async function actualizarPlantas(params) {
        const plantasContainer = document.getElementById('plantasContainer');
        const plantasActuales = plantasContainer.querySelectorAll('.planta');

        // Eliminar todas las plantas actuales
        plantasActuales.forEach((planta) => {
                planta.remove();
        });

        // Obtener las nuevas plantas de la búsqueda
        const plantas = await buscarPlantas(params);
        const plantasArray = Array.isArray(plantas) ? plantas : [plantas];
        const plantasIds = new Set();

        plantasArray.forEach((planta) => {
                // Checar si la planta ya existe en el contenedor
                if (plantasIds.has(planta.id)) {
                        return; // Ignorar la planta repetida
                }

                // Agregar el id de la planta al conjunto
                plantasIds.add(planta.id);

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

// Mostrar plantas aleatorias
async function plantasRandom() {
        try {
                const plantas = await obtenerPlantas();
                const plantasContainer = document.getElementById('plantasContainer');
                plantasContainer.innerHTML = '';

                const plantasArray = (Math.random() > 0.5) ? plantas.slice(0, 20) : plantas.slice(0, 20);

                // Rellenar de plantas aleatorias
                plantasArray.forEach((planta) => {
                        const plantaElement = document.createElement('div');
                        plantaElement.classList.add('planta');
                        plantaElement.innerHTML = generarPlantaHTML(planta);
                        plantasContainer.appendChild(plantaElement);
                });
        } catch (error) {
                console.error(error);
        }
}

// Llamado a la API - Obtiene las plantas
async function obtenerPlantas() {
        const response = await fetch('/api/plantas');
        const data = await response.json();
        console.log(data);

        return data;
}

// Llamado a la API - Busca plantas
async function buscarPlantas(params = {}) {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`/api/search?${query}`);
        const data = await response.json();
        console.log(data);
    
        return data;
}

// Llamado a la API - Obtiene una planta específica
async function mostrarPlantaId(id) {
        const response = await fetch(`/api/plantas/id/${id}`);
        const data = await response.json();
        console.log(response);
        console.log(data);
        
        return data;
}

// Modal de búsqueda de productos
function searchModal() {
        var myModal = new bootstrap.Modal(document.getElementById('searchModal'));
        myModal.show();
        document.querySelector('.modal-backdrop').remove();
        
        console.log("Modal Abierto");
}

function modalPlanta(planta) {
        const modalContent = generarModalHTML(planta);
      
        // Crea un div para el modal y agrega el contenido
        const modalDiv = document.createElement('div');
        modalDiv.classList.add('modal');
        modalDiv.innerHTML = modalContent;
      
        // Agrega el modal al body
        document.body.appendChild(modalDiv);
      
        // Muestra el modal
        const myModal = new bootstrap.Modal(modalDiv);
        myModal.show();
}

// Solo para pruebas de integración
function testAlert() {
        alert("Alerta de Prueba!");
}

// HTML de la planta
function generarPlantaHTML(planta, index) {
        return `
            <div class="planta-container" data-id="${planta.id}">
                <img id="planta-image-${index}" src="${planta.image_url}" alt="${planta.common_name}" class="planta-image">
                <div class="planta-info">
                    <h5 id="planta-nombre-${index}" class="planta-name card-title">${planta.common_name}</h5>
                    <p class="planta-scientific">${planta.scientific_name}</p>
                </div>
            </div>
        `;
}
function generarModalHTML(planta) {
        return `
        <div class="modal__scroll-area">
            <header class="modal__header">
                <div class="card__background">
                    <img src="https://source.unsplash.com/random" alt="Imagen de la planta">
                </div>
                <div class="card__category">
                    consulta
                </div>
                <h1 class="card__title">Potito Negro</h1>
                <div class="card__duration">
                    Duración: 2 añitos
                </div>
            </header>
            <main class="modal__content">
                <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </p>
            </main>
        </div>      
        `;
}

// Al cargar la página
window.addEventListener("load", (event) => {
        let logo = document.getElementById('pageLogo');
        
        function logoAnimation() {
                logo.style.transition = "all 0.3s";
                logo.style.transform = "scale(1.1)";
                setTimeout(() => {
                        logo.style.transition = "all 0.3s";
                        logo.style.transform = "scale(1.0)";
                }, 500);
        }
    
        let intevarlo = setInterval(logoAnimation, 1000);
        setTimeout(() => {
            clearInterval(intevarlo);
        }, 9000);
});

// Verificar que el documento está cargado
document.addEventListener("DOMContentLoaded", function () {
        // Auto-Favicon
        var link = document.createElement('link');
        var head = document.querySelector('head');

        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '../utils/images/dumb-dirt.svg';
        head.appendChild(link);

        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        const pathName = window.location.pathname;

        // Mostrar plantas al cargar la página
        if (pathName === '/inicio') {
                plantasRandom();
        }

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

        // Obtener todos los contenedores de planta
        document.getElementById('plantasContainer').addEventListener('click', async (event) => {
                        const plantaContainer = event.target.closest('.planta-container');
                        if (plantaContainer) {
                        const plantaId = plantaContainer.dataset.id;
                        console.log("ID de la planta seleccionada:", plantaId);
                
                        // Realiza la acción deseada con la ID de la planta
                        // Por ejemplo, mostrar detalles de la planta en un modal
                        const planta = await mostrarPlantaId(plantaId);
                        modalPlanta(planta);
                }
        });

        // Escuchar el clic en el botón de búsqueda
        document.getElementById('searchButton').addEventListener('click', async () => {
                const searchInput = document.getElementById('searchInput').value.toLowerCase();
                const params = {
                    inputString: searchInput,
                };
            
                await actualizarPlantas(params);
        });
});