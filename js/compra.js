const listaCompra = document.querySelector("#lista-compra tbody")

const procesarPedido=()=>{

    let carrito = cargarEntradas();
    
    carrito.forEach((prod)=>{
        listaCompra.innerHTML += `
        <td>${prod.nombre}</td>
            <td>$${prod.precio}</td>
            <td>${prod.cantidad}</td>
            <td>$${prod.precio * prod.cantidad}</td>
            <tr>
       `
        
        
    })   
    }
    


procesarPedido();

