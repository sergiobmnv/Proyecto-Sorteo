// Mostrar el banner de cookies cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    // Mostrar el banner solo si no se ha aceptado o rechazado
    if (!getCookie('cookiesAccepted')) {
        cookieBanner.style.display = 'flex';
    } else {
        cookieBanner.style.display = 'none';
    }

    // Botón de aceptar cookies
    acceptBtn.onclick = function() {
        setCookie('cookiesAccepted', 'true', 30); // Establece una cookie por 30 días
        cookieBanner.style.display = 'none'; // Ocultar el banner
    };

    // Botón de rechazar cookies
    rejectBtn.onclick = function() {
        setCookie('cookiesAccepted', 'false', 30); // Registrar rechazo de cookies
        cookieBanner.style.display = 'none'; // Ocultar el banner
    };
});

// Función para establecer una cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Función para obtener una cookie por su nombre
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}
