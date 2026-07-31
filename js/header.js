const modalLogin = `<!-- Modal de Login -->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" data-bs-theme="dark">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-white bg-dark border-secondary shadow-lg">
      
      <!-- Encabezado del Modal -->
      <div class="modal-header border-secondary">
        <h5 class="modal-title fw-bold w-100 text-center" id="loginModalLabel">
          Iniciar Sesión
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Cuerpo / Formulario -->
      <div class="modal-body p-4">
        <form id="formLogin">
          
          <!-- Campo Usuario / Email -->
          <div class="mb-3 text-start">
            <label for="inputUsuario" class="form-label small text-secondary fw-semibold">Email</label>
            <div class="input-group">
              <span class="input-group-text bg-secondary text-white border-secondary"><i class="bi bi-envelope"></i></span>
              <input type="email" class="form-control" id="inputUsuario" placeholder="nombre@ejemplo.com" required>
            </div>
          </div>

          <!-- Campo Contraseña -->
          <div class="mb-3 text-start">
            <label for="inputPassword" class="form-label small text-secondary fw-semibold">Contraseña</label>
            <div class="input-group">
              <span class="input-group-text bg-secondary text-white border-secondary"><i class="bi bi-lock"></i></span>
              <input type="password" class="form-control" id="inputPassword" placeholder="••••••••" required>
            </div>
          </div>

          <!-- Botón de Envío -->
          <button type="submit" class="registro btn btn-primary w-100 fw-bold py-2 shadow-sm">Ingresar</button>

        </form>
      </div>
    </div>
  </div>
</div>`

document.getElementById('modalLogin').innerHTML=modalLogin;

const modalRegistro = `<!-- Modal de Registro -->
<div class="modal fade" id="registroModal" tabindex="-1" aria-labelledby="registroModalLabel" aria-hidden="true" data-bs-theme="dark">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-white bg-dark border-secondary shadow-lg">
      
      <!-- Encabezado con título centrado -->
      <div class="modal-header border-secondary">
        <h5 class="modal-title fw-bold w-100 text-center" id="registroModalLabel">
          Crear una Cuenta
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Cuerpo del Formulario -->
      <div class="modal-body p-4">
        <form id="formRegistro">
          
          <!-- Nombre Completo -->
          <div class="mb-3 text-start">
            <label for="regNombre" class="form-label small text-secondary fw-semibold">Nombre Completo</label>
            <div class="input-group">
              <span class="input-group-text bg-secondary text-white border-secondary"><i class="bi bi-person"></i></span>
              <input type="text" class="form-control" id="regNombre" placeholder="Sebas Rincón" required>
            </div>
          </div>

          <!-- Correo Electrónico -->
          <div class="mb-3 text-start">
            <label for="regEmail" class="form-label small text-secondary fw-semibold">Correo Electrónico</label>
            <div class="input-group">
              <span class="input-group-text bg-secondary text-white border-secondary"><i class="bi bi-envelope"></i></span>
              <input type="email" class="form-control" id="regEmail" placeholder="nombre@ejemplo.com" required>
            </div>
          </div>

          <!-- Contraseña -->
          <div class="mb-3 text-start">
            <label for="regPassword" class="form-label small text-secondary fw-semibold">Contraseña</label>
            <div class="input-group">
              <span class="input-group-text bg-secondary text-white border-secondary"><i class="bi bi-lock"></i></span>
              <input type="password" class="form-control" id="regPassword" placeholder="Crea una contraseña" required>
            </div>
          </div>

          <!-- Confirmar Contraseña -->
          <div class="mb-3 text-start">
            <label for="regConfirmPassword" class="form-label small text-secondary fw-semibold">Confirmar Contraseña</label>
            <div class="input-group">
              <span class="input-group-text bg-secondary text-white border-secondary"><i class="bi bi-shield-lock"></i></span>
              <input type="password" class="form-control" id="regConfirmPassword" placeholder="Repite tu contraseña" required>
            </div>
          </div>

          <!-- Botón de Envío -->
          <button type="submit" class="btn btn-primary w-100 fw-bold py-2 shadow-sm">Registrarse</button>

        </form>
      </div>
    </div>
  </div>
</div>`

document.getElementById('modalRegistro').innerHTML= modalRegistro;

const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("inputUsuario").value.trim();
    const password = document.getElementById("inputPassword").value;

    if (!email || !password) {
      Alerta.advertencia("Completa tu email y contraseña.");
      return;
    }

    Alerta.exito("Sesión iniciada correctamente.", "¡Bienvenido!");
    const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
    if (modal) modal.hide();
    formLogin.reset();
  });
}

const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (password !== confirmPassword) {
      Alerta.error("Las contraseñas no coinciden.");
      return;
    }

    Alerta.exito("Tu cuenta fue creada correctamente.", "¡Registro exitoso!");
    const modal = bootstrap.Modal.getInstance(document.getElementById("registroModal"));
    if (modal) modal.hide();
    formRegistro.reset();
  });
}