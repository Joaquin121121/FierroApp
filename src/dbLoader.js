import { initializeApp } from "firebase/app";
import { addDoc, arrayUnion, collection, getDoc, doc, getFirestore, updateDoc } from "firebase/firestore";

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

const form = document.getElementById("form")
const tbody = document.getElementById("tbody")

const logData = (ejercicio, grupo, exito, motivo) => {
    tbody.innerHTML += `
    <tr>
        <td>${ejercicio}</td>
        <td>${grupo}</td>
        <td>${exito ? "Éxito" : "Error"}</td>
        <td>${motivo ? motivo : "N/A"}</td>
    </tr>
    `
}

const onCargar = async(grupo, input) => {
    const docRef = doc(db, "ejercicios", "ejercicios")

    const docSnap = await getDoc(docRef)

    const data = docSnap.data()
    if(!data[grupo].includes(input)){
        await updateDoc(docRef, {
            [grupo]: [...data[grupo], input]
        })
        logData(input, grupo, true)
    }else{
        logData(input, grupo, false, "Ya existe")
    }
}








form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("eyou")
    let ejercicio = document.getElementById("nombre").value
    let grupo = document.getElementById("grupo").value
    console.log(ejercicio, grupo)
    if(ejercicio.trim() === ""){
        alert("No cargó ejercicio")
    }else{
        onCargar(grupo, ejercicio)
    }
})


