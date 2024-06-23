/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (() => {

eval("let pantalla = \"Nuevo\"\r\n\r\n\r\n\r\nconst slider_sesiones = document.getElementById(\"slider-sesiones\")\r\nconst slider_duracion = document.getElementById(\"slider-duracion\")\r\nconst pill_sesiones = document.getElementById(\"pill-sesiones\")\r\nconst pill_duracion = document.getElementById(\"pill-duracion\")\r\nconst progreso_sesiones = document.getElementById(\"progreso-sesiones\")\r\nconst progreso_duracion = document.getElementById(\"progreso-duracion\")\r\nconst initial_width_sesiones = slider_sesiones.getBoundingClientRect().left \r\nconst initial_width_duracion = slider_duracion.getBoundingClientRect().left\r\nconst counter_duracion = document.getElementById(\"counter-duracion\")\r\nconst counter_sesiones = document.getElementById(\"counter-sesiones\")\r\nconst container_fuerza = document.getElementById(\"fuerza\")\r\nconst container_hipertrofia = document.getElementById(\"hipertrofia\")\r\nconst container_funcional = document.getElementById(\"funcional\")\r\nlet objetivo_plan = \"hipertrofia\"\r\nlet objetivo_anterior = null\r\n\r\n\r\nconst actualizarSesiones = (factor) => {\r\n    if(factor <= 0.4){\r\n        counter_sesiones.innerText = 2\r\n    }else if(0.4 < factor && factor <= 0.6){\r\n        counter_sesiones.innerText = 3\r\n    }else if(0.6 < factor && factor <= 0.8){\r\n        counter_sesiones.innerText = 4\r\n    }else{\r\n        counter_sesiones.innerText = 5\r\n    }\r\n}\r\n\r\nconst actualizarDuracion = (factor) => {\r\n    if(factor <= 0.2){\r\n        counter_duracion.innerText = 40\r\n    }else if(0.2 < factor && factor <= 0.3){\r\n        counter_duracion.innerText = 50\r\n    }else if(0.3 < factor && factor <= 0.4){\r\n        counter_duracion.innerText = 60\r\n    }else if(0.4 < factor && factor <= 0.5){\r\n        counter_duracion.innerText = 70\r\n    }else if(0.5 < factor && factor <= 0.6){\r\n        counter_duracion.innerText = 80\r\n    }else if(0.6 < factor && factor <= 0.7){\r\n        counter_duracion.innerText = 90\r\n    }else if(0.7 < factor && factor <= 0.8){\r\n        counter_duracion.innerText = 100\r\n    }else if(0.8 < factor && factor <= 0.9){\r\n        counter_duracion.innerText = 110\r\n    }else{\r\n        counter_duracion.innerText = 120\r\n    }\r\n}\r\n\r\nconst setObjetivo = (obj) => {\r\n    objetivo_plan = obj\r\n    let container = document.getElementById(obj)\r\n    container.style.borderColor = \"#0989FF\"\r\n    container.style.borderWidth = \"thick\"\r\n    if(objetivo_anterior && objetivo_anterior !== obj){\r\n        let container_anterior = document.getElementById(objetivo_anterior)\r\n        container_anterior.style.borderColor = \"#D9D9D9\"\r\n        container_anterior.style.borderWidth = \"thin\"\r\n    }\r\n    objetivo_anterior = obj\r\n\r\n}\r\n\r\nconst onMouseMoveSesiones = (event) => {\r\n    let posX = event.clientX\r\n    let newWidth = posX - initial_width_sesiones\r\n    let minWidth = slider_sesiones.offsetWidth * 0.1\r\n\r\n\r\n    if (newWidth < minWidth) newWidth = minWidth\r\n    if (newWidth > slider_sesiones.offsetWidth) newWidth = slider_sesiones.offsetWidth\r\n\r\n    progreso_sesiones.style.width = `${newWidth}px`\r\n    actualizarSesiones(newWidth / slider_sesiones.offsetWidth)\r\n}\r\n\r\nconst onMouseMoveDuracion = (event) => {\r\n    let posX = event.clientX\r\n    let newWidth = posX - initial_width_duracion\r\n    let minWidth = slider_duracion.offsetWidth * 0.1\r\n\r\n    if (newWidth < minWidth) newWidth = minWidth\r\n    if (newWidth > slider_duracion.offsetWidth) newWidth = slider_duracion.offsetWidth\r\n\r\n    progreso_duracion.style.width = `${newWidth}px`\r\n    actualizarDuracion(newWidth / slider_duracion.offsetWidth)\r\n}\r\n\r\nconst onMouseUpSesiones = () => {\r\n    document.removeEventListener(\"mousemove\", onMouseMoveSesiones)\r\n    document.removeEventListener(\"mouseup\", onMouseUpSesiones)\r\n}\r\n\r\nconst onMouseUpDuracion = () => {\r\n    document.removeEventListener(\"mousemove\", onMouseMoveDuracion)\r\n    document.removeEventListener(\"mouseup\", onMouseUpDuracion)\r\n}\r\n\r\nconst onMouseDownSesiones = () => {\r\n    document.addEventListener(\"mousemove\", onMouseMoveSesiones)\r\n    document.addEventListener(\"mouseup\", onMouseUpSesiones) \r\n}    \r\n\r\nconst onMouseDownDuracion = () => {\r\n    document.addEventListener(\"mousemove\", onMouseMoveDuracion)\r\n    document.addEventListener(\"mouseup\", onMouseUpDuracion) \r\n} \r\n\r\n\r\npill_sesiones.addEventListener(\"mousedown\", onMouseDownSesiones)\r\npill_duracion.addEventListener(\"mousedown\", onMouseDownDuracion)\r\n\r\ncontainer_fuerza.addEventListener(\"mousedown\", () => {\r\n    setObjetivo(\"fuerza\")\r\n})\r\ncontainer_hipertrofia.addEventListener(\"mousedown\", () => {\r\n    setObjetivo(\"hipertrofia\")\r\n})\r\ncontainer_funcional.addEventListener(\"mousedown\", () => {\r\n    setObjetivo(\"funcional\")\r\n})\r\nsetObjetivo(\"hipertrofia\")\r\n\n\n//# sourceURL=webpack://fierroapp/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.js"]();
/******/ 	
/******/ })()
;