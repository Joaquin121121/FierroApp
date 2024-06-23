import { initializeApp } from "firebase/app"
import { 
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc,
    onSnapshot
} from "firebase/firestore"
import { iniciarBD } from "./db.js"

const db = iniciarBD()

const colRef = collection(db, "planes")

/* Query */

const q = query(colRef,/*  where("nombre", "!=", "a"), */ orderBy("nombre", "asc"))/* En vez de asc, puedo poner createdAt */

getDocs(q)/* Trae todos los documentos del colRef (planes) */
    .then((snapshot) => {
        let planes = []
        snapshot.docs.forEach((doc) => {
            planes.push({ ...doc.data(), id: doc.id }) /* ... añade los atributos al nuevo objeto */
        })
        cargarPlanes(planes)
        prepararBotones(planes)
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
                <img src="./Imagenes/${plan.nombre_imagen}" alt="">
            </div>
            <div class="container-ejercicio-2">
                <h1>${plan.nombre}</h1>
                <p>Duración: ${plan.tiempo} minutos</p>
                <p>Ejercicios: ${plan.cantidad_ejercicios}</p>
                <div class="comenzar" id="plan-${plan.nombre}">
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

const prepararBotones = (planes) => {
    const botones = planes.map((plan) => {
        return document.getElementById(`plan-${plan.nombre}`)})
    botones.forEach((e) => {
        e.addEventListener("click", () => {
            cargarPagina(`${e.id.toLowerCase()}`)
        })
    }
)
}





/* Añadir documentos */
/* 
const addBookForm = document.querySelector(".add")
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value /*author y title son los names de los inputs hijos de la form .add
        createdAt: serverTimestamp()
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
}) */


/* get a single document */

/* const docRef = doc(db, "books", DocID)

getDoc(docRef)
    .then((doc) => {
        console.log(doc.data(), doc.id)
    })

onSnapshot(docRef, (doc) => {
    console.log(doc.data, doc.id)
}) */

