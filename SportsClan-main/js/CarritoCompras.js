document.addEventListener('DOMContentLoaded', function() {
    const contadorProductos = document.getElementById('contador-productos');
    const botonesAgregarCarrito = document.querySelectorAll('.btn-add-cart');
    
    let contador = 0;

    function actualizarContador() {
        contadorProductos.textContent = contador;
    }

    botonesAgregarCarrito.forEach(function(boton) {
        boton.addEventListener('click', function() {
            contador++;
            actualizarContador();
        });
    });
});


let carrito = {}; // Objeto para almacenar los productos y cantidades

function agregarProducto(nombre, precioBase) {
    // Limpiar el precio base para convertirlo a un número 
    const precioNumerico = parseFloat(precioBase.replace(/[^0-9.-]+/g,"").replace(/\./g, '').replace(',', '.'));

    if (!carrito[nombre]) {
        carrito[nombre] = {
            cantidad: 1,
            precioTotal: Math.round(precioNumerico) // Redondear el precio
        };
    } else {
        carrito[nombre].cantidad++;
        carrito[nombre].precioTotal += Math.round(precioNumerico); // Redondear el precio
    }

    actualizarListaCarrito();
}

function actualizarListaCarrito() {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Limpiar la lista antes de actualizar

    for (const nombreProducto in carrito) {
        const producto = document.createElement('div');
        producto.classList.add('producto');

        const nombre = document.createElement('div');
        nombre.classList.add('nombre');
        nombre.textContent = nombreProducto;

        const cantidad = document.createElement('div');
        cantidad.classList.add('cantidad');
        cantidad.textContent = `Cantidad: ${carrito[nombreProducto].cantidad}`;

        const precioTotal = document.createElement('div');
        precioTotal.classList.add('precio-total');
        precioTotal.textContent = `Precio Total: $${carrito[nombreProducto].precioTotal.toLocaleString('es-CL', { minimumFractionDigits: 0 })}`; // Redondear el precio

        producto.appendChild(nombre);
        producto.appendChild(cantidad);
        producto.appendChild(precioTotal);

        listaProductos.appendChild(producto);
    }
}

// Obtener todos los botones "Añadir al carrito"
const botonesAgregar = document.querySelectorAll('.btn-add-cart');

// Iterar sobre cada botón y agregar un evento al hacer clic
botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
        const producto = boton.closest('.card');
        const nombre = producto.querySelector('.card-nombre').textContent;
        const precioBase = producto.querySelector('.card-precio').textContent;

        // Llamar a la función para agregar el producto al carrito con los datos capturados
        agregarProducto(nombre, precioBase);
    });
});


// Modificar la función actualizarListaCarrito para incluir botones de eliminar
function actualizarListaCarrito() {
    const listaProductos = document.getElementById ('lista-productos');
    listaProductos.innerHTML = ''; // Limpiar la lista antes de actualizar

    for (const nombreProducto in carrito) {
        const producto = document.createElement('div');
        producto.classList.add('producto');

        const nombre = document.createElement('div');
        nombre.classList.add('nombre');
        nombre.textContent = nombreProducto;

        const cantidad = document.createElement('div');
        cantidad.classList.add('cantidad');
        cantidad.textContent = `Cantidad: ${carrito[nombreProducto].cantidad}`;

        const precioTotal = document.createElement('div');
        precioTotal.classList.add('precio-total');
        precioTotal.textContent = `Precio Total: $${carrito[nombreProducto].precioTotal.toLocaleString('es-CL', { minimumFractionDigits: 0 })}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            eliminarProductoDeCarrito(nombreProducto);
        });

        producto.appendChild(nombre);
        producto.appendChild(cantidad);
        producto.appendChild(precioTotal);
        producto.appendChild(botonEliminar);

        listaProductos.appendChild(producto);
    }
}
// Función para agregar un producto al carrito
function agregarProducto(nombre, precioBase) {
    const precioNumerico = parseFloat(precioBase.replace(/[^0-9.-]+/g,"").replace(/\./g, '').replace(',', '.'));

    if (!carrito[nombre]) {
        carrito[nombre] = {
            cantidad: 1,
            precioTotal: Math.round(precioNumerico)
        };
        actualizarContadorProductos(1); // Añadir solo la cantidad recién agregada al contador
    } else {
        carrito[nombre].cantidad++;
        carrito[nombre].precioTotal += Math.round(precioNumerico);
        actualizarContadorProductos(1); // Añadir solo la cantidad recién agregada al contador
    }

    actualizarListaCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProductoDeCarrito(nombre) {
    if (carrito[nombre]) {
        const cantidadEliminada = carrito[nombre].cantidad;
        if (cantidadEliminada === 1) {
            delete carrito[nombre];
        } else {
            carrito[nombre].cantidad--;
            carrito[nombre].precioTotal -= Math.round(precioNumerico);
        }
        actualizarContadorProductos(-1); // Restar solo la cantidad del producto eliminado del contador
        actualizarListaCarrito();
    }
}

// Función para actualizar el contador de productos en el carrito
function actualizarContadorProductos(cantidad) {
    const contadorProductos = document.getElementById('contador-productos');
    const cantidadActual = parseInt(contadorProductos.textContent);
    contadorProductos.textContent = cantidadActual + cantidad;
}

