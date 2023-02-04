const canvas = document.getElementById("game");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext("2d");
const FPS_ENABLED = true;
const ROOM_ID = "1234"; // For testing

let ships = [];

let ship;

const SPEED = 0.8;

function updateShips() {
  ships.forEach((ship) => {
    ship.updateStatus(ships);
    ship.drawObject(ctx);
    ship.updateShield();
  });
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
  ctx.fillStyle = "#0ffc03";
  ctx.font = "16pt Arial";
  ctx.fillText("Latencia: " + latency, 600, 80);
  // ctx.restore();
}

const drawBackground = () => {
  ctx.drawImage(BACKGROUND, 0, 0, 800, 400);
};

const startGame = async () => {
  initializeTime();
  const { arrObj, idObj } = await joinGame(ROOM_ID);
  ships = arrObj.map(
    ({ id, x, y, width, height }) => new GameObject(id, x, y, width, height)
  );
  ship = ships.find((obj) => obj.id === idObj);
  ship.emitEvents = true;
  attachKeyboardEvents(ship);
  addSocketListener("updatedEnemy", (enemy) => {
    const orig = ships.find((obj) => obj.id === enemy.id);
    orig.x = enemy.x;
    orig.y = enemy.y;

    orig.key_pressed = enemy.key_pressed;
  });
  addSocketListener("newEnemy", ({ id, x, y, width, height }) => {
    ships.push(new GameObject(id, x, y, width, height));
  });
  addSocketListener("userLeave", (enemyId) => {
    ships.splice(
      ships.findIndex((obj) => obj.id === enemyId),
      1
    );
  });
};

const frameLoop = () => {
  drawBackground();
  updateDeltaTime();
  showStatus();
  updateShips();
  window.requestAnimationFrame(frameLoop);
};

const loopSendData = async () => {
  await emitData(ship);
  setTimeout(() => {
    loopSendData();
  }, 20);
};

const onload = () => {
  loadMedia.then(async () => {
    await startGame();
    loopSendData();
    frameLoop();
  });
};
