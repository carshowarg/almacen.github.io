function iniciarRegistro() {
    let cantidad = document.getElementById("cantidad").value;
    let bienvenida = document.getElementById("bienvenida");
    let formulario = document.getElementById("formulario");
    let inputs = document.getElementById("inputs");

    // Verificar si el valor ingresado es un número válido
    if (cantidad < 1 || isNaN(cantidad)) {
        alert("Por favor, ingresa un número válido de productos.");
        return;
    }

    // Ocultar la sección de bienvenida y mostrar el formulario
    bienvenida.style.display = "none";
    formulario.style.display = "block";

    // Limpiar los inputs anteriores (si hubiera)
    inputs.innerHTML = "";

    // Crear los campos de entrada para los productos
    for (let i = 0; i < cantidad; i++) {
        inputs.innerHTML += `
            <div>
                <label>Nombre del producto ${i + 1}:</label>
                <input type="text" id="producto${i}" required>
                <label>Precio costo:</label>
                <input type="number" id="precio${i}" required>
            </div>
        `;
    }
}

function generarLista() {
    let cantidad = document.getElementById("cantidad").value;
    let productos = [];

    // Recoger los datos de los productos
    for (let i = 0; i < cantidad; i++) {
        let nombre = document.getElementById(`producto${i}`).value;
        let precio = parseFloat(document.getElementById(`precio${i}`).value);
        if (nombre && precio) {
            let precioFinal = Math.round(precio * 1.35);
            productos.push({ nombre, precioFinal });
        }
    }

    mostrarLista(productos);
}

function mostrarLista(productos) {
    let listaContainer = document.getElementById("lista-container");
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    productos.forEach((producto, index) => {
        lista.innerHTML += `
            <li>
                ${producto.nombre} - $${producto.precioFinal}
                <button class="editar" onclick="editarProducto(${index})">✏️</button>
                <button class="eliminar" onclick="eliminarProducto(${index})">❌</button>
            </li>
        `;
    });

    // Mostrar la sección de lista
    listaContainer.style.display = "block";
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    mostrarLista(productos);
}

function editarProducto(index) {
    let nuevoNombre = prompt("Nuevo nombre:", productos[index].nombre);
    let nuevoPrecio = parseFloat(prompt("Nuevo precio de costo:", productos[index].precioFinal / 1.35));

    if (nuevoNombre && nuevoPrecio) {
        productos[index].nombre = nuevoNombre;
        productos[index].precioFinal = Math.round(nuevoPrecio * 1.35);
        mostrarLista(productos);
    }
}

function buscarProducto() {
    let filtro = document.getElementById("buscador").value.toLowerCase();
    let lista = document.getElementById("lista").getElementsByTagName("li");

    for (let i = 0; i < lista.length; i++) {
        let texto = lista[i].innerText.toLowerCase();
        lista[i].style.display = texto.includes(filtro) ? "" : "none";
    }
}
