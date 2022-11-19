// Game object represents the base of characters
class GameObject {
  constructor(id, x, y, width, height, key_pressed = {}, speed = 0.8) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.key_pressed = key_pressed;
    this.speed = speed;
    this.emitEvents = false;
  }


  

  onKeyDown(keyCode) {
    this.key_pressed[keyCode] = true;
    if (this.emitEvents) emitData(this);
  }

  onKeyUp(keyCode) {
    this.key_pressed[keyCode] = false;
    if (this.emitEvents) emitData(this);
  }

  updateStatus() {
    if (this.key_pressed[KEY_LEFT]) {
      this.x -= this.speed * deltaTime;
      if (this.x < 0) this.x = 0;
    }
    if (this.key_pressed[KEY_RIGHT]) {
      const limit = CANVAS_WIDTH - this.width;
      this.x += this.speed * deltaTime;
      if (this.x > limit) this.x = limit;
    }
    if (this.key_pressed[KEY_UP]) {
      this.y -= this.speed * deltaTime;
      if (this.y < 0) this.y = 0;
    }
    if (this.key_pressed[KEY_DOWN]) {
      const limit = CANVAS_HEIGHT - this.height;
      this.y += this.speed * deltaTime;
      if (this.y > limit) this.y = limit;
    }
  }

  drawObject(ctx) {
    if (!ctx) throw Error("Context is required");
    const columnSprite = Math.round(Math.random());
    const rowSprite = 0;
    ctx.drawImage(
      SHIP, // Image source
      columnSprite * this.width, // Sprite position column
      rowSprite * this.height, // Sprite position row
      this.width, // Width sprite
      this.height, // Height sprite
      this.x, // X position on canvas
      this.y, // Y position on canvas
      this.width, //
      this.height
    );
  }
}

class Ship extends GameObject {
  constructor(props) {
    super(props);
  }
}
