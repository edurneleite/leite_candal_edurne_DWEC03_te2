"use-strict";
//---------------------------------ARRAYS PALABRAS-----------------------------------------
var arrayAlto = [ "Albus", "Animago", "Aparecerse", "Basilisco", "Bezoar", "Boggart", 
    "Buckbeak", "Chocogranos", "Colagusano", "Cruciatus", "Desiluminador", "Dementor", 
    "Dragon", "Mortensia", "Elfo", "Felicis", "Fenix", "Flu", "Fleur", "Duende", 
    "Gryffindor", "Garrick", "Grindelwald", "Hagrid", "Reliquias", "Hechizos", "Herbologia", 
    "Horacio", "Incarcero", "Kreacher", "Lumos", "Mandragora", "Merodeador", "Minerva", 
    "Espejo", "Myrtle", "Nagini", "Nox", "Peeves", "Pensadero", "Multijugos", "Traslador", 
    "Protego", "Ravenclaw", "Remus", "Sectumsempra", "Severus", "Sirius", "Snitch", "Slytherin" ];

var arrayMedio = [ "Albus", "Animago", "Aparecerse", "Basilisco", "Bezoar", "Boggart", 
    "Buckbeak", "Chocogranos", "Colagusano", "Cruciatus", "Desiluminador", "Dementor", 
    "Dragon", "Mortensia", "Elfo", "Felicis", "Fenix", "Flu", "Fleur", "Duende", 
    "Gryffindor", "Garrick", "Grindelwald", "Hagrid", "Reliquias", "Hechizos", "Herbologia", 
    "Horacio", "Incarcero", "Kreacher", "Lumos", "Mandragora", "Merodeador", "Minerva", 
    "Espejo", "Myrtle", "Nagini", "Nox", "Peeves", "Pensadero", "Multijugos", "Traslador", 
    "Protego", "Ravenclaw", "Remus", "Sectumsempra", "Severus", "Sirius", "Snitch", "Slytherin" ];


var arrayBajo = [ "Albus", "Animago", "Aparecerse", "Basilisco", "Bezoar", "Boggart", 
    "Buckbeak", "Chocogranos", "Colagusano", "Cruciatus", "Desiluminador", "Dementor", 
    "Dragon", "Mortensia", "Elfo", "Felicis", "Fenix", "Flu", "Fleur", "Duende", 
    "Gryffindor", "Garrick", "Grindelwald", "Hagrid", "Reliquias", "Hechizos", "Herbologia", 
    "Horacio", "Incarcero", "Kreacher", "Lumos", "Mandragora", "Merodeador", "Minerva", 
    "Espejo", "Myrtle", "Nagini", "Nox", "Peeves", "Pensadero", "Multijugos", "Traslador", 
    "Protego", "Ravenclaw", "Remus", "Sectumsempra", "Severus", "Sirius", "Snitch", "Slytherin" ];
// ------------------------------ 1. VARIABLES GLOBALES ------------------------------
let usuariosJSON = null;
let usuariosJSONpath = 'usuarios.json';
// ------------------------------ 2. CARGA INICIAL DE DATOS ------------------------------
// Esto inicializa los eventos del formulario y carga los datos iniciales
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar los JSON cuando la página se carga, antes de cualquier interacción del usuario
    await cargarDatosIniciales();

    // mostrar datos en consola
    console.log('Usuarios JSON: ', usuariosJSON);
    iniciar();
});
// Función para cargar ambos ficheros JSON al cargar la página
async function cargarDatosIniciales() {
    try {
        // Esperar a que ambos ficheros se carguen
        usuariosJSON = await cargarJSON(usuariosJSONpath);
    } catch (error) {
        console.error('Error al cargar los ficheros JSON:', error);
    }
}
// Función para cargar un JSON desde una ruta específica
async function cargarJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Error al cargar el archivo JSON: ${path}`);
    }
    return await response.json();
}
/** ----------------------------------INICIO--------------------------------------*/
function iniciar(){
    //Guardamos los datos
    console.log(usuariosJSON);
    localStorage.setItem('usuarios', JSON.stringify(usuariosJSON));
}
function comprobarUsuario(){
    //Recuperamos los datos del LocalStorage
    var usuariosGuardados = localStorage.getItem('usuarios');
    var usuarios = JSON.parse(usuariosGuardados);

    //Verificamos si estan en la base de datos
    for(persona in usuarios){
        let clave = usuarios[persona]['usuario'];
        let valor = usuarios[persona]['contraseña'];
        console.log(clave + ' ' + valor);
        validarContrasena(valor);

        //Comprobamos usuario y contraseña
        if (clave == document.getElementById('usuario').value){
            if (document.getElementById('password').value == valor){
            window.open('presentacion.html')
            } 
        }
        mensaje = document.getElementById('mensajes');
        mensaje.textContent= 'Usuario y contraseña incorrecto';
    }
            
}
//Validar contraseña
function validarContrasena(contrasena) { // Expresión regular para validar caracteres alfanuméricos 
    const patron = /^[a-zA-Z0-9]+$/;    
    if (patron.test(contrasena)) { 
            mensaje = document.getElementById('mensajes');
            mensaje.textContent = 'Contraseña valida';
    } else { 
        mensaje = document.getElementById('mensajes');
        mensaje.textContent = 'Error: La contraseña contiene caracteres no permitidos. Debe contener solo letras y números.';
    } 
}
/** ----------------------------------PRESENTACION--------------------------------------*/
function abrirPlay(nivel) { // Aquí puedes añadir la lógica para abrir la pantalla del juego correspondiente 
    
    window.location.href = 'play.html'; 
} 
document.addEventListener('DOMContentLoaded', () => { 
    // Añadir manejadores de eventos a los botones 
    const botones = document.querySelectorAll('.input-nivel'); 
    botones.forEach(boton => { 
        boton.addEventListener('click', (event) => { 
            const nivel = event.target.getAttribute('data-nivel'); 
            abrirPlay(nivel); 
        }); 
    }); 
});

//---------------------------------------JUEGO---------------------------------------------- 
//Elegir palarba random por primera vez
function palabraRandom(){
    let numRandom = Math.floor(Math.random() * 50);
    palabraJuego = arrayMedio[numRandom].toUpperCase();
    console.log(palabraJuego);
    verPantalla = Array(palabraJuego.length).fill('_');;
    let contenido = document.getElementById('palabraClave')
    contenido.textContent = verPantalla.join('  ');;
}
//Temporizador
var tiempoRestante; 

function iniciarTemporizador() { 
    tiempoRestante = 100; 
    // 100 segundos 
    const temporizador = setInterval(() => { 
        if (tiempoRestante > 0) { 
            let temporizador = document.getElementById('tempo');
            temporizador.textContent = `Tiempo restante: ${tiempoRestante} segundos`
            tiempoRestante--; 
        } else { 
            clearInterval(temporizador); 
            window.location.href = 'index.html';  
        } 
    }, 1000); 
}
//Dibujar
function actualizarDibujo (intentos){
    let verDibujo = document.getElementById('dibujo');
    let dibujo0 = ` <pre> 
                                                
                         
                          </pre>`;
    let dibujo1 = ` <pre> 
                                        
                       
    /\\                </pre>`;
    let dibujo2 = ` <pre>

 |\\   
            /\\                </pre>`;
    let dibujo3 = ` <pre> 
    \\0               
|\\       
        /\\                </pre>`;
    let dibujo4 = ` <pre> 
    \\0              
|\\   /\\ 
       /\\                </pre>`;
    let dibujo5 = ` <pre> 
    \\0               
    |\\   /\\/\\   
     /\\               </pre>`;
    let dibujo6 = ` <pre> 
   \\0              
     |\\   /\\/\\/\\   
    /\\                </pre>`;
    let dibujo7 = ` <pre> 
    \\0              \\o/ 
    |\\   /\\/\\/\\   | 
    /\\               /\\ </pre>`;
    if (intentos == 0){
        verDibujo.innerHTML = dibujo0;
    } else if (intentos == 1){
        verDibujo.innerHTML = dibujo1;
    } else if (intentos == 2){
        verDibujo.innerHTML = dibujo2;
    } else if (intentos == 3){
        verDibujo.innerHTML = dibujo3;
    } else if (intentos == 4){
        verDibujo.innerHTML = dibujo4;
    } else if (intentos == 5){
        verDibujo.innerHTML = dibujo5;
    } else if (intentos == 6){
        verDibujo.innerHTML = dibujo6;
    } else if (intentos == 7){
        verDibujo.innerHTML = dibujo7;
        window.location.href = 'lose.html?tiempoRestante=' + encodeURIComponent(tiempoRestante) + '&palabraJuego=' + encodeURIComponent(palabraJuego);
    }
}
//Arrastar letra al cubo
// Agrega los eventos de arrastrar y soltar 
var sumIntentos = 0;
document.addEventListener('DOMContentLoaded', (event) => { 
    var letras = document.querySelectorAll('.boton-letra'); 
    var palabraDiv = document.getElementById('palabraClave'); 
    // Configurar los elementos arrastrables 
    letras.forEach(letra => { 
        letra.addEventListener('dragstart', (event) => { 
            event.dataTransfer.setData('text', event.target.id); 
        }); 
    }); 
    // Donde se soltaran las letras 
    palabraDiv.addEventListener('dragover', (event) => { 
        event.preventDefault(); 
    }); 
    palabraDiv.addEventListener('drop', (event) => { 
        event.preventDefault(); 
        var letraId = event.dataTransfer.getData('text'); 
        var letra = document.getElementById(letraId).value; 
        // Verificar si la letra está en la palabra varias veces
        if (palabraJuego.includes(letra)) { 
            for (let i = 0; i < palabraJuego.length; i++){
                var letraVerificar = palabraJuego[i];
                if (letra == letraVerificar){
                    verPantalla[i]= letra;
                }
            }
            //actualizar verPantalla
            palabraDiv.textContent = verPantalla.join(' ');
            //verificar si ha terminado
            if (!verPantalla.includes('_')){
                //window.location.href = 'win.html';
                window.location.href = 'win.html?tiempoRestante=' + encodeURIComponent(tiempoRestante) + '&palabraJuego=' + encodeURIComponent(palabraJuego);
            }
        } else { 
            //Actualizar dibujo
            sumIntentos++;
            actualizarDibujo(sumIntentos);
        } 
    }); 
    
});
//Verificar palabra resuelta
function verificarPalabra (){
    let solucionPalabra = document.getElementById('solucionPalabra').value;
    solucionPalabra = solucionPalabra.toUpperCase().trim();
    console.log(solucionPalabra);
    if (solucionPalabra == palabraJuego){
        //window.location.href = 'win.html?tiempoRestante=' + encodeURIComponent(tiempoRestante);
        window.location.href = 'win.html?tiempoRestante=' + encodeURIComponent(tiempoRestante) + '&palabraJuego=' + encodeURIComponent(palabraJuego);
    } else {
        sumIntentos++;
        actualizarDibujo(sumIntentos); 
    }
}

//--------------------------------------WIN - LOSE----------------------------------
function volverInicio(){
    window.location.href = 'presentacion.html';
}
function obtenerParametroURL(nombre) { 
        let url = new URL(window.location.href); 
        return url.searchParams.get(nombre); 
} 
//Mostrar resultado GANAR
function ponerDatosGanar(){
    // Obtener el valor de tiempoRestante desde la URL 
    var tiempoRestante = obtenerParametroURL('tiempoRestante');
    var palabraJuego = obtenerParametroURL('palabraJuego');

    verIntentos = document.getElementById('intentos');
    verIntentos.textContent = `Tiempo restante: ${tiempoRestante} segundos`;
    verPalabra = document.getElementById('palabraFin');
    verPalabra.textContent = `La palabra secreta era: ${palabraJuego}`;

}
//MOSTRAR RESULTADO PERDER
function ponerDatosPerder(){
    // Obtener el valor de tiempoRestante desde la URL 
    var tiempoRestante = obtenerParametroURL('tiempoRestante');
    var palabraJuego = obtenerParametroURL('palabraJuego');
    
    verIntentosL = document.getElementById('intentosL');
    verIntentosL.textContent = `Tiempo restante: ${tiempoRestante} segundos`;
    verPalabraL = document.getElementById('palabraFinL');
    verPalabraL.textContent = `La palabra secreta era: ${palabraJuego}`;
}

