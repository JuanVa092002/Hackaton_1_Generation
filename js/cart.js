

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let cantidadPasajeros = 1; // Variable para controlar los pasajeros

function agregarCarrito(id) {
    const paquete = paquetes.find(p => p.id === id);

    if (!paquete) return;

    carrito.push(paquete);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // notificación 
    const contenedor = document.getElementById("toastContainer");
    if (contenedor) {
        contenedor.innerHTML = `
            <div class="toast modal-mensaje show" role="alert">
                <div class="toast-body">✓ ${paquete.nombre} agregado al carrito</div>
            </div>
        `;
        setTimeout(function () {
            contenedor.innerHTML = "";
        }, 2500);
    } else {
        alert(`${paquete.nombre} agregado al carrito`);
    }

    // Reinicia los pasajeros a 1, actualiza la vista y abre el modal
    cantidadPasajeros = 1;
    actualizarVistaModal();
    abrirCarrito();
}

function verDetalle(id) {
    if (typeof abrirModalPaquete === "function") {
        abrirModalPaquete(id);
    }
}

const main = document.getElementById("main");

function mostrarPaquetes() {
    if (!main || typeof paquetes === "undefined") return;

    let html = `
        <div class="container my-5">
            <div class="row g-4">
    `;

    paquetes.forEach(paquete => {
        html += `
            <div class="col-md-4">
                <div class="card h-100 shadow">

                    <img src="${paquete.imagen}" class="card-img-top" alt="${paquete.nombre}">

                    <div class="card-body d-flex flex-column">

                        <h5 class="card-title">${paquete.nombre}</h5>

                        <p>${paquete.dias}</p>

                        <h4 class="text-primary">$${paquete.precio.toLocaleString()}</h4>

                        <div class="d-grid gap-2 mt-auto">

                            <button class="btn btn-outline-primary"
                                    onclick="verDetalle(${paquete.id})">
                                Ver detalles
                            </button>

                            <button class="btn btn-primary"
                                    onclick="agregarCarrito(${paquete.id})">
                                Comprar
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    main.innerHTML = html;
}

mostrarPaquetes();

function abrirCarrito() {
    actualizarVistaModal(); 
    const modalCarrito = document.getElementById('Carrito');
    if (modalCarrito) {
        modalCarrito.classList.add('active');
    }
} 

function cerrarCarrito() {
    const modalCarrito = document.getElementById('Carrito');
    if (modalCarrito) {
        modalCarrito.classList.remove('active');
    }
}

function procesarPago() {
    const tripPriceElem = document.getElementById('tripPrice');
    const precioTexto = tripPriceElem ? tripPriceElem.innerText : "$ 0";
    alert(`Procediendo al pago para ${cantidadPasajeros} pasajero(s). Total: ${precioTexto}`);
}


// Pinta los datos del producto en el modal según el carrito
function actualizarVistaModal() {
    const carritoVacio = document.getElementById("carritoVacio");
    const carritoDetalle = document.getElementById("carritoDetalle");

    if (!carritoVacio || !carritoDetalle) return;

    // Si el carrito no tiene elementos
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoDetalle.classList.add("d-none");
        return;
    }

    // Si hay elementos, mostramos los detalles
    carritoVacio.classList.add("d-none");
    carritoDetalle.classList.remove("d-none");

    // Tomamos el último viaje agregado
    const item = carrito[carrito.length - 1];

    // Asignamos datos al HTML 
    const imgElem = document.getElementById("tripImage");
    const titleElem = document.getElementById("tripTitle");
    const subElem = document.getElementById("tripSubtitle");

    if (imgElem) imgElem.src = item.imagen;
    if (titleElem) titleElem.innerText = item.nombre;
    if (subElem) subElem.innerText = item.dias || "Paquete de viaje";

    calcularTotales();
}

// Responde a los botones + y - 
function cambiarPasajeros(cambio) {
    if (carrito.length === 0) return;

    const nuevaCantidad = cantidadPasajeros + cambio;
    if (nuevaCantidad >= 1) {
        cantidadPasajeros = nuevaCantidad;
        calcularTotales();
    }
}

// Multiplica el precio base por la cantidad de pasajeros
function calcularTotales() {
    if (carrito.length === 0) return;

    const item = carrito[carrito.length - 1];
    const total = item.precio * cantidadPasajeros;
    const precioViejo = (item.precio / 0.8) * cantidadPasajeros;

    const countElem = document.getElementById("passengerCount");
    const priceElem = document.getElementById("tripPrice");
    const oldPriceElem = document.getElementById("tripOldPrice");

    if (countElem) countElem.innerText = cantidadPasajeros;
    if (priceElem) priceElem.innerText = `$ ${total.toLocaleString('es-CO')}`;
    if (oldPriceElem) oldPriceElem.innerText = `$ ${Math.round(precioViejo).toLocaleString('es-CO')}`;
}