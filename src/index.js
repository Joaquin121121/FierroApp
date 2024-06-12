import { initializeApp } from "firebase/app"
import { 
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
} from "firebase/firestore"



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

const colRef = collection(db, "planes")

getDocs(colRef)/* Trae todos los documentos del colRef (planes) */
    .then((snapshot) => {
        let planes = []
        snapshot.docs.forEach((doc) => {
            planes.push({ ...doc.data(), id: doc.id }) /* ... añade los atributos al nuevo objeto */
        })
        cargarPlanes(planes)
    })
    .catch(err => {
        console.log("botardo")
    })




const cargarPlanes = (planes) => {
    let seccion = document.getElementById("planes")
    let contenido = ""
    planes.forEach(plan => {
        contenido += `
        <div class="container-ejercicio">
            <div class="container-ejercicio-1">
                <img src="../Imagenes/${plan.nombre_imagen}" alt="">
            </div>
            <div class="container-ejercicio-2">
                <h1>${plan.nombre}</h1>
                <p>Duración: ${plan.tiempo} minutos</p>
                <p>Ejercicios: ${plan.cantidad_ejercicios}</p>
                <div class="comenzar">
                    <div class="comenzar-1">
                        <p>Comenzar</p>
                    </div>
                    <div class="comenzar-2">
                        <img src="../Imagenes/TICK-AZUL.png" alt="">
                    </div> 
                </div>
            </div>
        </div>`
    })
    seccion.innerHTML = contenido
}


/* Añadir documentos */

const addBookForm = document.querySelector(".add")
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value/* author y title son los names de los inputs hijos de la form .add*/
    })
    .then(() => {
        addBookForm.reset()
    })
})

const deleteBookForm = document.querySelector(".delete")
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const docRef = doc(db, "books", deleteBookForm.id.value)

    deleteDoc(docRef)
})