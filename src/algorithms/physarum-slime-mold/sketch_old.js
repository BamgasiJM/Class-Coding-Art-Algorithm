export default function physarumSlimeMoldSketch(p, size) {
  let molds = [];
  let accentColor;
  let accentRGB = { r: 255, g: 255, b: 255 };
  let d;

  const NUM = 4000;
  const SENSOR_ANGLE = 35;
  const SENSOR_DIST = 10;
  const TURN_ANGLE = 45;

  class Mold {
    constructor() {
      this.x = p.random(size);
      this.y = p.random(size);
      this.r = 0.5;
      this.heading = p.random(360);
      this.vx = p.cos(this.heading);
      this.vy = p.sin(this.heading);
      this.rotAngle = TURN_ANGLE;
      this.stop = false;

      this.rSensorPos = { x: 0, y: 0 };
      this.lSensorPos = { x: 0, y: 0 };
      this.fSensorPos = { x: 0, y: 0 };
      this.sensorAngle = SENSOR_ANGLE;
      this.sensorDist = SENSOR_DIST;
    }

    update() {
      if (this.stop) {
        this.vx = 0;
        this.vy = 0;
      } else {
        this.vx = p.cos(this.heading);
        this.vy = p.sin(this.heading);
      }

      this.x = (this.x + this.vx + size) % size;
      this.y = (this.y + this.vy + size) % size;

      this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
      this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
      this.getSensorPos(this.fSensorPos, this.heading);

      let index, l, r, f;
      index =
        4 * (d * p.floor(this.rSensorPos.y)) * (d * size) +
        4 * (d * p.floor(this.rSensorPos.x));
      r = p.pixels[index] || 0;

      index =
        4 * (d * p.floor(this.lSensorPos.y)) * (d * size) +
        4 * (d * p.floor(this.lSensorPos.x));
      l = p.pixels[index] || 0;

      index =
        4 * (d * p.floor(this.fSensorPos.y)) * (d * size) +
        4 * (d * p.floor(this.fSensorPos.x));
      f = p.pixels[index] || 0;

      if (f > l && f > r) {
        this.heading += 0;
      } else if (f < l && f < r) {
        if (p.random(1) < 0.5) {
          this.heading += this.rotAngle;
        } else {
          this.heading -= this.rotAngle;
        }
      } else if (l > r) {
        this.heading -= this.rotAngle;
      } else if (r > l) {
        this.heading += this.rotAngle;
      }
    }

    display() {
      const px = p.floor(this.x);
      const py = p.floor(this.y);
      const idx = py * size * 4 + px * 4;
      if (idx >= 0 && idx + 3 < p.pixels.length) {
        p.pixels[idx] = accentRGB.r;
        p.pixels[idx + 1] = accentRGB.g;
        p.pixels[idx + 2] = accentRGB.b;
        p.pixels[idx + 3] = 255;
      }
    }

    getSensorPos(sensor, angle) {
      sensor.x = (this.x + this.sensorDist * p.cos(angle) + size) % size;
      sensor.y = (this.y + this.sensorDist * p.sin(angle) + size) % size;
    }
  }

  p.setup = function () {
    p.createCanvas(size, size);
    p.angleMode(p.DEGREES);
    p.pixelDensity(1);
    d = 1;

    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();

    const ac = p.color(accentColor);
    accentRGB = { r: p.red(ac), g: p.green(ac), b: p.blue(ac) };

    console.log("Setup complete. Accent color:", accentRGB);

    for (let i = 0; i < NUM; i++) {
      molds[i] = new Mold();
    }
    p.background(0);
  };

  p.draw = function () {
    p.background(0, 8);
    p.loadPixels();

    for (let i = 0; i < NUM; i++) {
      molds[i].update();
      molds[i].display();
    }

    p.updatePixels();
  };
}
