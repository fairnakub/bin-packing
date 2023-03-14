function visualizeItems(width, height, items) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Define color map for item labels
  const colorMap = {};

  // Iterate over the items and draw each one
  items.forEach((item) => {
    // Determine the color for the item label
    const label = item.item.label;
    let color = colorMap[label];
    if (!color) {
      color = getRandomColor();
      colorMap[label] = color;
    }

    // Draw the item block
    ctx.fillStyle = color;
    ctx.fillRect(item.x, item.y, item.width, item.height);

    // Draw the item label on top of the block
    ctx.fillStyle = "white";
    ctx.font = "12px sans-serif";
    ctx.fillText(label, item.x + 5, item.y + 20);
  });
}

// Helper function to generate random colors
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

export default visualizeItems;
