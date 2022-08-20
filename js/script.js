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

var errores = 9;

function escogerPalabraSecreta() {
  var palabra = palabras[Math.floor(Math.random() * palabras.length)];
  palabraSecreta = palabra;
  console.log("pal: ", palabra);
  return palabra;
}

function dibujarLineas(palabraSecreta) {
  tablero.lineWidth = 4;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeSyle = "#0A3871";
  tablero.beginPath();
  var ancho = 600 / palabraSecreta.length;
  for (let i = 0; i < palabraSecreta.length; i++) {
    tablero.moveTo(500 + ancho * i, 640);
    tablero.lineTo(550 + ancho * i, 640);
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
  tablero.fillText(palabraSecreta[index], 505 + ancho * index, 620);
  tablero.textAlign = "center";
}

function escribirLetraIncorrecta(letra, errorsLeft) {
  tablero.font = "bold 40px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#ff0000";
  // tablero.strokeSyle = "#0A3871";
  tablero.fillText(letra, 535 + 40 * (6 - errorsLeft), 710, 40);
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
    errores -= 1;
  }
}

document.onkeydown = (e) => {
  let letra = e.key.toLocaleUpperCase();
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
      console.log("letra incorrecta: ", letra);
      escribirLetraIncorrecta(letra, errores);
    }
  }
};
