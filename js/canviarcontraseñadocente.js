function cambiarClaveDocente(event) {
  event.preventDefault();

  const actual = document.getElementById("claveActualDocente").value;
  const nueva = document.getElementById("nuevaClaveDocente").value;
  const confirmar = document.getElementById("confirmarClaveDocente").value;

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const docentes = JSON.parse(localStorage.getItem("docentes") || "[]");

  const docente = docentes.find(d => d.usuario === usuario.nombre);

  if (!docente) {
    alert("Usuario no encontrado.");
    return;
  }

  if (docente.clave !== actual) {
    alert("La contraseña actual es incorrecta.");
    return;
  }

  if (nueva !== confirmar) {
    alert("Las nuevas contraseñas no coinciden.");
    return;
  }

  docente.clave = nueva;
  localStorage.setItem("docentes", JSON.stringify(docentes));
  alert("Contraseña actualizada correctamente.");
  document.getElementById("formCambioClaveDocente").reset();
}