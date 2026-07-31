let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarCarrito(id) {

    const paquete = paquetes.find(p => p.id === id);

    carrito.push(paquete);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`${paquete.nombre} agregado al carrito`);
}


function verDetalle(id) {

const paquete = paquetes.find(p => p.id === id);

    alert(`
Destino: ${paquete.nombre}
Duración: ${paquete.dias}
Precio: $${paquete.precio.toLocaleString()}
    `);
}


const main = document.getElementById("main");

function mostrarPaquetes() {

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