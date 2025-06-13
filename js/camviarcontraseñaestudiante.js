function cambiarClaveEstudiante(event) {
  event.preventDefault();

  const actual = document.getElementById("claveActualEstudiante").value;
  const nueva = document.getElementById("nuevaClaveEstudiante").value;
  const confirmar = document.getElementById("confirmarClaveEstudiante").value;

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");

  const estudiante = estudiantes.find(e => e.usuario === usuario.nombre);

  if (!estudiante) {
    alert("Usuario no encontrado.");
    return;
  }

  if (estudiante.clave !== actual) {
    alert("La contraseña actual es incorrecta.");
    return;
  }

  if (nueva !== confirmar) {
    alert("Las nuevas contraseñas no coinciden.");
    return;
  }

  estudiante.clave = nueva;
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  alert("Contraseña actualizada correctamente.");
  document.getElementById("formCambioClaveEstudiante").reset();
}
