console.log("Ejecutando cliente JS...");

const display = document.getElementById("display");
const display2 = document.getElementById("display2");
const msg = document.getElementById("msg");
const send = document.getElementById("send");
const socket = io();

socket.on('hello', (msg) => {
  console.log("Mensaje del servidor: " + msg);
  display.innerHTML = msg;
});

socket.on('msg', (msg) => {  //-- Añadirlo al párrafo display
  display.innerHTML += "<br> > " + 'MENSAJE' + ': ' + msg;
});

socket.on('usr', (msg) => {  //-- Añadirlo al párrafo display
  display2.innerHTML =  ' ';
  display2.innerHTML += "<br> > " + msg;
});


send.onclick = () => {
  if (msg.value)
    if (msg.value[0] == "/"){
      socket.emit('cmd', msg.value);
    }else{
      socket.emit('msg', msg.value);
    };

  msg.value="";
}
