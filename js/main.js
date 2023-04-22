let eventos=[];

const mainFuntion= async ()=>{
  const main = document.getElementById("mainBox");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const procesarCompra = document.querySelector("#continuarCompra");
 
  
  const datos = await fetchDataFromJson();
  eventos =[...datos]
  showEventos(eventos, main);
  addFuntions(vaciarCarrito,procesarCompra, precioTotal);
  totalPagarCarrito();
  totalCompra();
  formularioPago();
  }
  
  
  const fetchDataFromJson = async ()=>{
    let datos = await fetch("./js/eventos.json");
    datos = await datos.json()
    return datos;
  }
  
const showEventos=(eventos,main)=>{
  if(main){
    eventos.forEach(event =>{
      main.innerHTML += `<div class="col-md-6 p-3">
      <div class="card text-center" style="width: 30rem;">
      <img src="${event.img}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${event.nombre}</h5>
      <h6 class="card-text">$${event.precio}</h6>
      <img src="../assets/img/-place_90615.png"><p class="card-text">${event.lugar}</p>
      <button type="button"  class="btn btn-dark" onclick="agregarAlCarrito(${event.id});">Comprar entrada</button>
      </div>
      </div>
      </div>`
    })
  }
  }
  
  
  
  const guardarEntradas=(eventos)=>{
    localStorage.setItem('carrito', JSON.stringify(eventos))
  }
  
  const cargarEntradas =()=>{
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }
  const formularioPago=()=>{
    const formulario = document.querySelector('#procesar-pago')
    if(formulario){
        formulario.addEventListener('submit', (e)=>enviarCompra(e));
    }
  }
  
  
  const addFuntions =(vaciarCarrito, procesarCompra, precioTotal)=>{
    if(vaciarCarrito){
      vaciarCarrito.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito))
        mostrarCarrito();
        botonCarrito();
        totalPagarCarrito();
      })
    }
    if(procesarCompra){
procesarCompra.addEventListener("click",()=>{
  if(totalEntradas()===0){
    Swal.fire({
      icon: 'error',
      title: 'Tu carrito está vacío',
      text: 'Agrega una entrada para continuar la compra',
    })
    return null;
  }
  if (location.href==='http://127.0.0.1:5502/compra.html'){
    
    return null;
  };
  location.href ="compra.html";
})
}
}
const eventoEnCarrito= (id) => {
  let carrito =cargarEntradas()
  return carrito.some((element=>element.id===id))
}


const agregarAlCarrito=(id)=>{
  let carrito= cargarEntradas();
  const eventoAgregado= eventos.find((element=>element.id===id))
  
  if(eventoEnCarrito(id)){
    let index = carrito.findIndex(element => element.id ===id);
    carrito[index].cantidad++;
    
  }else{
    eventoAgregado.cantidad=1;
    carrito.push(eventoAgregado)
  }
  guardarEntradas(carrito);
  mostrarCarrito();
  botonCarrito()
  totalPagarCarrito();
}


const totalEntradas=()=>{
  let entradas= cargarEntradas()
  return entradas.reduce((acc, item) => acc += item.cantidad, 0);
}


const eliminarProducto=(id)=> {
  let  carrito= cargarEntradas()
  let entradas = carrito.filter(entrada => entrada.id !== id);
  guardarEntradas(entradas);
  mostrarCarrito();
  botonCarrito()
  totalPagarCarrito();
}


const totalPagarCarrito=()=> {
  const precioTotal = document.querySelector("#precioTotal");
  if (!precioTotal) return null; 
  let entradas = cargarEntradas(); 
  precioTotal.innerText= entradas.reduce((acc, item) =>acc += item.cantidad * item.precio, 0);
}

const totalCompra=()=>{
  const totalProceso = document.querySelector("#totalProceso");
  let entradas=cargarEntradas();
  totalProceso.innerText= entradas.reduce((acc, item) =>acc += item.cantidad * item.precio, 0)
}

const botonCarrito=()=> {
  document.getElementById("numeroCarrito").innerText = totalEntradas();
}




const enviarCompra= async(e)=>{
  e.preventDefault();
  
  const email = document.querySelector('#correo').value
  const cliente = document.querySelector('#cliente').value
  const formulario = document.querySelector('#procesar-pago')

  console.log("this",this);
  if(email === '' || cliente ===''){
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    })
  } else {
    const btn = document.getElementById('button');
    btn.value = 'Enviando..';  
     const serviceID =  'service_wi4fhea';
     const templateID = 'template_ksvks3i';
  
  
  try {
    const res = await emailjs.sendForm(serviceID, templateID, this);
    console.log(res);
    btn.value = 'Finalizar compra';
    alert('Enviado!');    
  } catch (error) {
    alert(JSON.stringify(error));
    btn.value = 'Finalizar compra';
  }

 const spinner = document.querySelector('#spinner')
 
 spinner.classList.add('d-flex')
 spinner.classList.remove('d-none')
    
  
 setTimeout(() => {
   spinner.classList.remove('d-flex')
   spinner.classList.add('d-none')
   formulario.reset()

   const alertExito = document.createElement('p')
   alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
   alertExito.textContent = 'Compra realizada correctamente'
   formulario.appendChild(alertExito)

   setTimeout(() => {
     alertExito.remove()
   }, 3000)


 }, 3000)
}
localStorage.clear();
}




mainFuntion();