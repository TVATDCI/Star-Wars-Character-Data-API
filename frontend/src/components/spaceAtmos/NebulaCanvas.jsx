import { useEffect, useRef } from "react";
import styled from "styled-components";
import { debounce } from "lodash"; // Thinking about custom debounce function. No time!
import Star from "./star"; // Assembling the stars to create the nebula
import NebulaCloud from "./nebulaCloud"; // Nebula cloud is also important!
import PropTypes from "prop-types";

// Nebula canvas
const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.7;
`;

function NebulaCanvas({ numStars = 300, numNebulaClouds = 8, colors }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) {
      console.error("Canvas API is not supported in this browser.");
      return;
    }

    const ctx = canvas.getContext("2d");

    let width, height;
    let nebulaClouds = [];
    let stars = [];

    function createStars(numStars) {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star(width, height, ctx));
      }
    }

    function createNebulaClouds(numNebulaClouds) {
      nebulaClouds = [];
      for (let i = 0; i < numNebulaClouds; i++) {
        nebulaClouds.push(new NebulaCloud(width, height, ctx, colors));
      }
    }

    function drawBackground() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    }

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const isSmallScreen = width < 768; // Assuming small screen is less than 768px
      createStars(isSmallScreen ? 150 : 300);
      createNebulaClouds(isSmallScreen ? 4 : 8);
    }

    const debouncedResizeCanvas = debounce(resizeCanvas, 200); // Debounce with a 200ms delay

    window.addEventListener("resize", debouncedResizeCanvas);
    resizeCanvas();

    let animationFrameId;

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

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", debouncedResizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [numStars, numNebulaClouds, colors]);

  return <StyledCanvas ref={canvasRef} />;
}

NebulaCanvas.propTypes = {
  numStars: PropTypes.number,
  numNebulaClouds: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default NebulaCanvas;
