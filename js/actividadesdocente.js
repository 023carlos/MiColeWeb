function registrarActividadDocente(event) {
  event.preventDefault();

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const nombre = document.getElementById("nombreActividadDocente").value.trim();
  const descripcion = document.getElementById("descripcionActividadDocente").value.trim();
  const materia = document.getElementById("materiaActividadDocente").value;
  const fechaLimite = document.getElementById("fechaLimiteDocente").value;
  const fechaPublicacion = new Date().toISOString().split("T")[0];

  if (!nombre || !descripcion || !materia || !fechaLimite) {
    alert("Todos los campos son obligatorios");
    return;
  }

  const actividades = JSON.parse(localStorage.getItem("actividadesDocente") || "[]");

  const nuevaActividad = {
    docente: usuario.nombre,
    nombre,
    descripcion,
    materia,
    fechaPublicacion,
    fechaLimite
  };

  actividades.push(nuevaActividad);
  localStorage.setItem("actividadesDocente", JSON.stringify(actividades));

  document.getElementById("formActividadDocente").reset();
  mostrarActividadesDocente();
}

function mostrarActividadesDocente() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const actividades = JSON.parse(localStorage.getItem("actividadesDocente") || "[]")
    .filter(act => act.docente === usuario.nombre);

  const tbody = document.querySelector("#tablaActividadesDocente tbody");
  tbody.innerHTML = "";

  if (actividades.length === 0) {
    tbody.innerHTML = <tr><td colspan="5">No hay actividades registradas.</td></tr>;
    return;
  }

  actividades.forEach(act => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${act.nombre}</td>
      <td>${act.materia}</td>
      <td>${act.descripcion}</td>
      <td>${act.fechaPublicacion}</td>
      <td>${act.fechaLimite}</td>
    `;
    tbody.appendChild(fila);
  });
}

function cargarMateriasDocente() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const asignaciones = JSON.parse(localStorage.getItem("asignaciones") || "[]");

  const materiasAsignadas = asignaciones
    .filter(asig =>
      asig.docente.toLowerCase().includes(usuario.nombre.toLowerCase())
    )
    .map(asig => asig.materia);

  const unicas = [...new Set(materiasAsignadas)];
  const select = document.getElementById("materiaActividadDocente");
  select.innerHTML = "<option disabled selected>Seleccione una materia</option>";

  unicas.forEach(materia => {
    const option = document.createElement("option");
    option.value = materia;
    option.textContent = materia;
    select.appendChild(option);
  });
}



document.addEventListener("DOMContentLoaded", () => {
  validarAccesoDocente();
  mostrarHorarioDocente();
  mostrarActividadesDocente();
  cargarMateriasDocente();
});