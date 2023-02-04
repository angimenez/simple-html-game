// Para detectar colisiones de objetos
const collision = (a, b) => {
  if (b.x + b.width >= a.x && b.x < a.x + a.width) {
    if (b.y + b.height >= a.y && b.y < a.y + a.height) {
      return true;
    }
  }
  if (b.x + b.width <= a.x && b.x >= a.x + a.width) {
    if (b.y + b.height <= a.y && b.y >= a.y + a.height) {
      return true;
    }
  }
  if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
    if (a.y <= b.y && a.y + a.height >= b.y + b.height) {
      return true;
    }
  }
  return false;
};

// Numero random
const numeroRandom = (min, max) => parseInt(Math.random() * (max - min) + min);

// Funciones que sirven para las rectas:
const obDir = (a, b) => a > b; // Obtiene la direccion de la recta
const calcPendiente = (x1, y1, x2, y2) => (y1 - y2) / (x1 - x2); // Calcula la pendiente de la recta
const calcOrd = (x, y, pen) => y - pen * x; // Calcula la ordenada en el origen
