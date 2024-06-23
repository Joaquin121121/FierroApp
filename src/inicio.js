const btnRegistrar = document.getElementById("registrarse")
const btnIniciarSesion = document.getElementById("iniciarSesion")
const modalConfirmar = document.getElementById("modalConfirmar")

const tituloModalConfirmar = document.getElementById("tituloModalConfirmar")
const bodyModalConfirmar = document.getElementById("bodyModalConfirmar")
const inputUsuario = document.getElementById("inputUsuario")







btnIniciarSesion.addEventListener("click", () => {
    if (inputUsuario.value.trim().length === 0) {
        $("#modalErrorVacio").modal("show"); 
    } else {
        bodyModalConfirmar.textContent = `Vas a crear el usuario ${inputUsuario.value}. ¿Desea continuar?`;
        
        $("#modalConfirmar").modal("show");
    }
})