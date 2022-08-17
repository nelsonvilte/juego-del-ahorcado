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
  var palabraSecreta = palabra;
  console.log(palabra);
  return palabra;
}

function dibujarLineas(palabraSecreta) {
  console.log(palabraSecreta);
  tablero.lineWidth = 6;
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
