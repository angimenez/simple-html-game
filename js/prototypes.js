// Game object represents the base of characters
class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Ship extends GameObject {
  constructor(props) {
    super(props);
  }
}
