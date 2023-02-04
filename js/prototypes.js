// Game object represents the base of characters

const MAX_ACC = 0.1;
const MAX_VEL = 15;


const FRICTION = 0.01;

class GameObject {
  constructor(id, x, y, width, height, key_pressed = {}, vx = 0, vy = 0) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.key_pressed = key_pressed;
    this.vx = vx;
    this.vy = vy;
    this.emitEvents = false;

    this.accx = 0;
    this.accy = 0;



    this.mass = 1;
    this.forceX = 0;
    this.forceY = 0;
  }

  getV1() {
    return { x: this.x, y: this.y };
  }

  getV2() {
    return { x: this.x + this.width, y: this.y };
  }

  getV3() {
    return { x: this.x + this.width, y: this.y + this.height };
  }

  getV4() {
    return { x: this.x, y: this.y + this.height };
  }

  onKeyDown(keyCode) {
    this.key_pressed[keyCode] = true;
    if (this.emitEvents) emitData(this);
  }

  onKeyUp(keyCode) {
    this.key_pressed[keyCode] = false;
    if (this.emitEvents) emitData(this);
  }

  //

  updateXPosition() {
    if (
      this.key_pressed[KEY_LEFT] &&
      !this.key_pressed[KEY_RIGHT] &&
      this.accx > MAX_ACC * -1
    ) {
      this.accx -= 0.01;
    } else if (
      this.key_pressed[KEY_RIGHT] &&
      !this.key_pressed[KEY_LEFT] &&
      this.accx < MAX_ACC
    ) {
      this.accx += 0.01;
    } else {
      this.accx = this.accx * 0.1;
      this.vx = this.vx * 0.99;
    }

    const limit = CANVAS_WIDTH - this.width;
    const vxUpdate = this.vx + this.accx * deltaTime;
    this.vx = Math.abs(vxUpdate) > MAX_VEL ? this.vx : vxUpdate;
    this.x += this.vx;
    if (this.x < 0) {
      this.accx = 0;
      this.x = 0;
      this.vx = Math.abs(this.vx) * 0.5;
    }
    if (this.x > limit) {
      this.accx = 0;
      this.x = limit;
      this.vx = -Math.abs(this.vx) * 0.5;
    }
  }

  updateYPosition() {
    if (
      this.key_pressed[KEY_UP] &&
      !this.key_pressed[KEY_DOWN] &&
      this.accy > MAX_ACC * -1
    ) {
      this.accy -= 0.1;
    } else if (
      !this.key_pressed[KEY_UP] &&
      this.key_pressed[KEY_DOWN] &&
      this.accy < MAX_ACC
    ) {
      this.accy += 0.1;
    } else {
      this.accy = this.accy * 0.1;
      this.vy = this.vy * 0.99;
    }

    const limit = CANVAS_HEIGHT - this.height;
    const vyUpdate = this.vy + this.accy * deltaTime;
    this.vy = Math.abs(vyUpdate) > MAX_VEL ? this.vy : vyUpdate;
    this.y += this.vy;
    if (this.y < 0) {
      this.accy = 0;
      this.y = 0;
      this.vy = Math.abs(this.vy) * 0.5;
    }
    if (this.y > limit) {
      this.accy = 0;
      this.y = limit;
      this.vy = -Math.abs(this.vy) * 0.5;
    }
  }

  updateStatus(ships) {
    this.updateXPosition();
    this.updateYPosition();
    for (let ship of ships) {
      if (this !== ship && collision(this, ship)) {
        this.vx *= -1;
        this.vy *= -1;
      }
    }
  }

  updateStatusOld() {
    if (this.key_pressed[KEY_LEFT]) {
      this.x -= this.vx * deltaTime;
      if (this.x < 0) {
        this.x = 0;
      }
    }
    if (this.key_pressed[KEY_RIGHT]) {
      const limit = CANVAS_WIDTH - this.width;
      this.x += this.vx * deltaTime;
      if (this.x > limit) {
        this.x = limit;
      }
    }
    if (this.key_pressed[KEY_UP]) {
      this.y -= this.vy * deltaTime;
      if (this.y < 0) {
        this.y = 0;
      }
    }
    if (this.key_pressed[KEY_DOWN]) {
      const limit = CANVAS_HEIGHT - this.height;
      this.y += this.vy * deltaTime;
      if (this.y > limit) {
        this.y = limit;
      }
    }
  }

  drawObject(ctx) {
    if (!ctx) throw Error("Context is required");
    const columnSprite = Math.round(Math.random());
    const rowSprite = 0;
    ctx.save();
    ctx.filter = "invert(100%)";
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
    ctx.restore();
  }
}

class Ship extends GameObject {
  constructor(props) {
    super(props);
  }
}
