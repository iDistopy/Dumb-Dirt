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
    
            const plantasArray = [];
            const plantasDisponibles = plantas.slice(); // Copia el array para no modificar el original
    
            for (let i = 0; i < 20; i++) {
                const randomIndex = Math.floor(Math.random() * plantasDisponibles.length);
                const planta = plantasDisponibles[randomIndex];
                plantasArray.push(planta);
                plantasDisponibles.splice(randomIndex, 1); // Eliminar planta seleccionada para evitar duplicados
                if (plantasDisponibles.length === 0) {
                    plantasDisponibles.push(...plantas); // Si se quedan sin plantas, reiniciar el array
                }
            }
    
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

        const pathName = window.location.pathname;
        if (pathName === "/inicio") {
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
        }
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

        const pathName = window.location.pathname;
        const path = pathName.startsWith('/') ? pathName.substring(1) : pathName;
        const formateado = path.charAt(0).toUpperCase() + path.slice(1);
        document.title = formateado + " • Dumb Dirt";

        // Al salir de la página
        window.addEventListener('blur', function() {
                if (!(pathName === "/login")) {
                        document.title = 'Las plantas te extrañan :(';
                }
                
        });

        // Al volver a entrar se devuelve el valor del título
        window.addEventListener('focus', function() {
                if (!(pathName === "/login")) {
                        document.title = formateado + " • Dumb Dirt";
                }
        });

        const signUpButton = document.getElementById('goSignUp');
        const signInButton = document.getElementById('goSignIn');
        const container = document.getElementById('container');

        // Mostrar plantas al cargar la página
        if (pathName === '/inicio') {
                plantasRandom();
                const loginButton = document.getElementById('buttonLogin');
                const accountDropdown = document.getElementById('accountDropdown');
                loginButton.style.display = 'block';
                accountDropdown.style.display = 'none';
                // Obtener todos los contenedores de planta
                document.getElementById('plantasContainer').addEventListener('click', async (event) => {
                        const plantaContainer = event.target.closest('.planta-container');
                        if (plantaContainer) {
                                const plantaId = plantaContainer.dataset.id;
                                console.log("ID de la planta seleccionada:", plantaId);
                                
                                // Mostrar la planta en un modal (rehacer por mala implementación)
                                const planta = await mostrarPlantaId(plantaId);
                                // modalPlanta(planta);
                        }
                });

                // Por defecto el orden será "Nuevas Primero"
                document.querySelector("#selectedOption").innerText = "Nuevas Primero";
                document.querySelector(".dropdoown[data-value='nuevas']").classList.add("active");

                // Alterna entre las opciones seleccionadas del dropdown
                document.querySelectorAll(".dropdoown").forEach(function(item) {
                        item.addEventListener("click", function() {
                            let opcion = this.innerText;
                            document.querySelector("#selectedOption").innerText = opcion;
                            document.querySelectorAll(".dropdoown").forEach(function(item) {
                                item.classList.remove("active");
                            });
                            this.classList.add("active");
                        });
                });

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
                const loginButton = document.getElementById('buttonLogin');
                const firstLoginButton = window.parent.document.getElementById('buttonLogin');
                const accountDropdown =  window.parent.document.getElementById('accountDropdown');
                if (loginButton) {
                        loginButton.addEventListener('click', async () => {
                                const email = document.getElementById('email').value;
                                const password = document.getElementById('password').value;
                            
                                const response = await fetch('/sec/login', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ email, password }),
                                });
                            
                                if (response.ok) {
                                        window.location.href = '/inicio';
                                        firstLoginButton.style.display = 'none';
                                        accountDropdown.style.display = 'block';
                                        console.log("Botón cambiado!")
                                } else {
                                    alert('Error al iniciar sesión');
                                }
                            });
                }
                
                const logoutButton = document.getElementById('logoutButton');
                if (logoutButton) {
                        logoutButton.addEventListener('click', async () => {
                                const response = await fetch('/sec/logout', {
                                        method: 'POST',
                                        headers: {
                                                'Content-Type': 'application/json',
                                        },
                                });

                                if (response.ok) {
                                        window.location.href = '/login';
                                } else {
                                        alert('Error al cerrar sesión');
                                }
                        });
                }
        }

        // Escuchar el clic en el botón de búsqueda
        if (!(pathName === "/login")) {
                document.getElementById('searchButton').addEventListener('click', async () => {
                        const searchInput = document.getElementById('searchInput').value.toLowerCase();
                        const params = {
                                inputString: searchInput,
                        };

                        await actualizarPlantas(params);
                });
        }
});