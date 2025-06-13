function registrarCurso(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombreCurso").value.trim();
  const estado = document.getElementById("estadoCurso").value;
  const fecha = new Date().toISOString().split("T")[0];

  if (!nombre) {
    alert("El nombre del curso es obligatorio");
    return;
  }

  const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
  const nuevoCurso = {
    id: cursos.length + 1,
    nombre,
    estado,
    fecha
  };

  cursos.push(nuevoCurso);
  localStorage.setItem("cursos", JSON.stringify(cursos));

  document.getElementById("formCurso").reset();
  mostrarCursos();
}

function mostrarCursos() {
  const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
  const tbody = document.querySelector("#tablaCursos tbody");
  tbody.innerHTML = "";

  cursos.forEach(curso => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${curso.id}</td>
      <td>${curso.nombre}</td>
      <td>${curso.estado}</td>
      <td>${curso.fecha}</td>
    `;
    tbody.appendChild(fila);
  });
}

// Mostrar cursos al cargar la sección
document.addEventListener("DOMContentLoaded", mostrarCursos);
