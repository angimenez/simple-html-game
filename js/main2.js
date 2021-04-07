const canvas = document.getElementById("game");
canvas.width = 800;
canvas.height = 400;
const ctx = canvas.getContext("2d");
const keypress = {};
const FPS_ENABLED = true;

const nave = {
  estado: "vivo",
  x: 100,
  y: canvas.height - 50,
  ancho: 50,
  alto: 50,
  contador: 0,
  contadorE: 0,
};
const SPEED = 0.8;
function moverNave() {
  if (key_pressed[KEY_LEFT]) {
    nave.x -= SPEED * deltaTime;
    if (nave.x < 0) nave.x = 0;
  }
  if (key_pressed[KEY_RIGHT]) {
    const limite = canvas.width - nave.ancho;
    nave.x += SPEED * deltaTime;
    if (nave.x > limite) nave.x = limite;
  }
  if (key_pressed[KEY_UP]) {
    nave.y -= SPEED * deltaTime;
    if (nave.y < 0) nave.y = 0;
  }
  if (key_pressed[KEY_DOWN]) {
    const limite = canvas.height - nave.alto;
    nave.y += SPEED * deltaTime;
    if (nave.y > limite) nave.y = limite;
  }
}

function showStatus() {
  // ctx.save();
  ctx.fillStyle = "white";
  ctx.font = "Bold 16pt Arial";
  ctx.fillText("Tiempo: " + seconds, 600, 20);
  if (FPS_ENABLED) {
    ctx.fillStyle = "#0ffc03";
    ctx.font = "16pt Arial";
    ctx.fillText("FPS: " + fps, 600, 50);
  }
  // ctx.restore();
}

const drawShip = () => {
  const columnSprite = 1;
  const rowSprite = 0;
  ctx.drawImage(SHIP, columnSprite, rowSprite, nave.ancho, nave.alto, nave.x, nave.y, nave.ancho, nave.alto);
};

const drawBackground = () => {
  ctx.drawImage(BACKGROUND, 0, 0);
};

const startGame = () => {
  initializeTime();
};

const frameLoop = () => {
  drawBackground();
  updateDeltaTime();
  drawShip();
  showStatus();
  moverNave();
  window.requestAnimationFrame(frameLoop);
};

const onload = () => {
  loadMedia.then(() => {
    attachKeyboardEvents();
    startGame();
    frameLoop();
  });
};
