import { useEffect, useRef } from "react";
import {
  stringToColor,
  visualizeItems,
  truckLoad,
  freeTransferCriterion,
  productList,
} from "../utils";

function ItemVisualization({ width, height, items, sizeMultiplier = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Define color map for item labels
    const colorMap = {};

    // Clear the canvas
    ctx.clearRect(
      0,
      0,
      canvas.width * sizeMultiplier,
      canvas.height * sizeMultiplier
    );

    // Iterate over the items and draw each one
    items.forEach((item) => {
      // Determine the color for the item label
      const label = item.item.label;
      const loadCount = item.item.loadCount;
      let color = colorMap[label];
      if (!color) {
        color = productList.find((e) => e.label === label).representedColor;
        colorMap[label] = color;
      }

      // Draw the item block
      ctx.fillStyle = "#000";
      ctx.fillRect(
        item.x * sizeMultiplier,
        item.y * sizeMultiplier,
        item.width * sizeMultiplier,
        item.height * sizeMultiplier
      );
      ctx.fillStyle = color;
      ctx.fillRect(
        item.x * sizeMultiplier + 1,
        item.y * sizeMultiplier + 1,
        item.width * sizeMultiplier - 2,
        item.height * sizeMultiplier - 2
      );

      // Draw the item label on top of the block
      ctx.fillStyle = "white";
      ctx.font = `${20 * sizeMultiplier}px sans-serif`;
      ctx.fillText(
        loadCount,
        (item.x + 5) * sizeMultiplier,
        (item.y + 20) * sizeMultiplier
      );
    });
  }, [items]);

  // Helper function to generate random colors

  return (
    <div width={width * sizeMultiplier} height={height * sizeMultiplier}>
      <canvas
        ref={canvasRef}
        width={width * sizeMultiplier}
        height={height * sizeMultiplier}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}

export default ItemVisualization;
