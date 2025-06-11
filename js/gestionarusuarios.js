nombreLocalStore = "usuarios"

function recuperarElementosFormulario() {

    usuarios = leerDataStore(nombreLocalStore)

    nombre = document.getElementById("nombre")
    password = document.getElementById("password")
    tipoUsuario = document.getElementById("tipoUsuario")

}   

function guardar() {

    recuperarElementosFormulario()

    usuario = new Usuario(nombre.value,password.value,
        tipoUsuario.value)
    
    escribirDataStore(nombreLocalStore,usuario,usuarios)

    alert("Usuario ha sido insertado con exito")

    console.table(usuarios)

    nuevo()


}

function nuevo() {

    document.getElementById("usuarios").reset();
    nombre.focus()
}