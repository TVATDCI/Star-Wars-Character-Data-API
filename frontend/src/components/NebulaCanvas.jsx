import { useEffect } from "react";
import styled from "styled-components";

// Nebula canvas
const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

function NebulaCanvas() {
  useEffect(() => {
    const canvas = document.getElementById("nebulaCanvas");
    const ctx = canvas.getContext("2d");

    let width, height;
    let nebulaClouds = [];
    let stars = [];

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.05 + 0.01;
        this.brightness = Math.random();
      }

      update() {
        this.y -= this.speed;
        if (this.y < 0) {
          this.reset();
          this.y = height;
        }
        this.brightness = Math.sin(Date.now() * this.speed * 0.01) * 0.5 + 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fill();
      }
    }

    class NebulaCloud {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 300 + 150;
        this.color = this.getRandomColor();
        this.points = this.generatePoints();
        this.angle = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.001;
      }

      getRandomColor() {
        const colors = [
          "rgba(65, 105, 225, 0.1)",
          "rgba(138, 43, 226, 0.1)",
          "rgba(255, 20, 147, 0.1)",
          "rgba(75, 0, 130, 0.1)",
          "rgba(147, 112, 219, 0.1)",
          "rgba(218, 112, 214, 0.1)",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
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
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.closePath();

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = "screen";
        ctx.fill();

        ctx.restore();
      }
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < 300; i++) {
        stars.push(new Star());
      }
    }

    function createNebulaClouds() {
      nebulaClouds = [];
      for (let i = 0; i < 8; i++) {
        nebulaClouds.push(new NebulaCloud());
      }
    }

    function drawBackground() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      drawBackground();

      nebulaClouds.forEach((cloud) => {
        cloud.update();
        cloud.draw();
      });

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    }

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createStars();
      createNebulaClouds();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <StyledCanvas id="nebulaCanvas" />
      {/* <MeteorLayer>
        <Meteor width={window.innerWidth} height={window.innerHeight} />
      </MeteorLayer>
        */}
    </>
  );
}

export default NebulaCanvas;
