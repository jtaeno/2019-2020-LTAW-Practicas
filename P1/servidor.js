const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080


http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);
  console.log("Recurso:" + q.pathname)
  var recurso = q.pathname.split("/")[2];
  var tipo = q.pathname.split(".")[1]
  const cookie = req.headers.cookie;
  const params = q.query;
  //--console.log("Cookie: " + cookie)
  let filename = "";

  //-- Obtener fichero a devolver
  switch (q.pathname) {

    //-- Pagina principal
    case "/":
      filename = "paginaprincipal.html";
      break;
    //-- Pagina de acceso
    default:
    filename = q.pathname.substr(1);
  }
    var extension = tipo;
    let mime = "";
    switch (extension) {
      case "js":
        mime = "application/js"
      case "jpg":
        mime = "imagen/jpg";
        break;
      case "png":
        mime = "imagen/png";
        break;
      case "gif":
        mime = "imagen/gif";
        break;
      case "ico":
        mime = "imagen/ico";
        break;
      case "html":
        mime = "text/html";
        break;
      case "css":
        mime = "text/css";
        break;
      case "json":
        mime = "application/json";
        break;
      case "gif":
        mime = "image/gif";
        break;
      case "png":
        mime = "image/png";
        break;
      case "wav":
        mime = "audio/wav";
        break;
      case "mp4":
        mime = "video/mp4";
        break;
      case "woff":
        mime = "application/font-woff";
        break;
      case "ttf":
        mime = "application/font-ttf";
        break;
      case "eot":
        mime = "application/vnd.ms-fontobject";
        break;
      case "otf":
        mime = "application/font-otf";
        break;
      case "svg":
        mime = "image/svg+xml";
        break;
      case "ico":
        mime = "image/x-icon";
        break;
      default:
        mime = "text/html";
    }

    fs.readFile(filename, function(err, data) {

      if (err) {
        res.writeHead(404, {'Content-Type': 'na'});
        return res.end("404 Not Found");
      }

    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });
}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
