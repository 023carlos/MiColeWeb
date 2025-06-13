function registrarEstudiante(event) {
  event.preventDefault();

  const tipo = document.getElementById("tipoIdEst").value;
  const numero = document.getElementById("numIdEst").value;
  const nombres = document.getElementById("nombresEst").value.trim();
  const apellidos = document.getElementById("apellidosEst").value.trim();
  const nacimiento = document.getElementById("fechaNacEst").value;
  const telefono = document.getElementById("telefonoEst").value.trim();
  const correo = document.getElementById("correoEst").value.trim();
  const curso = document.getElementById("cursoEst").value;
  const usuario = document.getElementById("usuarioEst").value.trim();
  const clave = document.getElementById("claveEst").value.trim();
  const estado = document.getElementById("estadoEst").value;
  const fecha = new Date().toISOString().split("T")[0];

  if (!nombres || !apellidos || !correo || !usuario || !clave || !nacimiento || !numero || !curso) {
    alert("Todos los campos obligatorios deben estar completos.");
    return;
  }

  const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
  const nuevoEstudiante = {
    id: estudiantes.length + 1,
    tipo,
    numero,
    nombres,
    apellidos,
    nacimiento,
    telefono,
    correo,
    curso,
    usuario,
    clave,
    estado,
    fecha
  };

  estudiantes.push(nuevoEstudiante);
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  document.getElementById("formEstudiante").reset();
  mostrarEstudiantes();
}

function mostrarEstudiantes() {
  const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
  const tbody = document.querySelector("#tablaEstudiantes tbody");
  tbody.innerHTML = "";

  estudiantes.forEach(est => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${est.id}</td>
      <td>${est.nombres} ${est.apellidos}</td>
      <td>${est.tipo} ${est.numero}</td>
      <td>${est.correo}</td>
      <td>${est.curso}</td>
      <td>${est.estado}</td>
      <td>${est.fecha}</td>
    `;
    tbody.appendChild(fila);
  });
}

function cargarCursosEstudiante() {
  const cursos = JSON.parse(localStorage.getItem("cursos") || "[]");
  const select = document.getElementById("cursoEst");
  select.innerHTML = "<option value='' disabled selected>Seleccione un curso</option>";

  cursos.forEach(curso => {
    const option = document.createElement("option");
    option.value = curso.nombre;
    option.textContent = curso.nombre;
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarEstudiantes();
  cargarCursosEstudiante();
});