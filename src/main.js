import { initializeApp } from "firebase/app"
import { addDoc, collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDFhZxCT21s5aJXfZlSuV0cEJrM9xGQ72A",
    authDomain: "fierro-app.firebaseapp.com",
    projectId: "fierro-app",
    storageBucket: "fierro-app.appspot.com",
    messagingSenderId: "805835831252",
    appId: "1:805835831252:web:959f12a510a79d5412c841",
    measurementId: "G-RBVQ4W3Q5D"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


const pantallaNuevo = () => {
    const slider_sesiones = document.getElementById("slider-sesiones")
    const slider_duracion = document.getElementById("slider-duracion")
    const pill_sesiones = document.getElementById("pill-sesiones")
    const pill_duracion = document.getElementById("pill-duracion")
    const progreso_sesiones = document.getElementById("progreso-sesiones")
    const progreso_duracion = document.getElementById("progreso-duracion")
    const initial_width_sesiones = slider_sesiones.getBoundingClientRect().left 
    const initial_width_duracion = slider_duracion.getBoundingClientRect().left
    const counter_duracion = document.getElementById("counter-duracion")
    const counter_sesiones = document.getElementById("counter-sesiones")
    const container_fuerza = document.getElementById("fuerza")
    const container_hipertrofia = document.getElementById("hipertrofia")
    const container_funcional = document.getElementById("funcional")
    const boton_comenzar = document.getElementById("comenzar")
    const boton_volver = document.getElementById("volver")
    const display_usuario = document.getElementById("usuario")
    const usuario = localStorage.getItem("username")
    let objetivo_plan = "hipertrofia"
    let objetivo_anterior = null
    

    const actualizarSesiones = (factor) => {
        if(factor <= 0.4){
            counter_sesiones.innerText = 2
        }else if(0.4 < factor && factor <= 0.6){
            counter_sesiones.innerText = 3
        }else if(0.6 < factor && factor <= 0.8){
            counter_sesiones.innerText = 4
        }else{
            counter_sesiones.innerText = 5
        }
    }
    
    const actualizarDuracion = (factor) => {
        if(factor <= 0.2){
            counter_duracion.innerText = 40
        }else if(0.2 < factor && factor <= 0.3){
            counter_duracion.innerText = 50
        }else if(0.3 < factor && factor <= 0.4){
            counter_duracion.innerText = 60
        }else if(0.4 < factor && factor <= 0.5){
            counter_duracion.innerText = 70
        }else if(0.5 < factor && factor <= 0.6){
            counter_duracion.innerText = 80
        }else if(0.6 < factor && factor <= 0.7){
            counter_duracion.innerText = 90
        }else if(0.7 < factor && factor <= 0.8){
            counter_duracion.innerText = 100
        }else if(0.8 < factor && factor <= 0.9){
            counter_duracion.innerText = 110
        }else{
            counter_duracion.innerText = 120
        }
    }
    
    const setObjetivo = (obj) => {
        objetivo_plan = obj
        let container = document.getElementById(obj)
        container.style.borderColor = "#0989FF"
        container.style.borderWidth = "thick"
        if(objetivo_anterior && objetivo_anterior !== obj){
            let container_anterior = document.getElementById(objetivo_anterior)
            container_anterior.style.borderColor = "#D9D9D9"
            container_anterior.style.borderWidth = "thin"
        }
        objetivo_anterior = obj
    }
    
    const onMouseMoveSesiones = (event) => {
        let posX = event.clientX
        let newWidth = posX - initial_width_sesiones
        let minWidth = slider_sesiones.offsetWidth * 0.1
    
    
        if (newWidth < minWidth) newWidth = minWidth
        if (newWidth > slider_sesiones.offsetWidth) newWidth = slider_sesiones.offsetWidth
    
        progreso_sesiones.style.width = `${newWidth}px`
        actualizarSesiones(newWidth / slider_sesiones.offsetWidth)
    }
    
    const onMouseMoveDuracion = (event) => {
        let posX = event.clientX
        let newWidth = posX - initial_width_duracion
        let minWidth = slider_duracion.offsetWidth * 0.1
    
        if (newWidth < minWidth) newWidth = minWidth
        if (newWidth > slider_duracion.offsetWidth) newWidth = slider_duracion.offsetWidth
    
        progreso_duracion.style.width = `${newWidth}px`
        actualizarDuracion(newWidth / slider_duracion.offsetWidth)
    }
    
    const onMouseUpSesiones = () => {
        document.removeEventListener("mousemove", onMouseMoveSesiones)
        document.removeEventListener("mouseup", onMouseUpSesiones)
    }
    
    const onMouseUpDuracion = () => {
        document.removeEventListener("mousemove", onMouseMoveDuracion)
        document.removeEventListener("mouseup", onMouseUpDuracion)
    }
    
    const onMouseDownSesiones = () => {
        document.addEventListener("mousemove", onMouseMoveSesiones)
        document.addEventListener("mouseup", onMouseUpSesiones) 
    }    
    
    const onMouseDownDuracion = () => {
        document.addEventListener("mousemove", onMouseMoveDuracion)
        document.addEventListener("mouseup", onMouseUpDuracion) 
    }

    display_usuario.innerText = usuario
    setObjetivo(objetivo_plan)
    pill_sesiones.addEventListener("mousedown", onMouseDownSesiones)
    pill_duracion.addEventListener("mousedown", onMouseDownDuracion)
    container_fuerza.addEventListener("mousedown", () => {
        setObjetivo("fuerza")
    })
    container_hipertrofia.addEventListener("mousedown", () => {
        setObjetivo("hipertrofia")
    })
    container_funcional.addEventListener("mousedown", () => {
        setObjetivo("funcional")
    })
    boton_volver.addEventListener("click", () => {
        cargarPagina("Inicio")
    })
    }


const pantallaLogin = () => {
    const boton_ingresar = document.getElementById("ingresar")
    const boton_registrar = document.getElementById("registrar")
    const input_usuario = document.getElementById("usuario")
    const input_contraseña = document.getElementById("contraseña")
    const error_usuario = document.getElementById("error-usuario")
    const error_contraseña = document.getElementById("error-contraseña")
    const usuarios = collection(db, "usuarios")

    const mostrarError = (error) => {
        if(error === "contraseña"){
            error_contraseña.innerText = "Contraseña incorrecta."
        }else{
            error_usuario.innerText = "El usuario ingresado no existe"
        }
    }

    const validarUsuario = async(usuario) =>{
        const queryUsuarios = query(usuarios, where("nombre","==", usuario))
        const snap = await getDocs(queryUsuarios)

        if (usuario.length < 4){
            error_usuario.innerText = "Su usuario debe tener por lo menos 4 caracteres"
            return false
        }
        if(usuario.includes(" ")){
            error_usuario.innerText = "Su usuario no puede contener espacios"
            return false
        }
        if(usuario.length > 15){
            error_usuario.innerText = "Su usuario no debe tener más de 15 caracteres"
            return false
        }
        if(!snap.empty){
            error_usuario.innerText = "El usuario ya existe"
            return false
        }

        return true
    }

    const validarContraseña = (contraseña) =>{
        if (contraseña.length < 4){
            error_contraseña.innerText = "Su contraseña debe tener por lo menos 4 caracteres"
            return false
        }else if(contraseña.includes(" ")){
            error_contraseña.innerText = "Su contraseña no puede contener espacios"
            return false
        }else if(contraseña.length > 15){
            error_contraseña.innerText = "Su contraseña no debe tener más de 15 caracteres"
            return false
        }
        return true
    }

    input_contraseña.addEventListener("input", () =>{error_contraseña.innerText = ""})
    input_usuario.addEventListener("input", () =>{error_usuario.innerText = ""})

    boton_ingresar.addEventListener("click", async()=>{

        let usuario = input_usuario.value
        const queryUsuarios = query(usuarios, where("nombre","==", usuario))
        const snap = await getDocs(queryUsuarios)
        if(!snap.empty){
            const userdata = snap.docs[0].data()
            if(userdata.contraseña === input_contraseña.value){
                localStorage.setItem("userdata", JSON.stringify(userdata))
                if(userdata.tienePlan){
                    cargarPagina("Main")
                }
                else{
                    cargarPagina("Inicio")
                }
            }else{
                mostrarError("contraseña")
            }
        }else{
            mostrarError("usuario")
        }
        })
    boton_registrar.addEventListener("click", async() =>{

        const usuarioValido = await validarUsuario(input_usuario.value)
        const contraseñaValida = validarContraseña(input_contraseña.value)

        if(usuarioValido && contraseñaValida){
            let newUser = {
                nombre : input_usuario.value,
                contraseña : input_contraseña.value, 
                sesiones : 0, 
                racha : 0, 
                sesiones_completadas : 0, 
                tienePlan : false
            }
            await addDoc(collection(db, "usuarios"), newUser)
            localStorage.setItem("userdata", JSON.stringify(newUser))
            cargarPagina("Inicio")
        }
    })
    
}


const pantallaInicio = () => {
    const boton_nuevo = document.getElementById("nuevo")
    const display_usuario = document.getElementById("usuario")
    const usuario = JSON.parse(localStorage.getItem("userdata")).nombre

    display_usuario.innerText = usuario
    boton_nuevo.addEventListener("click", ()=>{cargarPagina("Nuevo")})
}


const pantallaMain = () => {    
    const display_racha = document.getElementById("racha")
    const display_sesiones = document.getElementById("sesiones")

    const userdata = JSON.parse(localStorage.getItem("userdata"))
    console.log(userdata)
    display_sesiones.innerText = `${userdata.sesiones_completadas}/${userdata.sesiones}`
    display_racha.innerText = userdata.racha
}



const cargarPagina = (pantalla) => {
    if(pantalla === "Nuevo"){
        window.location.assign("nuevo-1.html")
    }else if(pantalla === "Login"){
        window.location.assign("login.html")
    }else if(pantalla === "Inicio"){
        window.location.assign("inicio.html")
    }else if(pantalla === "Main"){
        window.location.assign("main.html")
    }
}


document.addEventListener("DOMContentLoaded", () => {
    let title = document.title
    console.log(title)
    if(title === "Login"){
        pantallaLogin()
    }else if(title === "Inicio"){
        pantallaInicio()
    }else if(title === "Nuevo"){
        pantallaNuevo()
    }else if(title === "Main"){
        pantallaMain()
    }
})




