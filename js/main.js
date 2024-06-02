fetch("./js/jugadores.json")
.then(response => response.json())
.then ((data) => {
  data.forEach((el) => nuevaFicha(el, "contenedor"));
})
.catch ((error) => {
  Swal.fire({
    title: "ERROR",
    text: "Base de datos no encontrada.",
    icon: "error"
  });
})

const contenedor = document.getElementById("contenedor");
const carrito = document.getElementById("carrito");
const mostrarCarrito = document.getElementById("mostrarCarrito");

let arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito")) || [];

let botonCarrito = true;
let desplegarCarrito = document.createElement("button");
desplegarCarrito.innerText = "Mostrar carrito";
desplegarCarrito.onclick = () => desplegar(botonCarrito);

function agregarJugador(id) {
  fetch("./js/jugadores.json")
  .then(response => response.json())
  .then ((data) => {
  const jugadorIncluido = data.find((el) => el.id === id);
  if (arrayCarrito.some((elemento) => elemento.id === jugadorIncluido.id)) {
    Swal.fire({
      icon: "error",
      text: `Ya agregaste a ${jugadorIncluido.nombre}. No puedes repetirlo.`,
    });
  } else {
    mostrarCarrito.innerHTML = "";
    arrayCarrito.push(jugadorIncluido);
    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
    arrayCarrito.forEach((el) => nuevaFicha(el, "mostrarCarrito"));
    Toastify({
      text: `${jugadorIncluido.nombre} agregado!`,
      duration: 2000,
      gravity: "bottom",
      style: {
        background: "#00ad37",
        color: "white",
      },
    }).showToast();
  }
});
}

function quitar(id) {
  const jugadorQuitado = arrayCarrito.find((el) => el.id === id);
  mostrarCarrito.innerHTML = "";

  Swal.fire({
    title: `Estás seguro de que quieres eliminar a ${jugadorQuitado.nombre}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#de4b5a",
    cancelButtonColor: "#00ad37",
    confirmButtonText: "Si",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      let nuevoCarrito = arrayCarrito.filter((el) => el.id !== id);
      localStorage.setItem("arrayCarrito", JSON.stringify(nuevoCarrito));
      arrayCarrito = nuevoCarrito;
      arrayCarrito.forEach((el) => nuevaFicha(el, "mostrarCarrito"));
      Swal.fire({
        title: `${jugadorQuitado.nombre} ha sido eliminado.`,
        icon: "success",
      });
      Toastify({
        text: `${jugadorQuitado.nombre} eliminado!`,
        duration: 2000,
        gravity: "bottom",
        style: {
          background: "#de4b5a",
          color: "white",
        },
      }).showToast();
    } else {
      Swal.fire(`No eliminaste a ${jugadorQuitado.nombre}`);
    }
  });
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


arrayCarrito.forEach((el) => nuevaFicha(el, "mostrarCarrito"));

carrito.appendChild(desplegarCarrito);

// setTimeout( () => {
//   Swal.fire({
//     title: "Sigues ahí??",
//     icon: "question"
//   });
// }, 20000)