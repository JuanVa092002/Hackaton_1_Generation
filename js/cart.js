

const CARRITO_KEY = "carrito";
let carrito = cargarCarrito();

function cargarCarrito() {
  try {
    const raw = localStorage.getItem(CARRITO_KEY);
    if (!raw) return [];

    const data = JSON.parse(raw);

    // Formato actual: [{ paqueteId, pasajeros }, ...]
    if (Array.isArray(data) && data.length > 0 && data[0].paqueteId) {
      return data.filter(function (item) {
        return item.paqueteId && item.pasajeros >= 1;
      });
    }

    // Formato anterior: un solo objeto { paqueteId, pasajeros }
    if (data.paqueteId && data.pasajeros >= 1) {
      return [{ paqueteId: data.paqueteId, pasajeros: data.pasajeros }];
    }

    // Formato muy viejo: array de paquetes completos duplicados
    if (Array.isArray(data) && data.length > 0 && data[0].id) {
      const agrupado = {};
      data.forEach(function (paquete) {
        if (!agrupado[paquete.id]) {
          agrupado[paquete.id] = { paqueteId: paquete.id, pasajeros: 0 };
        }
        agrupado[paquete.id].pasajeros += 1;
      });
      return Object.values(agrupado);
    }

    return [];
  } catch (e) {
    localStorage.removeItem(CARRITO_KEY);
    return [];
  }
}

function guardarCarrito() {
  if (carrito.length > 0) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  } else {
    localStorage.removeItem(CARRITO_KEY);
  }
}

function obtenerPaquete(id) {
  if (typeof paquetes === "undefined") return null;
  return paquetes.find(function (p) { return p.id === id; }) || null;
}

function buscarItemCarrito(paqueteId) {
  return carrito.find(function (item) { return item.paqueteId === paqueteId; });
}

function carritoTieneItems() {
  return carrito.length > 0;
}

function limpiarItemsInvalidos() {
  carrito = carrito.filter(function (item) {
    return obtenerPaquete(item.paqueteId) !== null;
  });
  guardarCarrito();
}

function notificar(mensaje) {
  if (typeof Alerta !== "undefined") {
    Alerta.toast(mensaje);
  } else {
    alert(mensaje);
  }
}

function agregarCarrito(id) {
  const paquete = obtenerPaquete(id);
  if (!paquete) return;

  const item = buscarItemCarrito(id);

  if (item) {
    item.pasajeros += 1;
  } else {
    carrito.push({ paqueteId: id, pasajeros: 1 });
  }

  guardarCarrito();
  notificar(paquete.nombre + " agregado al carrito");
  actualizarVistaModal();
}

function quitarDelCarrito(paqueteId) {
  carrito = carrito.filter(function (item) { return item.paqueteId !== paqueteId; });
  guardarCarrito();
  actualizarVistaModal();
  notificar("Destino eliminado del carrito");
}

function verDetalle(id) {
  if (typeof abrirModalPaquete === "function") {
    abrirModalPaquete(id);
  }
}

const main = document.getElementById("main");

function mostrarPaquetes() {
  if (!main || typeof paquetes === "undefined") return;

  let html =
    '<div class="container my-5">' +
      '<div class="row g-4">';

  paquetes.forEach(function (paquete) {
    html +=
      '<div class="col-md-4">' +
        '<div class="card h-100 shadow">' +
          '<img src="' + paquete.imagen + '" class="card-img-top" alt="' + paquete.nombre + '">' +
          '<div class="card-body d-flex flex-column">' +
            '<h5 class="card-title">' + paquete.nombre + '</h5>' +
            '<p>' + paquete.dias + '</p>' +
            '<h4 class="text-primary">$' + paquete.precio.toLocaleString() + '</h4>' +
            '<div class="d-grid gap-2 mt-auto">' +
              '<button class="btn btn-outline-primary" onclick="verDetalle(' + paquete.id + ')">Ver detalles</button>' +
              '<button class="btn btn-primary" onclick="agregarCarrito(' + paquete.id + ')">Comprar</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  });

  html += "</div></div>";
  main.innerHTML = html;
}

mostrarPaquetes();

function abrirCarrito() {
  actualizarVistaModal();
  const modalCarrito = document.getElementById("Carrito");
  if (modalCarrito) {
    modalCarrito.classList.add("active");
  }
}

function cerrarCarrito() {
  const modalCarrito = document.getElementById("Carrito");
  if (modalCarrito) {
    modalCarrito.classList.remove("active");
  }
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarVistaModal();
  notificar("Carrito vacío");
}

function calcularTotalCarrito() {
  let total = 0;
  carrito.forEach(function (item) {
    const paquete = obtenerPaquete(item.paqueteId);
    if (paquete) {
      total += paquete.precio * item.pasajeros;
    }
  });
  return total;
}

function procesarPago() {
  limpiarItemsInvalidos();

  if (!carritoTieneItems()) {
    if (typeof Alerta !== "undefined") {
      Alerta.advertencia("Agrega un paquete antes de reservar.", "Carrito vacío");
    } else {
      alert("Tu carrito está vacío");
    }
    return;
  }

  let resumen = "";
  carrito.forEach(function (item) {
    const paquete = obtenerPaquete(item.paqueteId);
    if (!paquete) return;
    const subtotal = paquete.precio * item.pasajeros;
    resumen +=
      "• <b>" + paquete.nombre + "</b> — " +
      item.pasajeros + " pasajero(s) — " +
      "$ " + subtotal.toLocaleString("es-CO") + "<br>";
  });

  const total = calcularTotalCarrito();
  const precioTexto = "$ " + total.toLocaleString("es-CO");

  if (typeof Alerta !== "undefined") {
    Alerta.confirmar(
      "¿Confirmar reserva?",
      resumen + "<br>Total: <b>" + precioTexto + "</b>",
      { confirmar: "Sí, reservar", cancelar: "Seguir buscando" }
    ).then(function (result) {
      if (result.isConfirmed) {
        carrito = [];
        guardarCarrito();
        actualizarVistaModal();
        cerrarCarrito();
        Alerta.exito(
          "Pronto nos comunicaremos contigo para confirmar tus viajes.",
          "¡Reserva enviada!"
        );
      }
    });
  } else {
    alert("Reserva confirmada. Total: " + precioTexto);
    carrito = [];
    guardarCarrito();
    actualizarVistaModal();
    cerrarCarrito();
  }
}

function crearItemHTML(item) {
  const paquete = obtenerPaquete(item.paqueteId);
  if (!paquete) return "";

  const subtotal = paquete.precio * item.pasajeros;

  return (
    '<div class="carrito-item card border border-light-subtle rounded-3 p-3 bg-light-subtle">' +
      '<div class="d-flex gap-3">' +
        '<img src="' + paquete.imagen + '" alt="' + paquete.nombre + '" class="carrito-item-img rounded-3">' +
        '<div class="flex-grow-1">' +
          '<div class="d-flex justify-content-between align-items-start gap-2">' +
            '<div>' +
              '<span class="badge bg-secondary-subtle text-secondary fw-semibold mb-1" style="font-size:10px">PAQUETE</span>' +
              '<h4 class="h6 fw-bold text-dark m-0 mb-1">' + paquete.nombre + '</h4>' +
              '<p class="text-muted small m-0">' + paquete.dias + '</p>' +
            '</div>' +
            '<button class="btn btn-sm btn-link text-danger p-0" onclick="quitarDelCarrito(' + item.paqueteId + ')" aria-label="Quitar">✕</button>' +
          '</div>' +
          '<div class="d-flex align-items-center justify-content-between mt-2 flex-wrap gap-2">' +
            '<span class="fw-bold text-dark">$ ' + subtotal.toLocaleString("es-CO") + '</span>' +
            '<div class="d-flex align-items-center border rounded-2 bg-white px-2 py-1 shadow-sm">' +
              '<button class="btn btn-sm btn-link text-dark text-decoration-none p-0 px-2 fw-bold" onclick="cambiarPasajeros(' + item.paqueteId + ', -1)">-</button>' +
              '<span class="cant-number fw-bold text-dark px-2">' + item.pasajeros + '</span>' +
              '<button class="btn btn-sm btn-link text-dark text-decoration-none p-0 px-2 fw-bold" onclick="cambiarPasajeros(' + item.paqueteId + ', 1)">+</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

function actualizarVistaModal() {
  const carritoVacio = document.getElementById("carritoVacio");
  const carritoDetalle = document.getElementById("carritoDetalle");
  const listaCarrito = document.getElementById("listaCarrito");
  const carritoTotal = document.getElementById("carritoTotal");

  if (!carritoVacio || !carritoDetalle || !listaCarrito) return;

  limpiarItemsInvalidos();

  if (!carritoTieneItems()) {
    carritoVacio.classList.remove("d-none");
    carritoDetalle.classList.add("d-none");
    return;
  }

  carritoVacio.classList.add("d-none");
  carritoDetalle.classList.remove("d-none");

  let html = "";
  carrito.forEach(function (item) {
    html += crearItemHTML(item);
  });

  listaCarrito.innerHTML = html;

  if (carritoTotal) {
    carritoTotal.innerText = "$ " + calcularTotalCarrito().toLocaleString("es-CO");
  }
}

function cambiarPasajeros(paqueteId, cambio) {
  const item = buscarItemCarrito(paqueteId);
  if (!item) return;

  const nuevaCantidad = item.pasajeros + cambio;

  if (nuevaCantidad < 1) {
    quitarDelCarrito(paqueteId);
    return;
  }

  item.pasajeros = nuevaCantidad;
  guardarCarrito();
  actualizarVistaModal();
}

limpiarItemsInvalidos();
actualizarVistaModal();
