// Función para obtener los datos de productos desde el almacenamiento local
function obtenerDatosProductos() {
  let datosProductos = localStorage.getItem('productos');
  return datosProductos ? JSON.parse(datosProductos) : [];
}

// Función para guardar los datos de productos en el almacenamiento local
function guardarDatosProductos(datos) {
  localStorage.setItem('productos', JSON.stringify(datos));
}

// Función para mostrar los productos en el HTML
function mostrarProductos() {
  let productosContainer = document.getElementById('productosContainer');
  productosContainer.innerHTML = '';

  var productos = obtenerDatosProductos();

  productos.forEach(function(producto) {
    let divProducto = document.createElement('div');
    divProducto.classList.add('producto');
    divProducto.innerHTML = `
      <p>ID: ${producto.id}</p>
      <p>Nombre: ${producto.nombre}</p>
      <p>Precio: $${producto.precio}</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <input type="number" id="cantidad-${producto.id}" placeholder="Cantidad">
      <button onclick="realizarPedido(${producto.id})">Pedido</button>
      <p id="resultado-${producto.id}"></p>
    `;

    productosContainer.appendChild(divProducto);
  });
}
// Función para realizar un pedido de un producto específico
function realizarPedido(id) {
  let cantidadInput = document.getElementById(`cantidad-${id}`);
  let cantidad = parseInt(cantidadInput.value);

  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarMensaje(`Ingrese una cantidad válida para el producto ${id}`);
    return;
  }

  let productos = obtenerDatosProductos();
  let producto = productos.find(function(item) {
    return item.id === id;
  });

  if (!producto) {
    mostrarMensaje(`No se encontró el producto con ID ${id}`);
    return;
  }

  if (producto.cantidad < cantidad) {
    mostrarMensaje(`No hay suficiente stock del producto ${id}`);
    return;
  }

  producto.cantidad -= cantidad;
  guardarDatosProductos(productos);
  mostrarProductos();
  mostrarMensaje(`Pedido realizado. Stock actual del producto ${id}: ${producto.cantidad}`);
}

// Función para mostrar mensajes en el HTML
function mostrarMensaje(mensaje) {
  let mensajeElement = document.createElement('p');
  mensajeElement.textContent = mensaje;
  document.body.appendChild(mensajeElement);
  setTimeout(function() {
    mensajeElement.remove();
  }, 2000);
}

// Cargar productos iniciales
const productosIniciales = [
  { id: 1, nombre: 'Desodorante', precio: 900, cantidad: 500 },
  { id: 2, nombre: 'Crema Facial', precio: 450, cantidad: 100 },
  { id: 3, nombre: 'Perfume', precio: 5000, cantidad: 80 },
  { id: 4, nombre: 'Shampoo', precio: 400, cantidad: 38},
  { id: 5, nombre: 'Acondicionador', precio: 350, cantidad: 48},
  { id: 6, nombre: 'Crema de Peinar', precio: 450, cantidad: 24}
];

guardarDatosProductos(productosIniciales);
mostrarProductos();
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    



