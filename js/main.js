//Objetos importantes de canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const teclado = {};

//variables de audio
let audioGolpe;
let audioTiro;
let audioTiroEnemigo;
let audioUy;
let audioMisil;
let audioExplota;
let audioNoTiros;
//Defino imagenes para imagenes
let humo;
let Explosion;
let naveEscudo;
let juanEnojado;
let fondo;
let juan;
let juanMuerto;
let naveRota;
let pollo;
let navex;
let misil;
const texto = {
  contador: -1,
  titulo: "",
  subtitulo: "",
};

const juego = {
  estado: "iniciando",
};

const nave = {
  estado: "vivo",
  x: 100,
  y: canvas.height - 50,
  ancho: 50,
  alto: 50,
  contador: 0,
  contadorE: 0,
};

let velocidadEnemigo = 0;
let tiempo = 0;
let frames = 0;
let explosiones = [];
let disparos = [];
let disparosEnemigos = [];
let misiles = 10;
let tiros = 100;
let vidas = 20;

let enemigos = [];

function loadMedia() {
  audioNoTiros = new Audio("/assets/sounds/notiro.wav");
  audioGolpe = new Audio("/assets/sounds/golpe.wav");
  audioExplota = new Audio("/assets/sounds/explota.wav");
  audioMisil = new Audio("/assets/sounds/misil2.wav");
  audioTiro = new Audio("/assets/sounds/tiro.wav");
  audioUy = new Audio("/assets/sounds/uy.wav");
  audioTiroEnemigo = new Audio("/assets/sounds/tiroEnemigo.wav");
  humo = new Image();
  Explosion = new Image();
  naveEscudo = new Image();
  juanEnojado = new Image();
  misil = new Image();
  pollo = new Image();
  juanMuerto = new Image();
  juan = new Image();
  fondo = new Image();
  navex = new Image();
  naveRota = new Image();
  Explosion.src = "/assets/sprites/fuego2.png";
  humo.src = "/assets/sprites/fuego2Humo.png";
  naveEscudo.src = "/assets/sprites/naveEscudo.png";
  juanEnojado.src = "/assets/sprites/cara2.png";
  misil.src = "/assets/sprites/misil.png";
  pollo.src = "/assets/sprites/Pollo.png";
  naveRota.src = "/assets/sprites/naveRota.png";
  juanMuerto.src = "/assets/sprites/caraMuerto.png";
  juan.src = "/assets/sprites/cara.png";
  navex.src = "/assets/sprites/nave.png";
  fondo.src = "/assets/backgrounds/espacio.jpg";

  fondo.onload = function () {
    const intervalo = window.setInterval(frameLoop, 20);
  };
}

function dibujarEscudo() {
  if (nave.contadorE > 0) {
    ctx.save();
    ctx.drawImage(naveEscudo, nave.x - 5, nave.y - 5, 60, 55);
    ctx.restore();
    nave.contadorE--;
  }
}

function muestraVidas() {
  ctx.save();
  ctx.fillStyle = "rgb(0,255,100)";
  ctx.fillRect(0, 380, 5 * vidas, 10);
  ctx.fillStyle = "white";
  ctx.fillText("Vida", 0 + 3, 375);
  ctx.fillStyle = "white";
  ctx.fillText("Cantidad de Juan: " + enemigos.length, 0 + 3, 10);
  ctx.fillStyle = "red";
  ctx.fillText("Misiles: " + misiles, 0 + 3, 360);
  ctx.fillStyle = "blue";
  ctx.fillText("Disparos: " + tiros, 0 + 3, 345);
  ctx.fillStyle = "white";
  ctx.font = "Bold 16pt Arial";
  ctx.fillText("Tiempo: " + tiempo, 600, 20);
  ctx.restore();
}

function dibujaTexto() {
  if (texto.contador == -1) return;
  const alpha = texto.contador / 50.0;
  if (alpha > 0) {
    for (let i in enemigos) {
      delete enemigos[i];
    }
    delete nave;
  }
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "white";
  ctx.font = "Bold 40pt Arial";
  ctx.fillText(texto.titulo, 120, 200);
  ctx.font = "Bold 16pt Arial";
  ctx.fillText(texto.subtitulo, 130, 240);
  ctx.restore();
}

function actualizarEstadoJuego() {
  if (nave.estado == "golpeado") {
    nave.contador++;
    if (nave.contador >= 20) {
      reproducirSonido(audioExplota);
      nave.contador = 0;
      nave.estado = "muerto";
      juego.estado = "derrota";
    }
  }
  if (juego.estado == "jugando" && enemigos.length == 0) {
    juego.estado = "victoria";
    texto.titulo = "Mataste a los Juan ;)";
    texto.subtitulo = " Presione R para reiniciar";
    texto.contador = 0;
  }
  if (juego.estado == "derrota" && nave.estado == "muerto") {
    texto.titulo = "Juan te gana :'(";
    texto.subtitulo = " Presione R para reiniciar";
    texto.contador = 0;
  }
  if (texto.contador >= 0) texto.contador++;
}

function reproducirSonido(a) {
  a.play();
}

function pararSonido(a) {
  a.pause();
}

function dibujarFondo() {
  ctx.drawImage(fondo, 0, 0);
}

function dibujarNave() {
  ctx.save();
  if (nave.estado == "golpeado")
    ctx.drawImage(naveRota, nave.x, nave.y, nave.ancho, nave.alto);
  else ctx.drawImage(navex, nave.x, nave.y, nave.ancho, nave.alto);
  ctx.restore();
}

function agregarEventosTeclado() {
  agregarEvento(document, "keydown", function (e) {
    //Tecla presionada en true
    teclado[e.keyCode] = true;
  });
  agregarEvento(document, "keyup", function (e) {
    //Tecla levantada en false
    teclado[e.keyCode] = false;
  });
  agregarEvento(canvas, "mousemove", function (e) {
    nave.x = e.clientX;
  });
  agregarEvento(canvas, "dblclick", function (e) {
    fuego("misil");
  });
  agregarEvento(canvas, "click", function (e) {
    fuego("rayito");
  });

  function agregarEvento(elemento, nombreEvento, funcion) {
    if (elemento.addEventListener) {
      elemento.addEventListener(nombreEvento, funcion, false);
    } else if (elemento.attachEvent) {
      elemento.attachEvent(nombreEvento, funcion);
    }
  }
}

function moverNave() {
  if (teclado[37]) {
    //Mueve a la izquierda
    nave.x -= 15;
    if (nave.x < 0) nave.x = 0;
  }
  if (teclado[39]) {
    //Mueve a la derecha
    const limite = canvas.width - nave.ancho;
    nave.x += 15;
    if (nave.x > limite) nave.x = limite;
  }
  if (teclado[38]) {
    //Mueve arriba
    nave.y -= 10;
    if (nave.y < 0) nave.y = 0;
  }
  if (teclado[40]) {
    //Mueve abajo
    const limite = canvas.height - nave.alto;
    nave.y += 10;
    if (nave.y > limite) nave.y = limite;
  }
  if (teclado[32]) {
    //Disparos
    if (teclado.fuego) {
      fuego("rayito");
      teclado.fuego = false;
    } else teclado.fuego = true;
  }
  if (teclado[77]) {
    //Misiles
    if (teclado.fuego) {
      fuego("misil");
      teclado.fuego = false;
    } else teclado.fuego = true;
  }
  if (teclado[86]) {
    //Mas vida
    vidas++;
  }
}

function moverDisparos() {
  for (let i in disparos) {
    const disparo = disparos[i];
    if (disparo.tipo == "rayito") disparo.y -= 25;
    else if (disparo.tipo == "misil") {
      if (disparo.direccion) disparo.x -= 15;
      else disparo.x += 15;
      disparo.y = disparo.pendiente * disparo.x + disparo.OO;
    }
  }
  disparos = disparos.filter(function (disparo) {
    return disparo.y > 0;
  });
}

function agregarMisil() {
  reproducirSonido(audioMisil);
  const rnd = numeroRandom(0, enemigos.length - 1);
  const enemigo = enemigos[rnd];
  const Pendiente = calcPendiente(
    nave.x,
    nave.y,
    enemigo.x + 15,
    enemigo.y + 25
  );
  const Ordenada = calcOrd(nave.x, nave.y, Pendiente);
  const Direccion = obDir(nave.x, enemigo.x + 15);
  return {
    x: nave.x + 10,
    y: nave.y,
    ancho: 20,
    alto: 40,
    contador: 0,
    pendiente: Pendiente,
    OO: Ordenada,
    direccion: Direccion,
    tipo: "misil",
  };
}
function fuego(tipo) {
  if (disparos.length < 1) {
    let ANCHO;
    let ALTO;
    if (tipo == "misil") {
      if (misiles > 0) {
        misiles--;
        disparos.push(agregarMisil());
      } else reproducirSonido(audioNoTiros);
    } else if (tipo == "rayito") {
      if (tiros > 0) {
        tiros--;
        ANCHO = 5;
        ALTO = 10;
        reproducirSonido(audioTiro);
        disparos.push({
          x: nave.x + 25,
          y: nave.y,
          ancho: ANCHO,
          alto: ALTO,
          tipo: tipo,
        });
      } else reproducirSonido(audioNoTiros);
    }
  }
}

function dibujarEnemigos() {
  for (let i in enemigos) {
    const enemigo = enemigos[i];
    ctx.save();
    if (enemigo.vida == 2)
      ctx.drawImage(juan, enemigo.x, enemigo.y, enemigo.ancho, enemigo.alto);
    if (enemigo.vida == 1)
      ctx.drawImage(
        juanEnojado,
        enemigo.x,
        enemigo.y,
        enemigo.ancho,
        enemigo.alto
      );
    if (enemigo.vida == 0)
      ctx.drawImage(
        juanMuerto,
        enemigo.x,
        enemigo.y,
        enemigo.ancho,
        enemigo.alto
      );
  }
}

function moverDisparoEnemigo() {
  for (let i in disparosEnemigos) {
    const disparo = disparosEnemigos[i];
    if (!disparo) continue;
    if (disparo.direccion) disparo.x += 1 + velocidadEnemigo;
    else disparo.x -= 1 + velocidadEnemigo;
    disparo.y = disparo.x * disparo.pendiente + disparo.OO;
  }

  disparosEnemigos = disparosEnemigos.filter(function (disparo) {
    return disparo.y < canvas.height;
  });
}

function DibujarDisparoEnemigo() {
  for (let i in disparosEnemigos) {
    const disparo = disparosEnemigos[i];
    ctx.save();
    ctx.drawImage(pollo, disparo.x, disparo.y, disparo.ancho, disparo.alto);
    ctx.restore();
  }
}

function dibujaExplosion() {
  for (let i in explosiones) {
    const explosion = explosiones[i];
    ctx.save();
    if (explosion.contador % 2 == 0)
      ctx.drawImage(
        Explosion,
        explosion.x,
        explosion.y,
        explosion.ancho,
        explosion.alto
      );
    else
      ctx.drawImage(
        humo,
        explosion.x,
        explosion.y,
        explosion.ancho,
        explosion.alto
      );
    ctx.restore();
  }
}

function enemigoGolpeado() {
  for (let i in disparos) {
    const disparo = disparos[i];
    for (let j in enemigos) {
      const enemigo = enemigos[j];
      if (enemigo.vida > 0) {
        if (collision(disparo, enemigo)) {
          delete disparos[disparo];
          reproducirSonido(audioUy);
          if (disparo.tipo == "rayito") enemigo.vida--;
          else if (disparo.tipo == "misil") {
            reproducirSonido(audioExplota);
            explosiones.push({
              x: enemigo.x,
              y: enemigo.y,
              ancho: 100,
              alto: 100,
              contador: 0,
            });
            enemigo.vida = 0;
          }
        }
      }
    }
  }
  for (let i in explosiones) {
    const explosion = explosiones[i];
    for (let j in enemigos) {
      const enemigo = enemigos[j];
      if (enemigo.vida > 0) {
        if (collision(explosion, enemigo)) {
          enemigo.vida = 0;
        }
      }
    }
  }
  if (nave.estado == "muerto" || nave.estado == "golpeado") return;
  for (let i in disparosEnemigos) {
    const disparo = disparosEnemigos[i];
    if (collision(disparo, nave)) {
      delete disparosEnemigos[i];
      if (vidas == 0) {
        reproducirSonido(audioExplota);
        nave.estado = "golpeado";
      } else if (vidas > 0) {
        reproducirSonido(audioGolpe);
        nave.contadorE = 20;
        vidas--;
      }
    }
  }
}
function actualizaExplosion() {
  for (let i in explosiones) {
    const explosion = explosiones[i];
    explosion.contador++;
    if (explosion && explosion.contador >= 20)
      explosiones = explosiones.filter(function () {
        return false;
      });
  }
}
function agregarDisparosEnemigos(enemigo) {
  reproducirSonido(audioTiroEnemigo);
  let Pendiente = calcPendiente(nave.x, nave.y, enemigo.x + 15, enemigo.y + 25);
  if (Pendiente > 8) Pendiente = 1;
  if (Pendiente < -8) Pendiente = -1;
  const Ordenada = calcOrd(nave.x, nave.y, Pendiente);
  const Direccion = obDir(nave.x, enemigo.x + 15);
  return {
    x: enemigo.x + 15,
    y: enemigo.y + 25,
    ancho: 5,
    alto: 10,
    contador: 0,
    pendiente: Pendiente,
    OO: Ordenada,
    direccion: Direccion,
  };
}
function actualizarEnemigos() {
  if (juego.estado == "iniciando") {
    for (let i = 0; i < 20; i++) {
      const y = 10; //x: 10 + (i*50),
      enemigos.push({
        x: numeroRandom(0, 800),
        y: numeroRandom(10, 200),
        alto: 40,
        ancho: 40,
        estado: "vivo",
        vida: 2,
        contador: 0,
        contadorM: 0,
      });
      juego.estado = "jugando";
    }
  }
  //MOver enemigos
  for (let i in enemigos) {
    const enemigo = enemigos[i];
    if (!enemigo) continue;
    if (enemigo && enemigo.estado != "muerto") {
      if (velocidadEnemigo > 6) velocidadEnemigo = 6;
      enemigo.contadorM += 1 + velocidadEnemigo;
      enemigo.x +=
        Math.cos((enemigo.contadorM * Math.PI) / 90) *
          (velocidadEnemigo * 1.5) +
        1 +
        velocidadEnemigo;
      //enemigo.x += Math.cos(enemigo.contador)*velocidadEnemigo +1;
      if (enemigo.x < 0) enemigo.x = canvas.width;
      if (enemigo.x > canvas.width) enemigo.x = 0;
      if (numeroRandom(0, enemigos.length * 10) == 4) {
        disparosEnemigos.push(agregarDisparosEnemigos(enemigo));
      }
    }
    if (enemigo && enemigo.contador < 20 && enemigo.vida <= 0) {
      enemigo.contador++;
      enemigo.contadorM = 0;
    }
    if (enemigo && enemigo.contador >= 20) {
      velocidadEnemigo++;
      enemigo.estado = "muerto";
    }

    enemigos = enemigos.filter(function (enemigo) {
      if (enemigo && enemigo.estado != "muerto") return true;
      else return false;
    });
  }
}
function dibujarDisparos() {
  ctx.save();
  ctx.fillStyle = "red";
  for (let i in disparos) {
    const disparo = disparos[i];
    if (disparo.tipo == "misil")
      ctx.drawImage(misil, disparo.x, disparo.y, disparo.ancho, disparo.alto);
    else if (disparo.tipo == "rayito")
      ctx.fillRect(disparo.x, disparo.y, disparo.ancho, disparo.alto);
  }
  ctx.restore();
}
function reiniciarJuego() {
  tiempo = 0;
  misiles = 10;
  tiros = 100;
  vidas = 20;
  velocidadEnemigo = 0;
  juego.estado = "iniciando";
  nave.estado = "vivo";
  nave.x = 100;
  nave.y = canvas.height - 50;
  disparos = [];
  disparosEnemigos = [];
}

function frameLoop() {
  if (juego.estado == "jugando" || juego.estado == "iniciando") {
    moverNave();
    moverDisparos();
    moverDisparoEnemigo();
    dibujarFondo();
    actualizaExplosion();
    actualizarEnemigos();
    enemigoGolpeado();
    muestraVidas();
    dibujarEnemigos();
    dibujaExplosion();
    DibujarDisparoEnemigo();
    dibujarNave();
    dibujarEscudo();
    dibujarDisparos();
    actualizarEstadoJuego();
    frames++;
    if (frames >= 50) {
      tiempo++;
      frames = 0;
    }
  } else if (teclado[82]) reiniciarJuego();
  if (juego.estado == "victoria" || juego.estado == "derrota") dibujaTexto();
}

//Ejecucion de funciones
const onload = () => {
  agregarEventosTeclado();
  loadMedia();
};
