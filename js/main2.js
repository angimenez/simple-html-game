const canvas = document.getElementById("game");
canvas.width = 800;
canvas.height = 400;
const ctx = canvas.getContext("2d");
const keypress = {};
const FPS_ENABLED = true;

const ship = new GameObject(100, canvas.height - 50, 50, 50);

const SPEED = 0.8;
function moverNave() {
  if (key_pressed[KEY_LEFT]) {
    ship.x -= SPEED * deltaTime;
    if (ship.x < 0) ship.x = 0;
  }
  if (key_pressed[KEY_RIGHT]) {
    const limite = canvas.width - ship.width;
    ship.x += SPEED * deltaTime;
    if (ship.x > limite) ship.x = limite;
  }
  if (key_pressed[KEY_UP]) {
    ship.y -= SPEED * deltaTime;
    if (ship.y < 0) ship.y = 0;
  }
  if (key_pressed[KEY_DOWN]) {
    const limite = canvas.height - ship.height;
    ship.y += SPEED * deltaTime;
    if (ship.y > limite) ship.y = limite;
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
  const columnSprite = Math.round(Math.random());
  const rowSprite = 0;
  ctx.drawImage(
    SHIP, // Image source
    columnSprite * ship.width, // Sprite position column
    rowSprite * ship.height, // Sprite position row
    ship.width, // Width sprite
    ship.height, // Height sprite
    ship.x, // X position on canvas
    ship.y, // Y position on canvas
    ship.width, //
    ship.height
  );
};
const drawEnemy = () => {
  const columnSprite = 0;
  const rowSprite = 0;
  ctx.drawImage(
    ENEMY, // Image source
    columnSprite * ship.width, // Sprite position column
    rowSprite * ship.height, // Sprite position row
    ship.width, // Width sprite
    ship.height, // Height sprite
    ship.x + 100, // X position on canvas
    ship.y, // Y position on canvas
    ship.width, //
    ship.height
  );
};
const drawBackground = () => {
  ctx.drawImage(BACKGROUND, 0, 0, 800, 400);
};

const startGame = () => {
  initializeTime();
};

const frameLoop = () => {
  drawBackground();
  updateDeltaTime();
  drawShip();
  drawEnemy();
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
