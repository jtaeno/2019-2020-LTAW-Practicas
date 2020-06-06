const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 8080

var usuarios = 0;
var users = [];

http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

app.use('/', express.static(__dirname +'/'));


io.on('connection', function(socket){
  usuarios += 1;
  users.push('- ' + socket.id + '<br>');
  console.log(users.value)
  console.log('--> Usuario conectado!. Socket id: ' + socket.id);
  console.log("Usuario número " + usuarios);
  socket.emit('hello', "Bienvenido al Chat <br> Numero de usuarios: " + usuarios);
  socket.emit('usr', users);
  socket.on('msg', (msg) => {
      socket.emit('usr', users);
  })

  socket.on('msg', (msg) => {
    console.log("Usuario: " + socket.id + ': ' + msg);
    io.emit('msg', msg);
  })

  socket.on('cmd', (msg) =>{
    var comando = '';
    switch (msg) {
      case "/hello":
        comando += "<br>BIENVENIDO AL CHAT"
        break;
      case "/help":
        comando += "<br> LISTA DE COMANDOS DISPONIBLES"
        comando += "<br>/help = Mostrar comando;<br> /list = Número de usuarios conectados; "
        comando += "<br>/hello = Servidor envía un saludo; <br>/date = Fecha actual"
        break;   
      case "/list":
        comando += "<br>Usuarios conectados: " + usuarios;
        break;
      case "/date":
        var fecha = new Date();
        comando += "<br>Fecha: <br>" + fecha;
        break;
      default:
    }
    socket.emit('msg', comando);
  })

  socket.on('disconnect', function(){
    console.log(users)
    var deletes = '- ' + socket.id + '<br>'
    var indice  = users.indexOf (deletes);
    if (indice> -1) {
       users.splice (indice, 1);
    }
    console.log(users)
    usuarios -= 1;
    console.log('--> Usuario Desconectado. Socket id: ' + socket.id);
  });
});
