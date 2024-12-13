let productos = [
    { id: 1, nombre: "Camiseta", precio: 20 },
    { id: 2, nombre: "Pantalón", precio: 35 },
    { id: 3, nombre: "Zapatillas", precio: 50 }
];

let carrito = [];

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const guardarBtn = document.getElementById("guardar");
const limpiarBtn = document.getElementById("limpiar");

function mostrarProductos() {
    listaProductos.innerHTML = "";
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
        listaProductos.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    mostrarCarrito();
}

function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    let totalCarrito = 0;

    carrito.forEach((producto, index) => {
        totalCarrito += producto.precio;
        const div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(div);
    });

    total.innerText = `Total: $${totalCarrito}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Carrito guardado!");
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

function limpiarCarrito() {
    carrito = [];
    mostrarCarrito();
    localStorage.removeItem("carrito");
}

guardarBtn.addEventListener("click", guardarCarrito);
limpiarBtn.addEventListener("click", limpiarCarrito);

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    cargarCarrito();
});
