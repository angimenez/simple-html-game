// Game object represents the base of characters

const MAX_VEL = 15;

const FORCE_POWER = 0.01;

const FRICTION_VALUE = 1000;

const FRICTION = 1 / FRICTION_VALUE;

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

    this.shield = 0;
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
    if (this.emitEvents && !this.key_pressed[keyCode]) {
      this.key_pressed[keyCode] = true;
      emitData(this);
    }
  }

  onKeyUp(keyCode) {
    this.key_pressed[keyCode] = false;
    if (this.emitEvents) emitData(this);
  }

  updateXPosition() {
    if (this.key_pressed[KEY_LEFT] && !this.key_pressed[KEY_RIGHT]) {
      this.forceX = -FORCE_POWER;
    } else if (this.key_pressed[KEY_RIGHT] && !this.key_pressed[KEY_LEFT]) {
      this.forceX = FORCE_POWER;
    } else {
      this.forceX = 0;
    }

    const limit = CANVAS_WIDTH - this.width;
    if (this.x < 0) {
      this.accx = 0;
      this.x = 0;
      this.vx = Math.abs(this.vx) * 0.5;
    } else if (this.x > limit) {
      this.accx = 0;
      this.x = limit;
      this.vx = -Math.abs(this.vx) * 0.5;
    } else {
      this.accx = this.forceX / this.mass - this.vx * FRICTION;
      this.vx += this.accx * deltaTime;
      // console.log(`
      // VelocidadX: ${this.vx}
      // FuerzaX: ${this.forceX}
      // AceleracionX: ${this.accx}`);
      this.x += this.vx;
    }
  }

  updateYPosition() {
    if (this.key_pressed[KEY_UP] && !this.key_pressed[KEY_DOWN]) {
      this.forceY = -FORCE_POWER;
    } else if (!this.key_pressed[KEY_UP] && this.key_pressed[KEY_DOWN]) {
      this.forceY = FORCE_POWER;
    } else {
      this.forceY = 0;
    }

    const limit = CANVAS_HEIGHT - this.height;
    if (this.y < 0) {
      this.accy = 0;
      this.y = 0;
      this.vy = Math.abs(this.vy) * 0.5;
    } else if (this.y > limit) {
      this.accy = 0;
      this.y = limit;
      this.vy = -Math.abs(this.vy) * 0.5;
    } else {
      this.accy = this.forceY / this.mass - this.vy * FRICTION;
      this.vy += this.accy * deltaTime;
      // console.log(`
      // VelocidadX: ${this.vy}
      // FuerzaX: ${this.forceY}
      // AceleracionX: ${this.accy}`);
      this.y += this.vy;
    }
  }

  updateStatus(ships) {
    this.updateXPosition();
    this.updateYPosition();
    for (let ship of ships) {
      if (this !== ship && collision(this, ship)) {
        ship.vx = ship.vx + this.vx;
        ship.vy = ship.vy + this.vy;
        ship.shield = 60;

        // this.vx = ship.vx + -this.vx;
        // this.vy = ship.vy + -this.vy;
        this.vx *= -1;
        this.vy *= -1;
        this.shield = 60;
      }
    }
  }

  updateShield() {
    if (this.shield > 0) {
      this.shield--;
      this.drawShield();
    }
  }

  drawShield() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      this.x + this.width / 2,
      this.y + this.height / 2,
      30,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = `rgba(0,255,0,${this.shield / 100})`;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = `rgba(0,100,100,${this.shield / 100})`;
    ctx.stroke();
    ctx.restore();
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
