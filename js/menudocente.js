document.addEventListener("DOMContentLoaded", () => {
  // Asociar botón cerrar sesión
  const btnCerrar = document.getElementById("btnCerrarSesion");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarSesion);
  }

  validarAccesoDocente();
});

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("tipoUsuario");
  window.location.href = "../html/iniciosecion.html"; 
}

function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function validarAccesoDocente() {
  const tipo = localStorage.getItem("tipoUsuario");
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (tipo !== "docente" || !usuario) {
    alert("Acceso no autorizado");
    window.location.href = "../html/iniciosecion.html";
    return;
  }

  document.getElementById("nombreDocente").textContent = ` ${usuario.nombre}`;
}
