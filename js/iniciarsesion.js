indenticadornombreLocalStore = "usuarios"

const nombreLocalStore = "usuarios";


function recuperarElementosFormulario() {

    usuarios = leerDataStore(nombreLocalStore)

    nombre = document.getElementById("nombre")
    password = document.getElementById("password")

}


function iniciarSesion() {

    recuperarElementosFormulario()

    usuarioEncontrado = usuarios.find(usuario =>
        usuario.nombre == nombre.value &&
        usuario.password == password.value)

    if (usuarioEncontrado) {

        if (usuarioEncontrado.tipoUsuario == 'administrador') {

            window.location.href = '../html/menuadministrador.html'

        } else if (usuarioEncontrado.tipoUsuario == 'docente') {

            window.location.href = '../html/menudocente.html'

        } else if (usuarioEncontrado.tipoUsuario == 'estudiante') {

            window.location.href = '../html/menuestudiante.html'

        }

    } else {

        alert('El Usuario/password errado')
        nuevo()

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