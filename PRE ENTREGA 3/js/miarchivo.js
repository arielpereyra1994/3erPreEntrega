let pedido = [];

class Producto {
  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

// Cargar productos iniciales
const productosIniciales = [
  new Producto(1, 'Desodorante', 900, 500),
  new Producto(2, 'Crema Facial', 450, 100),
  new Producto(3, 'Perfume', 5000, 80),
  new Producto(4, 'Shampoo', 400, 38),
  new Producto(5, 'Acondicionador', 350, 48),
  new Producto(6, 'Crema de Peinar', 450, 24),
  new Producto(7, 'Jabon de Tocador', 420, 240)
];

// Función para obtener los datos de productos desde el almacenamiento local
function obtenerDatosProductos() {
  let datosProductos = localStorage.getItem('productosIniciales');
  return datosProductos ? JSON.parse(datosProductos) : [];
}

// Función para guardar los datos de productos en el almacenamiento local
function guardarDatosProductos(datos) {
  localStorage.setItem('productosIniciales', JSON.stringify(datos));
}

function mostrarProductos() {
  let productosContainer = document.getElementById('product-container');
  productosContainer.innerHTML = '';

  let productos = obtenerDatosProductos(); // Obtener los datos de productos del almacenamiento local

  productos.forEach(producto => {
    let divProducto = document.createElement('div');
    divProducto.classList.add('producto');
    // Inner HTML
    divProducto.innerHTML = `
      <div class='card'>  
        <p>ID: ${producto.id}</p>
        <p>Nombre: ${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Stock: <span id="cantidad-${producto.id}">${producto.cantidad}</span></p>
        <input type="number" id="cantidad${producto.id}" placeholder="Cantidad">
        <button class="pedido" onclick="realizarPedido(${producto.id})">Pedido</button>
        <p id="resultado-${producto.id}"></p>
      </div>
    `;

    productosContainer.appendChild(divProducto);
  });
}

// Función para realizar un pedido de un producto específico
function realizarPedido(id) {
  let cantidadInput = document.getElementById(`cantidad${id}`);
  let cantidad = parseInt(cantidadInput.value);

  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarMensaje(`Ingrese una cantidad válida para el producto ${id}`);
    return;
  }

  let productos = obtenerDatosProductos();
  let producto = productos.find(function(item) {
    return item.id === id;
  });
  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarMensaje(`Ingrese una cantidad válida para el producto ${id}`);
    return;
  }

  if (!producto) {
    mostrarMensaje(`No se encontró el producto con ID ${id}`);
    return;
  }

  if (producto.cantidad < cantidad) {
    mostrarMensaje(`No hay suficiente stock del producto ${id}`);
    return;
  }
  cantidadInput.value = "";

  producto.cantidad -= cantidad;
  guardarDatosProductos(productos);
  actualizarCantidadHTML(producto.id, producto.cantidad); // Actualizar la cantidad en el HTML
  guardarPedido(producto, cantidad); // Guardar el pedido en localStorage
  mostrarMensaje(`Pedido realizado. Stock actual del producto ${id}: ${producto.cantidad}`);
}

// Función para guardar un pedido en el localStorage
function guardarPedido(producto, cantidad) {
  let pedidoActual = JSON.parse(localStorage.getItem('pedido')) || []; // Obtener el pedido existente o un array vacío
  pedidoActual.push({ producto, cantidad }); // Agregar el nuevo pedido al array
  localStorage.setItem('pedido', JSON.stringify(pedidoActual)); // Guardar el array actualizado en localStorage
}

// Función para actualizar la cantidad en el HTML
function actualizarCantidadHTML(id, cantidad) {
  let cantidadElement = document.getElementById(`cantidad-${id}`);
  cantidadElement.textContent = cantidad;
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
guardarDatosProductos(productosIniciales);
// Llamada inicial para cargar y mostrar los productos
mostrarProductos();
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    



