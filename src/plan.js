import { initializeApp } from "firebase/app"
import { 
    getFirestore, collection, getDocs
} from "firebase/firestore"



//Tipo de plan

const tipo_plan = "pecho"

const firebaseConfig = {
    apiKey: "AIzaSyDFhZxCT21s5aJXfZlSuV0cEJrM9xGQ72A",
    authDomain: "fierro-app.firebaseapp.com",
    projectId: "fierro-app",
    storageBucket: "fierro-app.appspot.com",
    messagingSenderId: "805835831252",
    appId: "1:805835831252:web:959f12a510a79d5412c841",
    measurementId: "G-RBVQ4W3Q5D"
  };

initializeApp(firebaseConfig)

/* Init services */
const db = getFirestore()

const colRef = collection(db, `ejercicios_${tipo_plan}`)

getDocs(colRef)/* Trae todos los documentos del colRef (planes) */
    .then((snapshot) => {
        let ejercicios = []
        snapshot.docs.forEach((doc) => {
            ejercicios.push({ ...doc.data(), id: doc.id }) /* ... añade los atributos al nuevo objeto */
        })
        cargarEjercicios(ejercicios)
    })
    .catch(err => {
        console.log("botardo")
    })





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