const modal = document.getElementById("contenedor-modal");
const formulario = document.getElementById("form");
const btn = document.getElementById("botonParticipar");
const cuentaAtras = document.getElementById("cuenta-Atras");
const contenedorModalGanador = document.querySelector(".contenedor-modal-ganador");
const mensajeGanador = document.querySelector(".modal-ganador p");
const cerrarModalGanador = document.getElementById("cerrar-modal-ganador");

// Fecha y hora del final del sorteo
const fechaFinal = new Date("October 29, 2024 12:00:00").getTime();

// Actualizar la cuenta regresiva cada segundo
const x = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaFinal - ahora;

    // Calcular días, horas, minutos y segundos
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Mostrar el resultado en el elemento correspondiente
    cuentaAtras.innerHTML = `${dias} días : ${horas} horas : ${minutos} minutos : ${segundos} segundos`;

    // Si la cuenta atrás ha terminado, mostrar un mensaje
    if (distancia < 0) {
        clearInterval(x);
        cuentaAtras.innerHTML = "El sorteo ha terminado";

        // Desactivar el formulario
        formulario.style.display = "none"; // Oculta el formulario
        mostrarGanador(); // Llama a la función para mostrar el ganador
    }
}, 1000);

// Manejo del formulario
formulario.addEventListener('submit', async function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'service_4f805xl';
    const templateID = 'template_ug1856j';

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const apellido = document.getElementById("apellido").value;

    // Validar que los campos no estén vacíos
    if (!nombre || !correo) {
        alert("Por favor, completa todos los campos.");
        btn.value = 'Send Email'; // Restaurar texto del botón
        return;
    }

    const participante = { nombre, correo, apellido };

    try {
        const response = await fetch('http://localhost:3000/participar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(participante),
        });

        if (response.ok) {
            await emailjs.sendForm(serviceID, templateID, this);
            btn.value = 'Send Email';
            modal.style.display = "block";
            formulario.reset();
        } else {
            btn.value = 'Send Email';
            console.error('Error al enviar los datos', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        btn.value = 'Send Email'; // Restaurar texto del botón en caso de error
    }
});

// Función para mostrar el modal del ganador
function mostrarGanador() {
    contenedorModalGanador.style.display = "flex";
    mensajeGanador.innerHTML = "¡Gracias por participar! El sorteo ha finalizado.";
}

// Evento para cerrar el modal al pulsar fuera
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Evento para cerrar el modal del ganador
cerrarModalGanador.addEventListener("click", function() {
    contenedorModalGanador.style.display = "none";
});
