// Modal de paquetes — Juan Carlos
// cart.js llama: abrirModalPaquete(id)

let instanciaModal = null;

function formatearPrecio(precio) {
  return "$ " + precio.toLocaleString("es-CO");
}

function abrirModalPaquete(id) {
  const paquete = paquetes.find(function (p) { return p.id === id; });
  if (!paquete) return;

  const incluye = paquete.incluye || [
    "Vuelo ida y vuelta",
    "Hotel con desayuno",
    "Traslados incluidos",
  ];

  const listaIncluye = incluye.map(function (item) {
    return "<li>✔ " + item + "</li>";
  }).join("");

  document.getElementById("packageModalContent").innerHTML =
    '<div class="modal-scroll">' +
      '<div class="modal-imagen-contenedor">' +
        '<img src="' + paquete.imagen + '" alt="' + paquete.nombre + '" class="modal-imagen">' +
        '<button type="button" class="modal-cerrar" data-bs-dismiss="modal" aria-label="Cerrar">✕</button>' +
      '</div>' +
      '<div class="modal-cuerpo">' +
        '<h2 class="modal-titulo" id="packageModalLabel">' + paquete.nombre + '</h2>' +
        '<p class="modal-duracion">🗓 ' + paquete.dias + '</p>' +
        '<section class="modal-seccion">' +
          '<h3 class="modal-seccion-titulo">¿Qué incluye?</h3>' +
          '<ul class="modal-lista">' + listaIncluye + '</ul>' +
        '</section>' +
      '</div>' +
    '</div>' +
    '<footer class="modal-pie">' +
      '<div class="modal-precio">' +
        '<p class="modal-precio-actual">' + formatearPrecio(paquete.precio) + '</p>' +
        '<p class="modal-precio-texto">por persona</p>' +
      '</div>' +
      '<button type="button" class="modal-boton" id="btnAgregarCarrito">Agregar al carrito</button>' +
    '</footer>';

  document.getElementById("btnAgregarCarrito").onclick = function () {
    if (typeof agregarCarrito !== "function") return;
    agregarCarrito(paquete.id);
    this.textContent = "¡Agregado!";
    this.disabled = true;
    setTimeout(function () {
      this.textContent = "Agregar al carrito";
      this.disabled = false;
    }.bind(this), 2000);
    if (instanciaModal) instanciaModal.hide();
  };

  if (!instanciaModal) iniciarModal();
  instanciaModal.show();
}

function iniciarModal() {
  const modal = document.getElementById("packageModal");
  if (!modal) return;

  instanciaModal = new bootstrap.Modal(modal);
  modal.addEventListener("hidden.bs.modal", function () {
    document.getElementById("packageModalContent").innerHTML = "";
  });
}

document.addEventListener("DOMContentLoaded", iniciarModal);
