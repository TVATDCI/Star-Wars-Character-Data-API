export default class NebulaCloud {
  constructor(width, height, ctx, colors) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.colors = colors || [
      "rgba(65, 105, 225, 0.1)",
      "rgba(138, 43, 226, 0.1)",
      "rgba(255, 20, 147, 0.1)",
      "rgba(75, 0, 130, 0.1)",
      "rgba(147, 112, 219, 0.1)",
      "rgba(218, 112, 214, 0.1)",
    ];
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;
    this.radius = Math.random() * 300 + 150;
    this.color = this.getRandomColor();
    this.points = this.generatePoints();
    this.angle = 0;
    this.rotationSpeed = (Math.random() - 0.5) * 0.001;
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  generatePoints() {
    const numberOfPoints = 12;
    const angleStep = (Math.PI * 2) / numberOfPoints;
    const points = [];

    for (let i = 0; i <= numberOfPoints; i++) {
      const angle = i * angleStep;
      const distortion = Math.random() * 0.5 + 0.5;
      const x = Math.cos(angle) * this.radius * distortion;
      const y = Math.sin(angle) * this.radius * distortion;
      points.push({ x, y });
    }

    return points;
  }

  update() {
    this.angle += this.rotationSpeed;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);

    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    this.ctx.closePath();

    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "transparent");

    this.ctx.fillStyle = gradient;
    this.ctx.globalCompositeOperation = "screen";
    this.ctx.fill();

    this.ctx.restore();
  }
}
