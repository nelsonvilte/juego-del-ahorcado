var palabras = [
  "MOUSE",
  "TECLADO",
  "MONITOR",
  "IMPRESORA",
  "MEMORIA",
  "PROCESADOR",
  "GIGABYTE",
  "MAINFRAME",
  "MEGABYTE",
  "PROGRAMACION",
  "JAVASCRIPT",
  "PYTHON",
  "JAVA",
  "BACKEND",
  "FRONTEND",
  "TECNOLOGIA",
  "INFORMATICA",
  "APLICACION",
  "SOFTWARE",
  "HARDWARE",
  "SKILLS",
  "REPOSITORIO",
  "COMPUTADORA",
];

var tablero = document.getElementById("horca").getContext("2d");

var letras = [];

var palabraCorrecta = "";

var errores = 0;

var mostrarError = document.getElementById("mostrarError");

function escogerPalabraSecreta() {
  var palabra = palabras[Math.floor(Math.random() * palabras.length)];
  palabraSecreta = palabra;
  console.log("pal: ", palabra);
  return palabra;
}

function dibujarLineas(palabraSecreta) {
  mostrarError.className = "invisible";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeSyle = "#0A3871";
  tablero.beginPath();
  var ancho = 600 / palabraSecreta.length;
  for (let i = 0; i < palabraSecreta.length; i++) {
    tablero.moveTo(300 + ancho * i, 640);
    tablero.lineTo(350 + ancho * i, 640);
  }
  tablero.stroke();
  tablero.closePath();
}
dibujarLineas(escogerPalabraSecreta());

function escribirLetraCorrecta(index) {
  tablero.font = "bold 52px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#0A3871";
  tablero.strokeSyle = "#0A3871";

  var ancho = 600 / palabraSecreta.length;
  tablero.fillText(palabraSecreta[index], 305 + ancho * index, 620);
}

function escribirLetraIncorrecta(letra, errorsLeft) {
  tablero.font = "bold 40px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#ff0000";

  tablero.fillText(letra, 5 + 40 * (10 + errorsLeft), 710, 40);
}

function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key);
    return false;
  } else {
    letras.push(key);
    return true;
  }
}

function adicionarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase();
}

function adicionarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores += 1;
  }
}

document.onkeydown = (e) => {
  let letra = e.key.toLocaleUpperCase();
  //let caracter = letra.charCodeAt();
  if (!verificarLetraClicada(e.key)) {
    if (palabraSecreta.includes(letra)) {
      console.log("letra correcta: ", letra);
      adicionarLetraCorrecta(palabraSecreta.indexOf(letra));
      for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
          escribirLetraCorrecta(i);
        }
      }
    } else {
      if (!verificarLetraClicada(e.key)) return;
      adicionarLetraIncorrecta(letra);
      dibujarAhorcado();
      console.log("letra incorrecta: ", letra);
      escribirLetraIncorrecta(letra, errores);
    }
    if (verificarGanador()) imprimirFelicidades();
  }
};

function crearHorca() {
  tablero.fillStyle = "#0A3871";
  tablero.beginPath();
  tablero.moveTo(500, 500);
  tablero.lineTo(450, 520);
  tablero.lineTo(550, 520);
  tablero.fill();
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 10;
  tablero.moveTo(500, 500);
  tablero.lineTo(500, 250);
  tablero.lineTo(600, 250);
  tablero.lineTo(600, 280);
  tablero.stroke();
  tablero.closePath();
}

function dibujarAhorcado() {
  switch (errores) {
    case 1:
      crearHorca();
      break;
    case 2:
      cabeza();
      break;
    case 3:
      cuerpo();
      break;
    case 4:
      brazoIzquierdo();
      break;
    case 5:
      brazoDerecho();
      break;
    case 6:
      piernaIzquierda();
      break;
    case 7:
      piernaDerecha();
      break;
    case 8:
      salidaError();
      break;
  }
}

function cabeza() {
  tablero.fillStyle = "#0A3871";
  tablero.beginPath();
  tablero.arc(600, 300, 30, 0, 2 * 3.14);
  tablero.fill();
  tablero.closePath();
}

function cuerpo() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 310);
  tablero.lineTo(600, 390);
  tablero.stroke();
  tablero.closePath();
}

function brazoIzquierdo() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 340);
  tablero.lineTo(560, 350);
  tablero.stroke();
  tablero.closePath();
}

function brazoDerecho() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 340);
  tablero.lineTo(640, 350);
  tablero.stroke();
  tablero.closePath();
}

function piernaIzquierda() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 395);
  tablero.lineTo(560, 430);
  tablero.stroke();
  tablero.closePath();
}

function piernaDerecha() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 395);
  tablero.lineTo(640, 430);
  tablero.fill();
  tablero.stroke();
  tablero.closePath();
}

function verificarGanador() {
  /*   var letrasCorrectasIngresadas = letras.toString().toUpperCase();

  console.log(
    "letras correctas ingresadas string " + letrasCorrectasIngresadas
  );
  console.log("palabra secreta string" + palabraSecreta); */

  var letrasCorrectasSinRepetidos = [...new Set(palabraCorrecta.split(""))];

  console.log("letras correctas set a array " + letrasCorrectasSinRepetidos);

  var palabraElegida = [...new Set(palabraSecreta.split(""))];

  console.log("palabra elegida set a array: ", palabraElegida);

  let intersection = letrasCorrectasSinRepetidos.filter((x) =>
    palabraElegida.includes(x)
  );
  console.log("Interseccion: ", intersection);

  if (JSON.stringify(intersection) === JSON.stringify(palabraElegida)) {
    console.log("GANASTE");
    return true;
  } else {
    return false;
  }
}

function imprimirFelicidades() {
  tablero.font = "bold 32px Inter";
  tablero.lineWidth = 5;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#0A3871";
  tablero.strokeSyle = "#0A3871";
  tablero.textAlign = "center";
  tablero.fillText("¡GANASTE!", 600, 750);
}

function imprimirError() {
  mostrarError.className = "visible";

  // Crear nodo de tipo Element
  var parrafo = document.createElement("p");

  // Crear nodo de tipo Text
  var contenido = document.createTextNode("¡Fin del juego!");

  // Añadir el nodo Text como hijo del nodo tipo Element
  parrafo.appendChild(contenido);

  // Añadir el nodo Element como hijo de la pagina
  mostrarError.appendChild(parrafo);
}

function salidaError() {
  tablero.font = "bold 32px Inter";
  tablero.lineWidth = 5;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#0A3871";
  tablero.strokeSyle = "#0A3871";
  tablero.textAlign = "center";
  tablero.fillText("¡FIN DEL JUEGO!", 600, 750);
}
