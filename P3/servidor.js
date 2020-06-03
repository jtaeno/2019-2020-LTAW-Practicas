const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

var productos = ["claseA", "claseGLE", "AMG-GT"];
var predictor = '';

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
    case "/buscador":
      if (req.method === 'POST') {
        var objeto = "";
        req.on('data', chunk => {
            data = chunk.toString();
            //-- Mostrar los datos en la consola del servidor
            console.log("Datos recibidos: " + data)
            objeto = data.split("=")[1];
            for (let i=0; i < productos.length; i++) {
              if ( productos[i] == objeto){
                predictor = productos[i];
              }else{
                predictor = objeto;
              }
            }
            switch (predictor) {
              case "claseA":
                filename = "producto1.html";
                break;
              case "claseGLE":
                filename = "producto2.html";
                break;
              case "AMG-GT":
                filename = "producto3.html";
                break;
              default:
                filename = "error.html"
            }
          });
          req.on('end', ()=> {
            fs.readFile(filename, (err, data) => {
              ///--Fichero no encontrado
              if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end();
              }else {
                //-- Tipo mime por defecto html
                res.writeHead(200, {'Content-Type': "text/html"});
                res.write(data);
                return res.end();
              }
            })
          })
          return
          break;
        }
    case "/login":
      if (req.method === 'POST') {
        req.on('data', chunk => {
          data = chunk.toString();
          nombre = data.split("=")[1].split("&")[0].split("+")[1];
          telefono = data.split("&")[1].split("=")[1].split("+")[1];
          correo = data.split("&")[2].split("=")[1].split("+")[1];
          console.log("Nombre: " + nombre)
          console.log("Telefono: " + telefono)
          console.log("Correo: " + correo)
          arraycookies = cookie.split(' ');
          for (var i = 0; i < arraycookies.length; i++) {
              usuario = arraycookies[i].split("=")[1].split(';')[0];
              if(usuario != nombre){
                  filename = "paginaprincipal.html";
              }else{
                filename = "error.html";
              }
              break;
            }
        })

        req.on('end', ()=> {
          fs.readFile(filename, (err, data) => {
            if (err){
              res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end();
            }else{
              if(usuario != nombre ){
                  res.setHeader("Set-Cookie",  "user=" + nombre);
              }
              res.writeHead(200, {'Content-Type': "text/html"});
              res.write(data);
              return res.end();
            }
          })
        })
        return
        break;
     }
     case "/botoncompra":
       filename = "formulario.html";
       break;
     case "/pedido":
       if (req.method === 'POST') {
         var imprimir = true;
         var html_pedido = `
         <!DOCTYPE html>
         <html lang="es" dir="ltr">
           <head>
             <head>
               <meta charset="utf-8">
               <title>Formulario Clientes</title>
               <link rel="stylesheet" href="css/pedido.css">
               <link rel="icon" href="ico/car.svg">
             </head>
           </head>
           <body onload="main();">
             <div class="ajustar">
                   <div class="inicio">
                     <p id="titulo"></p>
                     <img src="imagen/simbolomercedes.jpg" id="simbolo" >
                   </div>
                   <div class="menu">
                     <script type="text/javascript">
                       function accion(){
                         console.log("esta funcionando mi boton");
                         var ancla = document.getElementsByClassName('nav-enlace');
                         for( var  i=0; i < ancla.length; i++){
                           ancla[i].classList.toggle('desaparece');
                         }
                      }
                     </script>
                     <nav>
                       <div class="menu2">
                         <button type="nav-boton" id= 'botonmenu'  onclick="accion()">Menu</button>
                         <a href="amg.html"   data-aem-linkdestinationurl="amg.html"   class="nav-enlace desaparece" data-aem-linkdestinationurl="amg.html">AMG</a>
                         <a href="paginaprincipal.html" class="nav-enlace desaparece" data-aem-linkdestinationurl='paginaprincipal.html' >Principal</a>
                       </div>
                     </nav>
                     <div class="cuadradoformulario">
                         <div class="formulario">
                             <h1>Gracias por confiar en Mercedes-Benz</h1>
                             <h2>Datos Comprador:</h2>
                             <h3>Nombre:
                             `

         req.on('data', chunk => {
           //-- Leer los datos (convertir el buffer a cadena)
           data = chunk.toString();
           nombre = data.split("=")[1].split("&")[0].split("+")[1];
           user = nombre;
           telefono = data.split("&")[1].split("=")[1].split("+")[1];
           correo = data.split("&")[2].split("=")[1].split("+")[1];
           pago =  data.split("&")[3].split("=")[1]
           producto =  data.split("&")[4].split("=")[1]
           pedido = '-' + nombre + '-' + telefono + '-' + correo + '-' + pago + '-' + producto;
           console.log("Nombre: " + nombre);
           console.log("Telefono: " + telefono);
           console.log("Correo: " + correo);
           console.log('Pago:' + pago);
           console.log("Producto: " + producto);
           arraycookies = cookie.split(' ');

           html_pedido += user += `</h3><h3>Telefono: `
           html_pedido += telefono += `</h3>E-Mail: `
           html_pedido += correo += `<br><br></h3>Metodo de pago: `
           html_pedido += pago += `<br><br></h3>Producto: `
           html_pedido += producto += `</h3> `
           html_pedido +=`</div>
                       </div>
                     </div>
                     <div class="abajo">
                       <h1 id = "redes"> Redes Sociales</h1>
                         <li class="facebook">
                           <a title="Face" href="https://www.facebook.com/MercedesBenzEspana"
                           target="_blank"
                           data-aem-linkdestinationurl="https://www.facebook.com/MercedesBenzEspana">
                             <img class="facebook" src="svg/facebook.svg">
                           </a>
                         </li>
                         <li class="insta">
                           <a title="Instagram" href="https://www.instagram.com/mbenzespana/"
                             target="_blank"
                            data-aem-linkname="instagram"
                            data-aem-linkdestinationurl="https://www.instagram.com/mbenzespana/">
                               <img class="instagram" src="svg/instagram.svg">
                           </a>
                         </li>
                         <li class= 'youtu'>
                           <a title="YOUTUBE" href="https://www.youtube.com/user/MercedesBenzSpain"
                            target="_blank" data-aem-linkname="youtube"
                            data-aem-linkdestinationurl="https://www.youtube.com/user/MercedesBenzSpain">
                             <img class="youtube" src="svg/youtube.svg " >
                          </a>
                         </li>
                         <li class='tweet'>
                           <a title="Twitter" href="https://twitter.com/MBenzEspana?csref=mc_sem_cn-ESP_WS_MBC_BrandOverall_Brand_PURE_EX_HYS201912633103_ci-Google_si-g_pi-kwd-16822141_cri-264403755336_ai-none"
                           target="_blank"  data-aem-linkname="twitter"
                           data-aem-linkdestinationurl="https://twitter.com/MBenzEspana">
                             <img class="twitter" src="svg/twitter.svg">
                           </a>
                         </li>
                         <li class= 'pinte'>
                           <a title="Pinterest" href="https://de.pinterest.com/MercedesBenz/"
                           target="_blank" data-aem-linkname="pinterest"
                           data-aem-linkdestinationurl="https://de.pinterest.com/MercedesBenz/">
                             <img class="pinterest" src="svg/pinterest.svg">
                           </a>
                         </li>
                       </ul>
                     </div>
                 </div>
             </body>
           </html>
           `
           for (var i = 0; i < arraycookies.length; i++) {
             cookie_nombre = arraycookies[i].split("=")[0];
             if (cookie_nombre == 'user') {
               usuario = arraycookies[i].split("=")[1].split(';')[0];
               if(usuario == nombre){
                  imprimir = true;
                   res.setHeader("Set-Cookie",   "pedido =" + pedido );
               }else{
                 filename = "error.html";
                 imprimir = false;
               }
               break;
             }
           }
         })
         req.on('end', ()=> {
           fs.readFile(filename, (err, data) => {
               res.writeHead(200, {'Content-Type': "text/html"});
               if (imprimir == false){
                 res.write(data);
               }else if (imprimir == true){
                 res.write(html_pedido);
               }
               return res.end();
           })
         })
         return
         break;
       }
     case "/myquery":

       var x = '';
       var añadir = [];
       var z = '';
       console.log(params.param1);
       for (let i=0; i < productos.length; i++) {
         x = productos[i].indexOf(params.param1);
         if (x == 0){
           z = '  / ' + productos[i] + ' /  ';
           añadir.push(z);
         }
       }
      json = JSON.stringify(añadir) + '\n';

       res.setHeader('Content-Type', 'application/json');
       res.write(json);
       res.end();
       return
       break;
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
