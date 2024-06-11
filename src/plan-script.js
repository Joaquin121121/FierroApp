class Ejercicio {
    constructor(id, nombre, nombreImagen, series, reps, peso,){
        this.id = id
        this.nombre = nombre
        this.nombreImagen = nombreImagen
        this.series = series
        this.reps = reps
        this.peso = peso
    }
}
const nombres = ["Press de banca", "Press de banca inclinado", "Pecho máquina", "Mariposa", "Tricep soga", "Tricep polea", "Tricep francés"]

const nombresImagenes = ["PECHO.jpg", "PRESS-INCLINADO.jpeg", "PECHO-MAQUINA.jpg", "MARIPOSA.jpg", "TRICEP-SOGA.jpg", "TRICEP-POLEA.jpg", "TRICEP-FRANCES.jpeg"]

const series = new Array(7).fill(3)

const reps = new Array(7).fill(8)

const pesos = [30, 25, 45, 55, 27, 27, 14]

let ejercicios = []

for(let i = 0; i < 7; i++){
    let ejercicio = new Ejercicio(i+1, nombres[i], nombresImagenes[i], series[i], reps[i], pesos[i])
    ejercicios.push(ejercicio)
}



const cargarEjercicios = () => {
    let seccion = document.getElementById("ejercicios")
    let contenido = ""
    ejercicios.forEach(e => {
        contenido += `        
        <div class="container-ejercicio">
            <div class="container-ejercicio-1">
                <img src="../Imagenes/${e.nombreImagen}" alt="">
            </div>
            <div class="container-ejercicio-2">
                <h1>${e.nombre}</h1>
                <p>Objetivo:
                    ${e.reps} repeticiones x ${e.peso} kgs
                </p>
                <div class="boton-completado" id="boton-completado-${e.id}">
                    <div class="boton-completado-1">
                        <p>Completado</p>
                    </div>
                    <div class="boton-completado-2">
                        <img src="../Imagenes/TICK-VERDE.png" alt="">
                    </div>
                </div>
            </div>
        </div>
`
    })
    seccion.innerHTML = contenido
}

window.onload = cargarEjercicios()