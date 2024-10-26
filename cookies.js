import Cookies from 'js-cookie';

// Establecer cookie
Cookies.set('usuario', 'Juan Pérez', { expires: 7 });

// Leer cookie
const usuario = Cookies.get('usuario');
console.log(usuario);

// Eliminar cookie
Cookies.remove('usuario');

// Funciones de manejo de cookies
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, c) => {
        const [key, ...v] = c.split('=');
        return key === name ? decodeURIComponent(v.join('=')) : r;
    }, '');
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

// Manejadores de eventos para los botones
document.getElementById('set-cookie').onclick = function() {
    setCookie('usuario', 'Juan Pérez', 7);
    alert('Cookie establecida');
};

document.getElementById('get-cookie').onclick = function() {
    const cookieValue = getCookie('usuario');
    document.getElementById('cookie-value').innerText = cookieValue ? `Valor de la cookie: ${cookieValue}` : 'No hay cookie establecida';
};

document.getElementById('delete-cookie').onclick = function() {
    deleteCookie('usuario');
    alert('Cookie eliminada');
};