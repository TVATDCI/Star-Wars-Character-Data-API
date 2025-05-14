export default class Star {
  constructor(width, height, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;
    this.size = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 0.05 + 0.01;
    this.brightness = Math.random();
  }

  update() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.reset();
      this.y = this.height;
    }
    this.brightness = Math.sin(Date.now() * this.speed * 0.01) * 0.5 + 0.5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
    this.ctx.fill();
  }
}
