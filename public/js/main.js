// Verificar que el documento está cargado
document.addEventListener("DOMContentLoaded", function() {

        // Login y Registro
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
    
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
            document.title = "Registrarse • Dumb Dirt";
        });
    
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
            document.title = "Iniciar Sesión • Dumb Dirt";
        });
    });

// Auto-Favicon
var link = document.createElement('link');
var head = document.querySelector('head');

link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = '../utils/images/dumb-dirt.png';
head.appendChild(link);

// Modal de búsqueda de productos
function searchModal() {
        var myModal = new bootstrap.Modal(document.getElementById('searchModal'));
        myModal.show();
        console.log("modal abierto");
}

// Solo para pruebas de integración
function testAlert() {
        alert("Test alert");
}

