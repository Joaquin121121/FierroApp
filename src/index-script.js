let pecho = {
    nombre: "Pecho",
    duracion: 90,
    rutaImagen : "../Imagenes/PECHO.jpg",
    ejercicios : 7
}

let espalda = {
    nombre: "Espalda",
    duracion: 90,
    rutaImagen : "../Imagenes/ESPALDA.jpeg",
    ejercicios : 6
}

let hombros = {
    nombre: "Hombros",
    duracion: 60,
    rutaImagen : "../Imagenes/HOMBROS.jpg",
    ejercicios : 4
}

let planes = [pecho, espalda, hombros]

const cargarPlanes = () => {
    let seccion = document.getElementById("planes")
    let contenido = ""
    planes.forEach(plan => {
        contenido += `
        <div class="container-ejercicio">
            <div class="container-ejercicio-1">
                <img src="${plan.rutaImagen}" alt="">
            </div>
            <div class="container-ejercicio-2">
                <h1>${plan.nombre}</h1>
                <p>Duración: ${plan.duracion} minutos</p>
                <p>Ejercicios: ${plan.ejercicios}</p>
                <div class="comenzar">
                    <div class="comenzar-1">
                        <p>Comenzar</p>
                    </div>
                    <div class="comenzar-2">
                        <img src="./Imagenes/TICK-AZUL.png" alt="">
                    </div> 
                </div>
            </div>
        </div>`
    })
    seccion.innerHTML = contenido
}

window.onload = cargarPlanes()