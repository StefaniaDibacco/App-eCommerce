/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const socket = io.connect('http://localhost:8080', { forceNew: true });

function render(data) {
  console.log(data);
  const html = data
    .map((elem, index) => {
      return `<div class="mensaje" >      
        <span class='mx-2'>${elem.firstName}</span>
        <span class='mx-2'>${elem.mensaje}</span>
     </div> <br>`;
    })
    .join(' ');
  document.getElementById('mensajesContainer').innerHTML += html;
}

function addMessage() {
  // event.preventDefault();
  const token = document.getElementById('token').value;
  const mensaje = document.getElementById('mensaje').value;

  if (token && mensaje) {
    const data = {
      token,
      mensaje,
    };
    console.log('EMITIENDO SOCKET');

    socket.emit('new-message', data);
    mensaje.value = '';
  }
}

socket.on('message-update', function (data) {
  console.log('RECIBI MENSAJE message-update', data);
  render(data);
});
