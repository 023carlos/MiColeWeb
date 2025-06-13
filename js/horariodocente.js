function mostrarHorarioDocente() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const asignaciones = JSON.parse(localStorage.getItem("asignaciones") || "[]");

  const tabla = document.querySelector("#tablaHorarioDocente tbody");
  tabla.innerHTML = "";

  const asignacionesDocente = asignaciones.filter(asig =>
    asig.docente.toLowerCase().includes(usuario.nombre.toLowerCase())
  );

  asignacionesDocente.forEach(asig => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${asig.curso}</td>
      <td>${asig.materia}</td>
      <td>${asig.dia}</td>
      <td>${asig.hora}</td>
    `;
    tabla.appendChild(fila);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  cargarOpcionesAsignacion();
  mostrarAsignaciones();
});


