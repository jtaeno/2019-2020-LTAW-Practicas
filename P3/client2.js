
const nombre = document.getElementById('nombre');
const telefono = document.getElementById('telefono');
const correo = document.getElementById('correo');
const m_pago = document.getElementById('pagar');
const producto = document.getElementById('producto');
const boton = document.getElementById('boton_formulario');

boton.onclick = () =>{
  predictor.innerHTML = "";
  const m = new XMLHttpRequest();

  m.onreadystatechange=function(){
     if (m.readyState==4 && m.status==200){
       let productos = JSON.parse(m.responseText);

       for (let i=0; i < productos.length; i++) {
         predictor.innerHTML += productos[i];
       }
     }
   }
   m.open("GET", "http://localhost:8080/carrito?nombre=" + nombre.value + "&telefono=" + telefono.value + "&correo=" + correo.value + "&pago=" + m_pago.value + "&producto=" + producto.value , true);
   m.send();
}
