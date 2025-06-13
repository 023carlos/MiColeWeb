function mostrarHorarioEstudiante() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const asignaciones = JSON.parse(localStorage.getItem("asignaciones") || "[]");

  const tabla = document.querySelector("#tablaHorarioEstudiante tbody");
  tabla.innerHTML = "";

  const asignacionesEstudiante = asignaciones.filter(asig => asig.curso === usuario.curso);

  asignacionesEstudiante.forEach(asig => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${asig.materia}</td>
      <td>${asig.docente}</td>
      <td>${asig.dia}</td>
      <td>${asig.hora}</td>
    `;
    tabla.appendChild(fila);
  });
}
