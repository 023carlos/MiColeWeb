function registrarActividad(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombreActividad").value.trim();
  const descripcion = document.getElementById("descripcionActividad").value.trim();
  const materia = document.getElementById("materiaActividad").value;
  const fechaLimite = document.getElementById("fechaLimiteActividad").value;
  const fechaPublicacion = new Date().toISOString().split("T")[0];

  if (!nombre || !descripcion || !materia || !fechaLimite) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const actividades = JSON.parse(localStorage.getItem("actividades") || "[]");
  const nuevaActividad = {
    id: actividades.length + 1,
    nombre,
    descripcion,
    materia,
    fechaPublicacion,
    fechaLimite
  };

  actividades.push(nuevaActividad);
  localStorage.setItem("actividades", JSON.stringify(actividades));
  document.getElementById("formActividad").reset();
  mostrarActividades();
}

function mostrarActividades() {
  const actividades = JSON.parse(localStorage.getItem("actividades") || "[]");
  const tbody = document.querySelector("#tablaActividades tbody");
  tbody.innerHTML = "";

  actividades.forEach(act => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${act.id}</td>
      <td>${act.nombre}</td>
      <td>${act.materia}</td>
      <td>${act.descripcion}</td>
      <td>${act.fechaPublicacion}</td>
      <td>${act.fechaLimite}</td>
    `;
    tbody.appendChild(fila);
  });
}

function cargarMateriasParaActividad() {
  const materias = JSON.parse(localStorage.getItem("materias") || "[]");
  const select = document.getElementById("materiaActividad");
  select.innerHTML = "<option value='' disabled selected>Seleccione una materia</option>";

  materias.forEach(materia => {
    const option = document.createElement("option");
    option.value = materia.nombre;
    option.textContent = materia.nombre;
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarActividades();
  cargarMateriasParaActividad();
});