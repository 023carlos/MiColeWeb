function mostrarActividadesEstudiante() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const actividades = JSON.parse(localStorage.getItem("actividadesDocente") || "[]");

  const asignaciones = JSON.parse(localStorage.getItem("asignaciones") || "[]");
  const materiasEstudiante = asignaciones
    .filter(asig => asig.curso === usuario.curso)
    .map(asig => asig.materia);

  const actividadesFiltradas = actividades.filter(act =>
    materiasEstudiante.includes(act.materia)
  );

  const tbody = document.querySelector("#tablaActividadesEstudiante tbody");
  tbody.innerHTML = "";

  if (actividadesFiltradas.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>No hay actividades disponibles.</td></tr>";
    return;
  }

  actividadesFiltradas.forEach(act => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${act.nombre}</td>
      <td>${act.materia}</td>
      <td>${act.descripcion}</td>
      <td>${act.fechaLimite}</td>
    `;
    tbody.appendChild(fila);
  });
}
