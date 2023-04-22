
const modalBody = document.querySelector(".modal .modal-body");


const mostrarCarrito=()=>{

let carrito = cargarEntradas();

modalBody.innerHTML="";

if(totalEntradas()>0){
carrito.forEach((entrada=>{
    modalBody.innerHTML+= `<div class="modal-contenedor">
    <div>
    <img class="img-fluid img-carrito" src="${entrada.img}"/>
    </div>
             <div class=" text-center p-1">
            <h5>Evento: ${entrada.nombre}</h5>
           <p>Precio:$ ${entrada.precio}</p>
           <p>Cantidad:${entrada.cantidad}</p>
           <p>Subtotal:$ ${entrada.cantidad * entrada.precio}</p>
          <button class="btn btn-danger" onclick="eliminarProducto(${entrada.id})">Eliminar producto</button>
            </div>
          </div> `
}))
}else{
  modalBody.innerHTML= `<div class="alert alert-warning" role="alert">
  ¡Aún no agregaste nada!
</div>
`
}

}

mostrarCarrito();
botonCarrito()
