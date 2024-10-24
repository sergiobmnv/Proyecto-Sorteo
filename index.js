


const modal = document.getElementById("contenedor-modal");
const formulario = document.getElementById("form");
const btn = document.getElementById("botonParticipar");


formulario.addEventListener('submit', async function(event) {
  event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'service_4f805xl';
    const templateID = 'template_ug1856j';

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const apellido = document.getElementById("apellido").value;

    const participante = { nombre, correo ,apellido };

    try{
      const response = await fetch('http://localhost:3000/participar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(participante),
      });

      if(response.ok){
        emailjs.sendForm(serviceID, templateID, this).then(() => {
        btn.value = 'Send Email';
        modal.style.display = "block";
        formulario.reset();
      }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
      });
      }else{
        console.error('Error al enviar los datos');
      }

    }catch (error){
      console.error('Error:', error);
    }
});

//evento para cerrar el modal al pulsar fuera
window.addEventListener("click", function(event){
  if(event.target == modal){
      modal.style.display = "none";
  }
});