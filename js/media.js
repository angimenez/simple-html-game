// Definicion variables de audio
let AUDIO_HIT;
let AUDIO_SHOT;
let AUDIO_ENEMY_SHOT;
let AUDIO_ENEMY_HIT;
let AUDIO_MISSILE;
let AUDIO_EXPLOSION;
let AUDIO_NO_BULLETS;

// Definicion de variables imagenes
let ENEMY_SHOT;
let ENEMY;
let ENEMY_DEAD;
let ENEMY_ANGRY;

let SHIP_SHIELD;
let SHIP_DEAD;
let SHIP;

let SMOKE;
let EXPLOSION;
let MISSILE;
let BACKGROUND;

const loadMedia = new Promise((success, reject) => {

  AUDIO_NO_BULLETS = new Audio("assets/sounds/notiro.wav");
  AUDIO_HIT = new Audio("assets/sounds/golpe.wav");
  AUDIO_EXPLOSION = new Audio("assets/sounds/explota.wav");
  AUDIO_MISSILE = new Audio("assets/sounds/misil2.wav");
  AUDIO_SHOT = new Audio("assets/sounds/tiro.wav");
  AUDIO_ENEMY_HIT = new Audio("assets/sounds/uy.wav");
  AUDIO_ENEMY_SHOT = new Audio("assets/sounds/tiroEnemigo.wav");

  ENEMY_ANGRY = new Image();
  ENEMY_SHOT = new Image();
  ENEMY_DEAD = new Image();
  ENEMY = new Image();
  SMOKE = new Image();
  EXPLOSION = new Image();
  SHIP_SHIELD = new Image();
  MISSILE = new Image();
  SHIP = new Image();
  SHIP_DEAD = new Image();
  BACKGROUND = new Image();

  EXPLOSION.src = "assets/sprites/fuego2.png";
  SMOKE.src = "assets/sprites/fuego2Humo.png";
  SHIP_SHIELD.src = "assets/sprites/naveEscudo.png";
  ENEMY_ANGRY.src = "assets/sprites/cara2.png";
  MISSILE.src = "assets/sprites/misil.png";
  ENEMY_SHOT.src = "assets/sprites/Pollo.png";
  SHIP_DEAD.src = "assets/sprites/naveRota.png";
  ENEMY_DEAD.src = "assets/sprites/caraMuerto.png";
  ENEMY.src = "assets/sprites/eye.png";
  SHIP.src = "assets/sprites/starship.png";
  BACKGROUND.src = "assets/backgrounds/earth.png";
  BACKGROUND.onload = () => {
    success("media loaded");
  };
});
