function registrarMateria(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombreMateria").value.trim();
  const descripcion = document.getElementById("descripcionMateria").value.trim();
  const estado = document.getElementById("estadoMateria").value;
  const fecha = new Date().toISOString().split("T")[0];

  if (!nombre || !descripcion) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const materias = JSON.parse(localStorage.getItem("materias") || "[]");
  const nuevaMateria = {
    id: materias.length + 1,
    nombre,
    descripcion,
    estado,
    fecha
  };

  materias.push(nuevaMateria);
  localStorage.setItem("materias", JSON.stringify(materias));
  document.getElementById("formMateria").reset();
  mostrarMaterias();
}

function mostrarMaterias() {
  const materias = JSON.parse(localStorage.getItem("materias") || "[]");
  const tbody = document.querySelector("#tablaMaterias tbody");
  tbody.innerHTML = "";

  materias.forEach(materia => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${materia.id}</td>
      <td>${materia.nombre}</td>
      <td>${materia.descripcion}</td>
      <td>${materia.estado}</td>
      <td>${materia.fecha}</td>
    `;
    tbody.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", mostrarMaterias);