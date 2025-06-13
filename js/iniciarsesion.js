indenticadornombreLocalStore = "usuarios"

const nombreLocalStore = "usuarios";


function recuperarElementosFormulario() {

    usuarios = leerDataStore(nombreLocalStore)

    nombre = document.getElementById("nombre")
    password = document.getElementById("password")

}


function iniciarSesion() {
    recuperarElementosFormulario();

    const admins = leerDataStore("usuarios") || [];
    const docentes = leerDataStore("docentes") || [];
    const estudiantes = leerDataStore("estudiantes") || [];

    const nombreInput = nombre.value.trim();
    const passInput = password.value.trim();

    // Buscar en administradores
    let usuarioEncontrado = admins.find(usuario =>
        usuario.nombre === nombreInput && usuario.password === passInput);

    if (!usuarioEncontrado) {
        // Buscar en docentes
        const docente = docentes.find(d =>
            d.usuario === nombreInput && d.clave === passInput);
        if (docente) {
            usuarioEncontrado = new Usuario(docente.usuario, docente.clave, "docente");
        }
    }

    if (!usuarioEncontrado) {
        // Buscar en estudiantes
        const estudiante = estudiantes.find(e =>
            e.usuario === nombreInput && e.clave === passInput);
        if (estudiante) {
            usuarioEncontrado = new Usuario(estudiante.usuario, estudiante.clave, "estudiante");
        }
    }

    if (usuarioEncontrado) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
        localStorage.setItem("tipoUsuario", usuarioEncontrado.tipoUsuario);

        if (usuarioEncontrado.tipoUsuario === "administrador") {
            window.location.href = "../html/menuadministrador.html";
        } else if (usuarioEncontrado.tipoUsuario === "docente") {
            window.location.href = "../html/menudocente.html";
        } else if (usuarioEncontrado.tipoUsuario === "estudiante") {
            window.location.href = "../html/menuestudiante.html";
        }
    } else {
        alert("Usuario o contraseña incorrectos");
        nuevo();
    }
}


function nuevo() {

    document.getElementById("usuarios").reset();
    nombre.focus()
}

function crearUsuarioAdministrador() {

    usuarios = leerDataStore(nombreLocalStore)

    usuarioEncontrado = usuarios.find(usuario =>
        usuario.nombre == 'admin')

    if (!usuarioEncontrado) {

        usuario = new Usuario('admin', '123', 'administrador')

        escribirDataStore(nombreLocalStore, usuario, usuarios)

    }

}

function removerLocalStore() {

    localStorage.removeItem('usuarios')
}