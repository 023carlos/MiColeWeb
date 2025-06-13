function mostrarSeccion(id) {
  // 1. Selecciona todos los elementos con la clase "seccion"
  const secciones = document.querySelectorAll('.seccion');

  // 2. Recorre cada una de esas secciones y las oculta
  secciones.forEach(sec => sec.style.display = 'none');

  // 3. Busca la sección con el ID que se pasa como parámetro
  const activa = document.getElementById(id);

  // 4. Si la encuentra, la muestra
  if (activa) activa.style.display = 'block';
}

function cerrarSesion() {
  const confirmar = confirm("¿Deseas cerrar sesión?");
  if (confirmar) {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("tipoUsuario");
    window.location.href = "../html/iniciosecion.html"; 
  }
}