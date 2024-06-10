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
        actualizarContadorProductos(1); // Incrementar el contador solo por la cantidad recién agregada
    } else {
        carrito[nombre].cantidad++;
        carrito[nombre].precioTotal += Math.round(precioNumerico);
        actualizarContadorProductos(1); // Incrementar el contador solo por la cantidad recién agregada
    }

    actualizarListaCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProductoDeCarrito(nombre) {
    if (carrito[nombre]) {
        const cantidadEliminada = carrito[nombre].cantidad;
        if (cantidadEliminada >= 1) {
            actualizarContadorProductos(-cantidadEliminada); // Restar la cantidad específica del producto eliminado
        }
        delete carrito[nombre]; // Eliminar el producto directamente
        actualizarListaCarrito();
    }
}



// Función para vaciar por completo el carrito y restablecer el contador a cero
function vaciarCarrito() {
    carrito = {}; // Vaciar el carrito
    actualizarContadorProductos(0); // Reiniciar el contador a cero
    actualizarListaCarrito(); // Actualizar la lista de productos en el carrito
}

// Función para actualizar el contador de productos en el carrito
function actualizarContadorProductos(cantidad) {
    const contadorProductos = document.getElementById('contador-productos');
    let cantidadActual = parseInt(contadorProductos.textContent);
    cantidadActual += cantidad;
    contadorProductos.textContent = cantidadActual >= 0 ? cantidadActual : 0; // Asegurar que el contador no sea menor que cero
}



