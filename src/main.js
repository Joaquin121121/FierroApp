import { initializeApp } from "firebase/app"
import { linkWithRedirect } from "firebase/auth"
import { addDoc, collection, getDoc, getDocs, doc, getFirestore, query, where } from "firebase/firestore"

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

const pantallaLogin = () => {
    const boton_ingresar = document.getElementById("ingresar")
    const boton_registrar = document.getElementById("registrar")
    const input_usuario = document.getElementById("usuario")
    const input_contraseña = document.getElementById("contraseña")
    const error_usuario = document.getElementById("error-usuario")
    const error_contraseña = document.getElementById("error-contraseña")
    const usuarios = collection(db, "usuarios")


    const iniciarSesion = async() =>{
        let usuario = input_usuario.value
        const queryUsuarios = query(usuarios, where("nombre","==", usuario))
        const snap = await getDocs(queryUsuarios)
        if(!snap.empty){
            const doc = snap.docs[0]
            const userdata = doc.data()
            userdata.id = doc.id
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
    }

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


    input_usuario.addEventListener("input", () =>{error_usuario.innerText = ""})
    input_contraseña.addEventListener("input", () =>{error_contraseña.innerText = ""})

    input_usuario.addEventListener("keydown", (e) =>{
        if(e.key === "Enter"){
            iniciarSesion()
            boton_ingresar.classList.add("active")
            setTimeout(() =>{
                boton_ingresar.classList.remove("active")
            }, 500)

        }
    })
    input_contraseña.addEventListener("keydown", (e) =>{
        if(e.key === "Enter"){
            iniciarSesion()
            boton_ingresar.classList.add("active")
            setTimeout(() =>{
                boton_ingresar.classList.remove("active")
            }, 150)
        }
    })

    boton_ingresar.addEventListener("click", iniciarSesion)
    boton_registrar.addEventListener("click", async() =>{

        const usuarioValido = await validarUsuario(input_usuario.value)
        const contraseñaValida = validarContraseña(input_contraseña.value)

        if(usuarioValido && contraseñaValida){
            let newUser = {
                nombre : input_usuario.value,
                contraseña : input_contraseña.value, 
                sesiones : 0, 
                racha : 0,
                objetivo : "", 
                sesiones_completadas : 0, 
                tienePlan : false
            }
            const docRef = await addDoc(collection(db, "usuarios"), newUser)
            newUser.id = docRef.id
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
    let usuario = JSON.parse(localStorage.getItem("userdata"))
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
        const container = document.getElementById(obj)
        const text = container.querySelector(".container-text")
        container.style.borderColor = "#0989FF"
        container.style.borderWidth = "thick"
        text.style.color = "#0989FF"
        
        if(objetivo_anterior && objetivo_anterior !== obj){
            const container_anterior = document.getElementById(objetivo_anterior)
            const text_anterior = container_anterior.querySelector(".container-text")
            container_anterior.style.borderColor = "#D9D9D9"
            container_anterior.style.borderWidth = "thin"
            text_anterior.style.color = "black"
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

    display_usuario.innerText = usuario.nombre
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
    boton_comenzar.addEventListener("click", () => {
        console.log("BOCABOCABOCAAA")
        usuario.duracion = counter_duracion.innerText
        usuario.sesiones = counter_sesiones.innerText
        usuario.objetivo = objetivo_plan
        localStorage.setItem("userdata", JSON.stringify(usuario))
        cargarPagina("Crear")
    })
    }



const pantallaCreacion = async() =>{

    const ejerciciosPecho = [
        {nombre: "Press de Banca", imagen: "PRESS-BANCA.jpg", musculosTrabajados: "Pecho, Tríceps"},
        {nombre: "Press de Banca Inclinado", imagen: "PRESS-INCLINADO.jpeg", musculosTrabajados: "Pecho, Tríceps"},
        {nombre: "Fondos de Pecho", imagen: "CHEST-DIPS.jpg", musculosTrabajados: "Pecho, Tríceps, Hombros"},
        {nombre: "Press de Banca Declinado", imagen: "PRESS-DECLINADO.jpg", musculosTrabajados: "Pecho, Tríceps"},
        {nombre: "Aperturas de Pecho con Mancuernas", imagen: "APERTURA-MANCUERNAS.jpg", musculosTrabajados: "Pecho, Hombros"},
        {nombre: "Cruces de Poleas para Pecho", imagen: "CRUCE-POLEA.jpg", musculosTrabajados: "Pecho"},
        {nombre: "Press de Banca con Mancuernas", imagen: "PRESS-MANCUERNAS.jpg", musculosTrabajados: "Pecho, Tríceps"},
        {nombre: "Pull-over", imagen: "PULLOVER.jpg", musculosTrabajados: "Pecho, Dorsales"}
    ];
    
    const ejerciciosEspalda = [
        { nombre: "Dominada Abierta", imagen: "DOMINADA-ABIERTA.jpeg", musculosTrabajados: "Dorsales, Bíceps"},
        { nombre: "Dominada Cerrada", imagen: "DOMINADA-CERRADA.jpg", musculosTrabajados: "Dorsales, Bíceps"},
        { nombre: "Remo con Barra", imagen: "REMO-BARRA.jpg", musculosTrabajados: "Espalda Alta, Dorsales"},
        { nombre: "Remo con Mancuerna", imagen: "REMO-MANCUERNAS.jpg", musculosTrabajados: "Espalda Alta, Dorsales"},
        { nombre: "Peso Muerto", imagen: "PESO-MUERTO.jpg", musculosTrabajados: "Espalda Baja, Glúteos, Isquiotibiales"},
        { nombre: "Pulldowns al Pecho", imagen: "PULLDOWN-PECHO.jpg", musculosTrabajados: "Dorsales, Bíceps"},
        { nombre: "Remo con Cable", imagen: "REMO-CABLE.jpg", musculosTrabajados: "Espalda Alta, Dorsales"},
        { nombre: "Hiperextensiones", imagen: "HIPEREXTENSIONES.jpg", musculosTrabajados: "Espalda Baja, Glúteos"}
    ];
    
    const ejerciciosBiceps = [
        { nombre: "Curl de Bíceps con Barra", imagen: "BICEPS-BARRA.jpg", musculosTrabajados: "Bíceps"},
        { nombre: "Curl de Bíceps con Mancuernas", imagen: "BICEPS-MANCUERNAS.jpg", musculosTrabajados: "Bíceps"},
        { nombre: "Curl de Bíceps con Cable", imagen: "BICEPS-CABLE.jpg", musculosTrabajados: "Bíceps"},
        { nombre: "Martillo de Bíceps", imagen: "BICEPS-MARTILLO.jpg", musculosTrabajados: "Bíceps, Braquiorradial"},
        { nombre: "Curl de Concentración", imagen: "BICEP-CONCENTRADO.jpg", musculosTrabajados: "Bíceps"},
        { nombre: "Curl de Bíceps Inclinado", imagen: "BICEPS-INCLINADO.jpeg", musculosTrabajados: "Bíceps"},
        { nombre: "Curl de Bíceps en Banco Scott", imagen: "BICEPS-SCOTT.jpg", musculosTrabajados: "Bíceps"},
        { nombre: "Chin-ups (Dominadas Supinas)", imagen: "CHIN-UPS.jpg", musculosTrabajados: "Bíceps, Dorsales"}
    ];
    
    const ejerciciosTriceps = [
        { nombre: "Press Francés", imagen: "TRICEP-FRANCES.jpeg", musculosTrabajados: "Tríceps"},
        { nombre: "Extensiones de Tríceps en Polea Alta", imagen: "TRICEP-POLEA.jpg", musculosTrabajados: "Tríceps"},
        { nombre: "Extensiones de Tríceps con Soga", imagen: "TRICEP-SOGA.jpg", musculosTrabajados: "Tríceps"},
        { nombre: "Fondos de Tríceps", imagen: "TRICEP-DIPS.jpg", musculosTrabajados: "Tríceps, Pecho"},
        { nombre: "Patada de Tríceps", imagen: "TRICEP-PATADA.jpg", musculosTrabajados: "Tríceps"},
        { nombre: "Press de Tríceps con Mancuernas", imagen: "TRICEP-PRESS.jpg", musculosTrabajados: "Tríceps"}
    ];
    
    const ejerciciosPiernas = [
        { nombre: "Sentadillas (Squats)", imagen: "SENTADILLA.jpeg", musculosTrabajados: "Cuádriceps, Glúteos, Isquiotibiales"},
        { nombre: "Peso Muerto", imagen: "PESO-MUERTO.jpg", musculosTrabajados: "Espalda Baja, Glúteos, Isquiotibiales"},
        { nombre: "Zancadas (Lunges)", imagen: "ZANCADAS.jpg", musculosTrabajados: "Cuádriceps, Glúteos"},
        { nombre: "Prensa de Piernas", imagen: "LEG-PRESS.jpg", musculosTrabajados: "Cuádriceps, Glúteos"},
        { nombre: "Extensiones de Piernas", imagen: "LEG-EXTENSIONS.jpg", musculosTrabajados: "Cuádriceps"},
        { nombre: "Calf Raises (Elevaciones de Talones)", imagen: "CALF-RAISES.jpg", musculosTrabajados: "Gemelos"},
        { nombre: "Sentadillas Búlgaras", imagen: "SENTADILLA-BULGARA.jpeg", musculosTrabajados: "Cuádriceps, Glúteos"},
        { nombre: "Hip Thrusts", imagen: "HIP-THRUSTS.jpg", musculosTrabajados: "Glúteos, Isquiotibiales"},
        { nombre: "Buenos Días", imagen: "GOOD-MORNINGS..jpg", musculosTrabajados: "Espalda Baja, Isquiotibiales"}
    ];
    
    const ejerciciosHombros = [
        { nombre: "Press Militar", imagen: "PRESS-MILITAR.jpg", musculosTrabajados: "Hombros, Tríceps"},
        { nombre: "Vuelos Laterales", imagen: "VUELO-LATERAL.jpg", musculosTrabajados: "Hombros"},
        { nombre: "Vuelos Posteriores", imagen: "VUELO-POSTERIOR.jpeg", musculosTrabajados: "Hombros, Espalda Alta"},
        { nombre: "Press Arnold", imagen: "PRESS-ARNOLD.jpeg", musculosTrabajados: "Hombros, Tríceps"},
        { nombre: "Jalones a la Cara (Face Pulls)", imagen: "FACE-PULLS.jpg", musculosTrabajados: "Hombros, Espalda Alta"},
        { nombre: "Remo al Mentón (Upright Rows)", imagen: "REMO-MENTON", musculosTrabajados: "Hombros, Trapecio"}
    ];
    
    const ejerciciosAntebrazos = [
        { nombre: "Curl de Muñeca con Mancuernas", imagen: "MUÑECA-CURL.jpg", musculosTrabajados: "Antebrazos"},
        { nombre: "Curl de Muñeca Inverso con Mancuernas", imagen: "CURL-MUÑECA-INVERTIDO.jpg", musculosTrabajados: "Antebrazos"},
        { nombre: "Rotaciones de Muñeca con Mancuernas", imagen: "MUÑECAS-ROTACION.jpg", musculosTrabajados: "Antebrazos"}
    ];
    
    
    const userdata = JSON.parse(localStorage.getItem("userdata"))
    const sesiones = parseInt(userdata.sesiones)
    const card = document.getElementById("card")

    
    const autoScroll = (sesiones) => {
        let yActual = 0
        const windowHeight = window.innerHeight
        document.body.style.overflow = "hidden"

        let interval = setInterval(()=>{
            if((yActual + windowHeight) < document.body.offsetHeight){
                yActual += 1
                window.scrollTo(0, yActual)
            }else{
                clearInterval(interval)
                document.body.style.overflow = ""
            }
        }, 5)
    }

    const crearPlan = () => {
        
        const listaPrincipales = ["piernas", "espalda", "pecho"]
        const setsSemanales = Math.floor((userdata.duracion - 15) / 2 * sesiones)
        const antebrazos = (setsSemanales > 84)
        let totalParcialEjercicios = antebrazos ? 22 : 21
        let principales = Math.floor(setsSemanales / totalParcialEjercicios) * 4
        let secundarios = Math.floor(setsSemanales / totalParcialEjercicios) * 3
        let terciarios = (antebrazos) ? Math.floor(setsSemanales / totalParcialEjercicios) : null
        let resto = setsSemanales % totalParcialEjercicios
        let resto_fijo = resto
        if(!antebrazos && resto >= 15){
            principales += 3
            secundarios += 2
            resto = resto % 15
            resto_fijo = resto
        }
        const planSets = {
            piernas : principales,
            espalda : principales,
            pecho : principales,
            hombros : secundarios,
            biceps : secundarios,
            triceps : secundarios,
            antebrazos : (antebrazos) ? terciarios : 0
        }
        while(resto > 0){
            let i = (resto_fijo - resto) % 3
            let atributo = listaPrincipales[i]
            planSets[atributo]++
            resto-- 
        }
        console.log(planSets) 
        const plan = {}
        plan.sesiones = sesiones
        plan.duracion = parseInt(userdata.duracion)
        plan.objetivo = userdata.objetivo
        

        if(sesiones <= 3){
            plan["nombre"] = "Full Body Split"
            for(let i = 0; i < sesiones; i++){
                plan[`sesion ${i + 1}`] = {}
                plan[`sesion ${i + 1}`].pecho = Math.floor(planSets.pecho / sesiones) 
                plan[`sesion ${i + 1}`].espalda = Math.floor(planSets.espalda / sesiones)
                plan[`sesion ${i + 1}`].piernas = Math.floor(planSets.piernas / sesiones)
                plan[`sesion ${i + 1}`].hombros = Math.floor(planSets.hombros / sesiones)
                plan[`sesion ${i + 1}`].biceps = Math.floor(planSets.biceps / sesiones)
                plan[`sesion ${i + 1}`].triceps = Math.floor(planSets.triceps / sesiones)
                if(antebrazos){
                    plan[`sesion ${i + 1}`].antebrazos = Math.floor(planSets.antebrazos / sesiones)
            }}
            plan["sesion 1"].pecho += planSets.pecho % sesiones
            plan["sesion 1"].espalda += planSets.espalda % sesiones
            plan["sesion 1"].piernas += planSets.piernas % sesiones
            plan["sesion 2"].hombros += planSets.hombros % sesiones
            plan["sesion 2"].biceps += planSets.biceps % sesiones
            plan["sesion 2"].triceps += planSets.triceps % sesiones
            if(antebrazos){
                plan["sesion 2"].antebrazos += planSets.antebrazos % sesiones
            }
            for(let i = 0; i < sesiones; i++){
                plan[`sesion ${i + 1}`].n_ejercicios = plan[`sesion ${i + 1}`].pecho + plan[`sesion ${i + 1}`].espalda +  plan[`sesion ${i + 1}`].piernas  +plan[`sesion ${i + 1}`].hombros + plan[`sesion ${i + 1}`].biceps + plan[`sesion ${i + 1}`].triceps
                plan[`sesion ${i + 1}`].n_ejercicios += (plan[`sesion ${i + 1}`].antebrazos) ? plan[`sesion ${i + 1}`].antebrazos : 0
            }
            
        }else{
            plan["nombre"] = "Push Pull Legs Split"
            if(sesiones === 4){
                plan["sesion 1"] = {}
                plan["sesion 1"].nombre = "Push Day"
                plan["sesion 1"].pecho = Math.floor(planSets.pecho * 2 / 3) + (planSets.pecho * 2) % 3
                plan["sesion 1"].triceps = Math.floor(planSets.triceps * 2 / 3) + (planSets.triceps *2) % 3
                plan["sesion 1"].hombros = Math.floor(planSets.hombros / 3)
                plan["sesion 1"].n_ejercicios = plan["sesion 1"].hombros + plan["sesion 1"].triceps + plan["sesion 1"].pecho

                
                plan["sesion 2"] = {}
                plan["sesion 2"].nombre = "Pull Day"
                plan["sesion 2"].espalda = Math.floor(planSets.espalda * 2 / 3) + (planSets.pecho * 2) % 3
                plan["sesion 2"].biceps = Math.floor(planSets.biceps * 2 / 3) + (planSets.triceps *2) % 3
                plan["sesion 2"].n_ejercicios = plan["sesion 2"].espalda + plan["sesion 2"].biceps
                if(antebrazos){
                    plan["sesion 2"].antebrazos = Math.floor(planSets.antebrazos / 3)
                    plan["sesion 2"].n_ejercicios += plan["sesion 2"].antebrazos
                }

                plan["sesion 3"] = {}
                plan["sesion 3"].nombre = "Leg Day"
                plan["sesion 3"].piernas = planSets.piernas
                plan["sesion 3"].hombros = Math.floor(planSets.hombros / 3) 
                plan["sesion 3"].n_ejercicios = plan["sesion 3"].piernas + plan["sesion 3"].hombros
                if(antebrazos){
                    plan["sesion 3"].antebrazos = Math.floor(planSets.antebrazos / 3) + (planSets.antebrazos * 2) % 3
                    plan["sesion 3"].n_ejercicios += plan["sesion 3"].antebrazos
                }
                
                plan["sesion 4"] = {}
                plan["sesion 4"].nombre = "Upper Day"
                plan["sesion 4"].pecho = Math.floor(planSets.pecho / 3)
                plan["sesion 4"].espalda = Math.floor(planSets.espalda / 3)
                plan["sesion 4"].triceps = Math.floor(planSets.triceps / 3)
                plan["sesion 4"].biceps = Math.floor(planSets.biceps / 3)
                plan["sesion 4"].hombros = Math.floor(planSets.hombros / 3) + planSets.hombros % 3
                plan["sesion 4"].n_ejercicios = plan["sesion 4"].pecho + plan["sesion 4"].espalda + plan["sesion 4"].triceps + plan["sesion 4"].hombros + plan["sesion 4"].biceps
            }
            else{
                plan["sesion 1"] = {}
                plan["sesion 1"].nombre = "Push Day"
                plan["sesion 1"].pecho = Math.floor(planSets.pecho * 2 / 3) + (planSets.pecho * 2) % 3
                plan["sesion 1"].triceps = Math.floor(planSets.triceps * 2 / 3) + (planSets.triceps *2) % 3
                plan["sesion 1"].n_ejercicios = plan["sesion 1"].triceps + plan["sesion 1"].pecho

                
                plan["sesion 2"] = {}
                plan["sesion 2"].nombre = "Pull Day"
                plan["sesion 2"].espalda = Math.floor(planSets.espalda * 2 / 3) + (planSets.pecho * 2) % 3
                plan["sesion 2"].biceps = Math.floor(planSets.biceps * 2 / 3) + (planSets.triceps *2) % 3
                plan["sesion 2"].n_ejercicios = plan["sesion 2"].espalda + plan["sesion 2"].biceps

                plan["sesion 3"] = {}
                plan["sesion 3"].nombre = "Leg Day"
                plan["sesion 3"].piernas = Math.floor(planSets.piernas / 2) 
                plan["sesion 3"].hombros = Math.floor(planSets.hombros * 2 / 3) + (planSets.hombros * 2) % 3 
                plan["sesion 3"].n_ejercicios = plan["sesion 3"].piernas + plan["sesion 3"].hombros
                
                plan["sesion 4"] = {}
                plan["sesion 4"].nombre = "Upper Day"
                plan["sesion 4"].pecho = Math.floor(planSets.pecho / 3)
                plan["sesion 4"].espalda = Math.floor(planSets.espalda / 3)
                plan["sesion 4"].triceps = Math.floor(planSets.triceps / 3)
                plan["sesion 4"].biceps = Math.floor(planSets.biceps / 3)
                plan["sesion 4"].n_ejercicios = plan["sesion 4"].pecho + plan["sesion 4"].espalda + plan["sesion 4"].triceps + plan["sesion 4"].biceps

                plan["sesion 5"] = {}
                plan["sesion 5"].nombre = "Leg Day"
                plan["sesion 5"].legs = Math.floor(planSets.piernas / 2) + planSets.piernas % 2
                plan["sesion 5"].n_ejercicios = plan["sesion 5"].legs 
                if(antebrazos){
                    plan["sesion 5"].antebrazos = Math.floor(planSets.antebrazos * 2 / 3) + (planSets.antebrazos * 2) % 3
                    plan["sesion 5"].n_ejercicios += plan["sesion 5"].antebrazos
                }

            }
        }
        let pointer_pecho = 0, pointer_espalda = 0, pointer_piernas = 0, pointer_hombros = 0, pointer_triceps = 0, pointer_biceps = 0, pointer_antebrazos = 0
        for(let i = 0; i < sesiones; i++){
            plan[`sesion ${i + 1}`].lista_ejercicios = []
            if(plan[`sesion ${i + 1}`].pecho){
                plan[`sesion ${i + 1}`].ejercicios_pecho = []
                for(let j = 0; j < plan[`sesion ${i + 1}`].pecho; j+=3){
                  plan[`sesion ${i + 1}`].ejercicios_pecho.push(ejerciciosPecho[(pointer_pecho % ejerciciosPecho.length)])
                    pointer_pecho++
                }
                plan[`sesion ${i + 1}`].ejercicios_pecho = plan[`sesion ${i + 1}`].ejercicios_pecho.map((e, k) => {
                    return (((k + 1) * 3) <= plan[`sesion ${i + 1}`].pecho) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`sesion ${i + 1}`].pecho % 3), reps : 6}   
                })
                plan[`sesion ${i + 1}`].lista_ejercicios.push(...plan[`sesion ${i + 1}`].ejercicios_pecho)

            }
            if(plan[`sesion ${i + 1}`].espalda){
                plan[`sesion ${i + 1}`].ejercicios_espalda = []
                for(let j = 0; j < plan[`sesion ${i + 1}`].espalda; j+=3){
                  plan[`sesion ${i + 1}`].ejercicios_espalda.push(ejerciciosEspalda[(pointer_espalda % ejerciciosEspalda.length)])    
                  pointer_espalda++
                }
                plan[`sesion ${i + 1}`].ejercicios_espalda = plan[`sesion ${i + 1}`].ejercicios_espalda.map((e, k) => {
                    return (((k + 1) * 3) <= plan[`sesion ${i + 1}`].espalda) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`sesion ${i + 1}`].espalda % 3), reps : 6}   
                })
                plan[`sesion ${i + 1}`].lista_ejercicios.push(...plan[`sesion ${i + 1}`].ejercicios_espalda)

            }
            if(plan[`sesion ${i + 1}`].piernas){
                plan[`sesion ${i + 1}`].ejercicios_piernas = []
                for(let j = 0; j < plan[`sesion ${i + 1}`].piernas; j+=3){
                  plan[`sesion ${i + 1}`].ejercicios_piernas.push(ejerciciosPiernas[(pointer_piernas % ejerciciosPiernas.length)])    
                  pointer_piernas++
                }
                plan[`sesion ${i + 1}`].ejercicios_piernas = plan[`sesion ${i + 1}`].ejercicios_piernas.map((e, k) => {
                    return (((k + 1) * 3) <= plan[`sesion ${i + 1}`].piernas) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`sesion ${i + 1}`].piernas % 3), reps : 6}   
                })
                plan[`sesion ${i + 1}`].lista_ejercicios.push(...plan[`sesion ${i + 1}`].ejercicios_piernas)

            }
            if(plan[`sesion ${i + 1}`].hombros){
                plan[`sesion ${i + 1}`].ejercicios_hombros = []
                for(let j = 0; j < plan[`sesion ${i + 1}`].hombros; j+=3){
                  plan[`sesion ${i + 1}`].ejercicios_hombros.push(ejerciciosHombros[(pointer_hombros % ejerciciosHombros.length)])    
                  pointer_hombros++
                }
                plan[`sesion ${i + 1}`].ejercicios_hombros = plan[`sesion ${i + 1}`].ejercicios_hombros.map((e, k) => {
                    return (((k + 1) * 3) <= plan[`sesion ${i + 1}`].hombros) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`sesion ${i + 1}`].hombros % 3), reps : 6}   
                })
                plan[`sesion ${i + 1}`].lista_ejercicios.push(...plan[`sesion ${i + 1}`].ejercicios_hombros)

            }
            if(plan[`sesion ${i + 1}`].biceps){
                plan[`sesion ${i + 1}`].ejercicios_biceps = []
                for(let j = 0; j < plan[`sesion ${i + 1}`].biceps; j+=3){
                  plan[`sesion ${i + 1}`].ejercicios_biceps.push(ejerciciosBiceps[(pointer_biceps % ejerciciosBiceps.length)])
                  pointer_biceps++    
                }
                plan[`sesion ${i + 1}`].ejercicios_biceps = plan[`sesion ${i + 1}`].ejercicios_biceps.map((e, k) => {
                    return (((k + 1) * 3) <= plan[`sesion ${i + 1}`].biceps) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`sesion ${i + 1}`].biceps % 3), reps : 6}   
                })
                plan[`sesion ${i + 1}`].lista_ejercicios.push(...plan[`sesion ${i + 1}`].ejercicios_biceps)

                
                
            }
            if(plan[`sesion ${i + 1}`].triceps){
                plan[`sesion ${i + 1}`].ejercicios_triceps = []
                for(let j = 0; j < plan[`sesion ${i + 1}`].triceps; j+=3){
                  plan[`sesion ${i + 1}`].ejercicios_triceps.push(ejerciciosTriceps[(pointer_triceps % ejerciciosTriceps.length)])    
                  pointer_triceps++
                }
                plan[`sesion ${i + 1}`].ejercicios_triceps = plan[`sesion ${i + 1}`].ejercicios_triceps.map((e, k) => {
                    return (((k + 1) * 3) <= plan[`sesion ${i + 1}`].triceps) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`sesion ${i + 1}`].triceps % 3), reps : 6} 
                    
                })
                plan[`sesion ${i + 1}`].lista_ejercicios.push(...plan[`sesion ${i + 1}`].ejercicios_triceps)

            }
            if(plan[`sesion ${i + 1}`].antebrazos){
                plan[`sesion ${i + 1}`].ejercicios_antebrazos = []
                for(let j = 0; j < plan[`sesion ${i + 1}`].antebrazos; j+=3){
                  plan[`sesion ${i + 1}`].ejercicios_antebrazos.push(ejerciciosAntebrazos[(pointer_antebrazos % ejerciciosAntebrazos.length)])   
                  pointer_antebrazos++ 
                }
                plan[`sesion ${i + 1}`].ejercicios_antebrazos = plan[`sesion ${i + 1}`].ejercicios_antebrazos.map((e, k) => {
                    return (((k + 1) * 3) <= plan[`sesion ${i + 1}`].antebrazos) ? {ejercicio : e, sets : 3, reps : 6} : {ejercicio : e, sets : (plan[`sesion ${i + 1}`].antebrazos % 3), reps : 6}   
                })
                plan[`sesion ${i + 1}`].lista_ejercicios.push(...plan[`sesion ${i + 1}`].ejercicios_antebrazos)

                
            }
            plan[`sesion ${i + 1}`].lista_ejercicios.sort((a, b) => b.sets - a.sets)
        }        
        return plan
    }

    const verEjercicios = (plan, sesion) => {
        window.scrollTo(0, 0)
        card.innerHTML = `<h1>Sesión ${sesion}- <span id="nombre">Ejercicios</span></h1>
            <div class="container-padre" id="container-padre">
                <div class="botones-izquierda">
                    <div class="boton-ejercicio" id="izquierda" style="background-color: black;">
                        <i class="fa-solid fa-arrow-left    fa-2xl" style="color: #ffffff;"></i>
                    </div>
                </div>
                <div class="card card-ejercicio" id="card-ejercicio">
                </div>
                <div class="botones-derecha">
                    <div class="boton-ejercicio" style="background-color: #0989ff; opacity: 1;">
                        <i class="fa-solid fa-arrows-rotate fa-2xl" style="color: #ffffff;"></i>  
                    </div>
                    <div class="boton-ejercicio" id="derecha" style="background-color: black;">
                        <i class="fa-solid fa-arrow-right fa-2xl" style="color: #ffffff;"></i>
                    </div>
                </div>
            </div>
            
            <div class="botones-container" id="botones-modificar">
                <button class="boton-volver" id="volver">
                    Volver
                </button>
                <button class="boton-comenzar" id="comenzar">
                    Comenzar
                </button>
            </div>
        `
        const container = document.getElementById("card-ejercicio")
        const flecha_izquierda = document.getElementById("izquierda")
        const flecha_derecha = document.getElementById("derecha")
        let ejercicio_actual = 0

        const cargarEjercicio = (n) =>{
            const length = plan[`sesion ${sesion}`].lista_ejercicios.length
            let i = (n < 0) ? Math.abs(length - Math.abs(n)) % length : n % length
            let item = plan[`sesion ${sesion}`].lista_ejercicios[(i)]
            let ejercicio = item.ejercicio
            container.innerHTML = `
            <h1 id="nombre-ejercicio">${ejercicio.nombre}</h1>
                <div class="item-container">
                    <div class="icon-container">
                        <img src="./Imagenes/FUERZA.png" alt="">
                    </div>
                    ${ejercicio.musculosTrabajados}
                </div>
                <div class="item-container">
                    <div class="icon-container">
                        <i class="fa-solid fa-clipboard-question fa-xl" style="color: #0989ff;"></i>
                    </div>
                    ${item.reps} repeticiones
                </div>
                <div class="item-container dumbbell" >
                    <div class="icon-container">
                        <i class="fa-solid fa-dumbbell fa-xl" id="dumbbell-icon"style="color: #0989ff;"></i>
                    </div>
                    ${(item.sets > 1) ? `${item.sets} sets` : `${item.sets} set`} 
                </div>
                <div class="img-container">
                    <img src="./Imagenes/${ejercicio.imagen}" alt="">
                </div>
            `
        }

        flecha_derecha.addEventListener("click", ()=> {
            console.log("skiribibob")
            ejercicio_actual++
            cargarEjercicio(ejercicio_actual)
        })

        flecha_izquierda.addEventListener("click", ()=> {
            console.log("skiribibob")
            ejercicio_actual--
            cargarEjercicio(ejercicio_actual)
        })

        

        cargarEjercicio(ejercicio_actual)
        
    }

    const cargarSesiones = (plan) => {
        const display_nombre = document.getElementById("nombre")
        display_nombre.innerText = plan.nombre
        if(sesiones < 4){
            for(let i = 0; i < sesiones; i++){
                card.innerHTML += 
                `<div class="sesion-container" id="sesion-container-${i + 1}">
                    <div class="sesion" id="sesion-${i + 1}">
                        <div class="img-container">
                            <img src="./Imagenes/FULL_BODY_${i + 1}.jpg" alt="">
                        </div>
                        <div class="text-container">
                            <h1>Sesión ${i + 1}</h1>
                            <div class="item-container" id="clock">
                                <div class="icon-container">
                                    <i class="fa-regular fa-clock fa-xl" id="clock-icon"style="color: #0989ff;"></i>
                                </div>
                                ${plan.duracion} minutos
                            </div>
                            <div class="item-container ">
                                <div class="icon-container">
                                    <i class="fa-solid fa-clipboard-question fa-xl" style="color: #0989ff;"></i>
                                </div>
                                Full Body
                            </div>
                            <div class="item-container">
                                <div class="icon-container">
                                    <i class="fa-regular fa-clipboard fa-xl" style="color: #0989ff;"></i>
                                </div>
                                ${plan[`sesion ${i + 1}`].n_ejercicios} ejercicios
                            </div>
                        </div>
                    </div>
                    <div class="editar-container" id="editar-container-${i + 1}">
                        <div class="editar" id="editar-${i + 1}">
                            <i class="fa-solid fa-pen fa-xl" style="color: white;"></i>
                        </div>
                        Editar Sesión ${i + 1}
                    </div>
                </div>`
            }
        }else{
            for(let i = 0; i < sesiones; i++){
                let img = ""
                switch (plan[`sesion ${i + 1}`].nombre){
                    case "Push Day":
                        img = "PRESS-BANCA"
                        break
                    case "Pull Day":
                        img = "PULL"
                        break
                    case "Leg Day":
                        img = "LEG"
                        break
                    case "Upper Day":
                        img = "FULL_BODY_3"
                        break
                }
                card.innerHTML += 
                `
                <div class="sesion-container" id="sesion-container-${i + 1}">
                    <div class="sesion" id="sesion-${i + 1}">
                    <div class="img-container">
                        <img src="./Imagenes/${img}.jpg" alt="">
                    </div>
                    <div class="text-container">
                        <h1>Sesión ${i + 1}</h1>
                        <div class="item-container" id="clock">
                            <div class="icon-container">
                            <i class="fa-regular fa-clock fa-xl" id="clock-icon"style="color: #0989ff;"></i>
                            </div>
                            ${plan.duracion} minutos
                        </div>
                        <div class="item-container ">
                            <div class="icon-container">
                            <i class="fa-solid fa-clipboard-question fa-xl" style="color: #0989ff;"></i>
                            </div>
                            ${plan[`sesion ${i + 1}`].nombre}
                        </div>
                        <div class="item-container">
                            <div class="icon-container">
                            <i class="fa-regular fa-clipboard fa-xl" style="color: #0989ff;"></i>
                            </div>
                            ${plan[`sesion ${i + 1}`].n_ejercicios} sets
                        </div>
                    </div>
                    </div>
                    <div class="editar-container" id="editar-container-${i + 1}">
                        <div class="editar" id="editar-${i + 1}">
                            <i class="fa-solid fa-pen fa-xl" style="color: white;"></i>
                        </div>
                        Editar Sesión ${i + 1}
                    </div>
                    
                    
                </div>

                `
            }
        }
        card.innerHTML += `<div class="botones-container" id="botonera">
        <button class="boton-volver" id="volver">
            Volver
        </button>
        <button class="boton-comenzar" id="comenzar">
            Comenzar
        </button>
        </div>`

        let container, editar, editar_container
        let lista_container = [], lista_container_editar = [], lista_editar = []
        for(let i = 1; (i - 1) <= sesiones; i++){
            if(i > sesiones){
                setTimeout(() => {
                    document.getElementById("botonera").style.animation = "fade-down 1s forwards 0.5s"
                    lista_container.forEach((e, i)=>{
                        e.addEventListener("mouseover", () => {
                            lista_container_editar[i].style.animation = "fade-up 0.5s forwards"
                            lista_container_editar[i].style.display = "flex"
                            lista_container_editar[i].addEventListener("click", ()=>{
                                verEjercicios(plan, (i + 1))
                            })
              
                        })
                        e.addEventListener("mouseleave", () => {
                            lista_container_editar[i].style.animation = "fade-out 1s forwards"
                            setTimeout(() => {
                                lista_container_editar[i].style.display = "none"
                            }, 1000)
                        })
                    })
                    lista_container_editar.forEach((e, i) => {
                        e.addEventListener("mouseover" , () => {
                            lista_editar[i].style.transform = "scale(1.1)"
                        })
                        e.addEventListener("mouseleave", () => {
                            lista_editar[i].style.transform = "scale(1)"
                        })
                    })
                }, i * 1500)
            }else{
                container = document.getElementById(`sesion-container-${i}`)
                editar_container = document.getElementById(`editar-container-${i}`)
                editar = document.getElementById(`editar-${i}`)
                lista_container.push(container)
                lista_container_editar.push(editar_container)
                lista_editar.push(editar)
                setTimeout(() => {
                    lista_container[i - 1].style.animation = "fade-down 1s forwards 0.5s"
                }, i * 1500) 
            }
        }

        

        const boton_volver = document.getElementById("volver")
        boton_volver.addEventListener("click", () => {
            cargarPagina("Nuevo")
        })
        setTimeout(() =>{autoScroll(plan.sesiones)}, 2000)
       


    }


    const plan = crearPlan()
    console.log(plan)
    document.getElementById("usuario").innerText = userdata.nombre
    cargarSesiones(plan)
    

    




}


const pantallaMain = () => {  
    const display_racha = document.getElementById("racha")
    const display_sesiones = document.getElementById("sesiones")

    const userdata = JSON.parse(localStorage.getItem("userdata"))
    console.log(userdata)
    display_sesiones.innerText = `${sesiones_completadas}/${sesiones}`
    display_racha.innerText = userdata.racha
}





const cargarPagina = (pantalla) => {
    if(pantalla === "Nuevo"){
        window.location.assign("nuevo.html")
    }else if(pantalla === "Login"){
        window.location.assign("login.html")
    }else if(pantalla === "Inicio"){
        window.location.assign("inicio.html")
    }else if(pantalla === "Main"){
        window.location.assign("main.html")
    }else if(pantalla === "Crear"){
        window.location.assign("crear.html")
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
    }else if(title === "Crear"){
        pantallaCreacion()
    }
})


