let pantalla = "Nuevo"



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
setObjetivo("hipertrofia")
