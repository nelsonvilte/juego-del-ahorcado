var palabras = [
  "MOUSE",
  "TECLADO",
  "MONITOR",
  "TERMINAL",
  "MEMORIA",
  "PROCESADOR",
  "GIGABYTE",
  "MAINFRAME",
  "MEGABYTE",
  "LINUX",
  "JAVASCRIPT",
  "PYTHON",
  "JAVA",
  "BACKEND",
  "FRONTEND",
  "SPRINT",
  "YOUTUBE",
  "GOOGLE",
  "SOFTWARE",
  "HARDWARE",
  "SKILLS",
  "CODIGO",
  "WINDOWS",
];

var contenedorTablero = document.getElementById("contenedorTablero");
var lienzo = document.getElementById("horca");
var tablero = document.getElementById("horca").getContext("2d");
var inicio = document.getElementById("inicio");
var btnIniciarJuego = document.getElementById("btnIniciarJuego");

var btnReiniciarJuego = document.getElementById("btnReiniciarJuego");
var btnFinalizarJuego = document.getElementById("btnFinalizarJuego");

var letras = [];

var palabraCorrecta = "";

var errores = 0;

var mostrarError = document.getElementById("mostrarError");

btnIniciarJuego.addEventListener("click", function (event) {
  event.preventDefault();
  inicio.style.display = "none";

  tablero.clearRect(0, 0, lienzo.width, lienzo.height);

  iniciarPartida();
});

btnReiniciarJuego.addEventListener("click", function (event) {
  event.preventDefault();
  inicio.style.display = "none";

  letras = [];

  palabraCorrecta = "";

  errores = 0;
  lienzo = document.getElementById("horca");
  tablero.clearRect(0, 0, lienzo.width, lienzo.height);
  lienzo.textAlign = "none";
  iniciarPartida();
});

btnFinalizarJuego.addEventListener("click", function (event) {
  event.preventDefault();
  inicio.style.display = "flex";
  contenedorTablero.className = "invisible";
  mostrarError.className = "invisible";
  letras = [];

  palabraCorrecta = "";

  errores = 0;

  tablero.clearRect(0, 0, lienzo.width, lienzo.height);
});

function escogerPalabraSecreta() {
  var palabra = palabras[Math.floor(Math.random() * palabras.length)];
  palabraSecreta = palabra;
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
    tablero.moveTo(300 + ancho * i, 440);
    tablero.lineTo(350 + ancho * i, 440);
  }
  tablero.stroke();
  tablero.closePath();
}

function escribirLetraCorrecta(index) {
  tablero.font = "bold 52px Inter";
  tablero.lineWidth = 5;

  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#0A3871";
  tablero.strokeSyle = "#0A3871";
  tablero.textAlign = "start";
  var ancho = 600 / palabraSecreta.length;
  tablero.fillText(palabraSecreta[index], 305 + ancho * index, 410);
}

function escribirLetraIncorrecta(letra, errorsLeft) {
  tablero.font = "bold 40px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#ff0000";

  tablero.fillText(letra, 5 + 40 * (10 + errorsLeft), 510, 40);
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

function iniciarPartida() {
  contenedorTablero.className = "visible";
  dibujarLineas(escogerPalabraSecreta());
  document.onkeydown = (e) => {
    let letra = e.key.toLocaleUpperCase();
    if (!verificarLetraClicada(e.key)) {
      if (palabraSecreta.includes(letra)) {
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
        escribirLetraIncorrecta(letra, errores);
      }
      if (verificarGanador()) {
        imprimirFelicidades();
        document.onkeydown = null;
      }
    }
  };
}

function crearHorca() {
  tablero.fillStyle = "#0A3871";
  tablero.beginPath();
  tablero.moveTo(500, 300);
  tablero.lineTo(450, 320);
  tablero.lineTo(550, 320);
  tablero.fill();
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 10;
  tablero.moveTo(500, 300);
  tablero.lineTo(500, 50);
  tablero.lineTo(600, 50);
  tablero.lineTo(600, 80);
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
      salidaError();
      document.onkeydown = null;
      break;
  }
}

function cabeza() {
  tablero.fillStyle = "#0A3871";
  tablero.beginPath();
  tablero.arc(600, 100, 30, 0, 2 * 3.14);
  tablero.fill();
  tablero.closePath();
}

function cuerpo() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 110);
  tablero.lineTo(600, 190);
  tablero.stroke();
  tablero.closePath();
}

function brazoIzquierdo() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 140);
  tablero.lineTo(560, 150);
  tablero.stroke();
  tablero.closePath();
}

function brazoDerecho() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 140);
  tablero.lineTo(640, 150);
  tablero.stroke();
  tablero.closePath();
}

function piernaIzquierda() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 195);
  tablero.lineTo(560, 230);
  tablero.stroke();
  tablero.closePath();
}

function piernaDerecha() {
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  tablero.lineWidth = 8;
  tablero.moveTo(600, 195);
  tablero.lineTo(640, 230);
  tablero.fill();
  tablero.stroke();
  tablero.closePath();
}

function verificarGanador() {
  var letrasCorrectasSinRepetidos = [...new Set(palabraCorrecta.split(""))];

  var palabraElegida = [...new Set(palabraSecreta.split(""))];
  palabraElegida.sort();

  let intersection = letrasCorrectasSinRepetidos.filter((x) =>
    palabraElegida.includes(x)
  );
  intersection.sort();

  if (JSON.stringify(intersection) === JSON.stringify(palabraElegida)) {
    console.log("GANASTE");
    return true;
  } else {
    return false;
  }
}

function imprimirFelicidades() {
  tablero.font = "bold 40px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#2C974B";
  tablero.strokeSyle = "#2C974B";
  tablero.textAlign = "center";
  tablero.fillText("¡GANASTE!", 600, 600);
}

function salidaError() {
  tablero.font = "bold 40px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#0A3871";
  tablero.strokeSyle = "#0A3871";
  tablero.textAlign = "center";
  tablero.fillText("¡FIN DEL JUEGO!", 600, 600);
}
