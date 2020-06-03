

// -- Seleccionamos el busqueda de los html
const busqueda = document.getElementById("busqueda");
const predictor = document.getElementById("predictor");
// -- Pulsar el boton de busqueda
busqueda.onkeyup = ()=>{
   predictor.innerHTML = "";
  if (busqueda.value.length >= 3) {
    const m = new XMLHttpRequest();

    m.onreadystatechange=function(){
       if (m.readyState==4 && m.status==200){
         let productos = JSON.parse(m.responseText);

         for (let i=0; i < productos.length; i++) {
           predictor.innerHTML += productos[i];
         }
       }
     }
     m.open("GET","http://localhost:8080/myquery?param1=" + busqueda.value, true)
     m.send();
  }
}
