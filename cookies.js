/* Tema de Cookies */

document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    // Comprobar si ya se aceptaron las cookies
    if (getCookie('cookiesAccepted')) {
        cookieBanner.style.display = 'none'; // Ocultar el banner si ya se aceptaron las cookies
    }

    acceptBtn.onclick = function() {
        setCookie('cookiesAccepted', 'true', 30); // Establece una cookie por 30 días
        cookieBanner.style.display = 'none'; // Ocultar el banner
    };

    rejectBtn.onclick = function() {
        // Aquí puedes agregar lógica para manejar el rechazo de cookies
        cookieBanner.style.display = 'none'; // Ocultar el banner
    };
});


