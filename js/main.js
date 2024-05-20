const contenedor = document.getElementById("contenedor");
const carrito = document.getElementById("carrito");
const mostrarCarrito = document.getElementById("mostrarCarrito");

let arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito")) || [];

let botonCarrito = true;
let desplegarCarrito = document.createElement("button");
desplegarCarrito.innerText = "Mostrar carrito";
desplegarCarrito.onclick = () => desplegar(botonCarrito);

function agregarJugador(id) {
  const jugadorIncluido = jugadores.find((el) => el.id === id);
  if (arrayCarrito.some((elemento) => elemento.id === jugadorIncluido.id)) {
    alert("Ya incluiste a este jugador. No puedes repetirlo");
  } else {
    mostrarCarrito.innerHTML = "";
    arrayCarrito.push(jugadorIncluido);
    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
    arrayCarrito.forEach((el) => nuevaFicha(el, "mostrarCarrito"));
  }
}

function quitar(id) {
  mostrarCarrito.innerHTML = "";
  let nuevoCarrito = arrayCarrito.filter((el) => el.id !== id);
  localStorage.setItem("arrayCarrito", JSON.stringify(nuevoCarrito));
  arrayCarrito = nuevoCarrito;
  arrayCarrito.forEach((el) => nuevaFicha(el, "mostrarCarrito"));
}

function nuevaFicha(jugador, container) {
  const ficha = document.createElement("div");
  ficha.className = "ficha";

  const nombre = document.createElement("p");
  nombre.className = "nombre";
  nombre.innerText = jugador.nombre;

  const posicion = document.createElement("p");
  posicion.className = "posicion";
  posicion.innerText = jugador.posicion;

  const imagen = document.createElement("img");
  imagen.src = jugador.imagen;
  imagen.className = "img";
  imagen.alt = "NOIMG";

  const incluir = document.createElement("button");
  incluir.className = "botonAgregar";
  incluir.innerText = container === "contenedor" ? "Agregar" : "Quitar";

  if (container === "contenedor") {
    incluir.onclick = () => agregarJugador(jugador.id);
  } else {
    incluir.onclick = () => quitar(jugador.id);
  }

  ficha.appendChild(nombre);
  ficha.appendChild(posicion);
  ficha.appendChild(imagen);
  ficha.appendChild(incluir);

  const nuevoContainer = document.getElementById(container);

  nuevoContainer.appendChild(ficha);
}

function desplegar(estatus) {
  if (estatus) {
    botonCarrito = false;
    mostrarCarrito.innerHTML = "";
    desplegarCarrito.innerText = "Mostrar carrito";
  } else {
    botonCarrito = true;
    mostrarCarrito.innerHTML = "";
    arrayCarrito.forEach((el) => nuevaFicha(el, "mostrarCarrito"));
    desplegarCarrito.innerText = "Ocultar carrito";
  }
}

jugadores.forEach((el) => nuevaFicha(el, "contenedor"));
arrayCarrito.forEach((el) => nuevaFicha(el, "mostrarCarrito"));

carrito.appendChild(desplegarCarrito);
