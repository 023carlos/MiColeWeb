function registrarDocente(event) {
  event.preventDefault();

  const tipo = document.getElementById("tipoIdDocente").value;
  const numero = document.getElementById("numIdDocente").value;
  const nombres = document.getElementById("nombresDocente").value.trim();
  const apellidos = document.getElementById("apellidosDocente").value.trim();
  const nacimiento = document.getElementById("fechaNacDocente").value;
  const telefono = document.getElementById("telefonoDocente").value.trim();
  const correo = document.getElementById("correoDocente").value.trim();
  const usuario = document.getElementById("usuarioDocente").value.trim();
  const clave = document.getElementById("claveDocente").value.trim();
  const estado = document.getElementById("estadoDocente").value;
  const fecha = new Date().toISOString().split("T")[0];

  if (!nombres || !apellidos || !correo || !usuario || !clave || !nacimiento || !numero) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  const docentes = JSON.parse(localStorage.getItem("docentes") || "[]");
  const nuevoDocente = {
    id: docentes.length + 1,
    tipo,
    numero,
    nombres,
    apellidos,
    nacimiento,
    telefono,
    correo,
    usuario,
    clave,
    estado,
    fecha
  };

  docentes.push(nuevoDocente);
  localStorage.setItem("docentes", JSON.stringify(docentes));
  document.getElementById("formDocente").reset();
  mostrarDocentes();
}

function mostrarDocentes() {
  const docentes = JSON.parse(localStorage.getItem("docentes") || "[]");
  const tbody = document.querySelector("#tablaDocentes tbody");
  tbody.innerHTML = "";

  docentes.forEach(docente => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${docente.id}</td>
      <td>${docente.nombres} ${docente.apellidos}</td>
      <td>${docente.tipo} ${docente.numero}</td>
      <td>${docente.correo}</td>
      <td>${docente.estado}</td>
      <td>${docente.fecha}</td>
    `;
    tbody.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", mostrarDocentes);
