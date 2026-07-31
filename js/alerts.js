// Alertas con SweetAlert2 — uso compartido del equipo

const Alerta = {
  toast(mensaje) {
    return Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  },

  exito(mensaje, titulo) {
    return Swal.fire({
      icon: "success",
      title: titulo || "¡Listo!",
      text: mensaje,
      confirmButtonColor: "#2b6cb0",
    });
  },

  error(mensaje, titulo) {
    return Swal.fire({
      icon: "error",
      title: titulo || "Error",
      text: mensaje,
      confirmButtonColor: "#2b6cb0",
    });
  },

  advertencia(mensaje, titulo) {
    return Swal.fire({
      icon: "warning",
      title: titulo || "Atención",
      text: mensaje,
      confirmButtonColor: "#2b6cb0",
    });
  },

  confirmar(titulo, html, opciones) {
    opciones = opciones || {};
    return Swal.fire({
      title: titulo,
      html: html,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: opciones.confirmar || "Confirmar",
      cancelButtonText: opciones.cancelar || "Cancelar",
      confirmButtonColor: "#2b6cb0",
    });
  },
};
