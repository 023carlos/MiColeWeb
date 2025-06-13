function registrarAsignacion(event) {
  event.preventDefault();

  const curso = document.getElementById("cursoAsignacion").value;
  const materia = document.getElementById("materiaAsignacion").value;
  const docente = document.getElementById("docenteAsignacion").value;
  const dia = document.getElementById("diaAsignacion").value;
  const hora = document.getElementById("horaAsignacion").value.trim();

  if (!hora.includes(":") || !hora.includes("-")) {
    alert("Formato de hora inválido. Usa: HH:MM - HH:MM");
    return;
  }

  const asignaciones = JSON.parse(localStorage.getItem("asignaciones") || "[]");
  const nuevaAsignacion = {
    curso,
    materia,
    docente,
    dia,
    hora
  };

  asignaciones.push(nuevaAsignacion);
  localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
  document.getElementById("formAsignacion").reset();
  mostrarAsignaciones();
}

function mostrarAsignaciones() {
  const asignaciones = JSON.parse(localStorage.getItem("asignaciones") || "[]");
  const tbody = document.querySelector("#tablaAsignaciones tbody");
  tbody.innerHTML = "";

  asignaciones.forEach(asig => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${asig.curso}</td>
      <td>${asig.materia}</td>
      <td>${asig.docente}</td>
      <td>${asig.dia}</td>
      <td>${asig.hora}</td>
    `;
    tbody.appendChild(fila);
  });
}

function cargarOpcionesAsignacion() {
  const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
  const materias = JSON.parse(localStorage.getItem("materias") || "[]");
  const docentes = JSON.parse(localStorage.getItem("docentes") || "[]");

  const selectCurso = document.getElementById("cursoAsignacion");
  const selectMateria = document.getElementById("materiaAsignacion");
  const selectDocente = document.getElementById("docenteAsignacion");

  selectCurso.innerHTML = "<option disabled selected>Seleccione un curso</option>";
  selectMateria.innerHTML = "<option disabled selected>Seleccione una materia</option>";
  selectDocente.innerHTML = "<option disabled selected>Seleccione un docente</option>";

  cursos
    .filter(curso => curso.estado === "activo")
    .forEach(curso => {
      const option = document.createElement("option");
      option.value = curso.nombre;
      option.textContent = curso.nombre;
      selectCurso.appendChild(option);
    });

  materias
    .filter(materia => materia.estado === "activo")
    .forEach(materia => {
      const option = document.createElement("option");
      option.value = materia.nombre;
      option.textContent = materia.nombre;
      selectMateria.appendChild(option);
    });

  docentes
    .filter(docente => docente.estado === "activo")
    .forEach(doc => {
      const option = document.createElement("option");
      option.value = doc.nombres + " " + doc.apellidos;
      option.textContent = doc.nombres + " " + doc.apellidos;
      selectDocente.appendChild(option);
    });
}



document.addEventListener("DOMContentLoaded", () => {
  cargarOpcionesAsignacion();
  mostrarAsignaciones();
});