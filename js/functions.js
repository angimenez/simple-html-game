// Para detectar colisiones de objetos
const collision = (a, b) => {
  let hit = false;
  if (b.x + b.ancho >= a.x && b.x < a.x + a.ancho) {
    if (b.y + b.alto >= a.y && b.y < a.y + a.alto) {
      hit = true;
    }
  }
  if (b.x + b.ancho <= a.x && b.x >= a.x + a.ancho) {
    if (b.y + b.alto <= a.y && b.y >= a.y + a.alto) {
      hit = true;
    }
  }
  if (a.x <= b.x && a.x + a.ancho >= b.x + b.ancho) {
    if (a.y <= b.y && a.y + a.alto >= b.y + b.alto) {
      hit = true;
    }
  }
  return hit;
};

// Numero random
const numeroRandom = (min, max) => parseInt(Math.random() * (max - min) + min);

// Funciones que sirven para las rectas:
const obDir = (a, b) => a > b; // Obtiene la direccion de la recta
const calcPendiente = (x1, y1, x2, y2) => (y1 - y2) / (x1 - x2); // Calcula la pendiente de la recta
const calcOrd = (x, y, pen) => y - pen * x; // Calcula la ordenada en el origen
