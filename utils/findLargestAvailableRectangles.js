function findLargestAvailableRectangles(width, height, items) {
  const emptySpaces = [{ x: 0, y: 0, width: width, height: height }];

  // Remove areas that are occupied by items
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const newEmptySpaces = [];
    for (let j = 0; j < emptySpaces.length; j++) {
      const emptySpace = emptySpaces[j];
      if (!doOverlap(emptySpace, item)) {
        newEmptySpaces.push(emptySpace);
      } else {
        newEmptySpaces.push(...getRectanglesFromOverlap(emptySpace, item));
      }
    }
    emptySpaces.length = 0;
    emptySpaces.push(...newEmptySpaces);
  }

  // Sort empty spaces by area
  emptySpaces.sort((a, b) => b.width * b.height - a.width * a.height);

  // Return the largest empty space(s)
  const largestArea = emptySpaces?.[0].width * emptySpaces[0].height;
  return emptySpaces.filter(
    (emptySpace) => emptySpace.width * emptySpace.height === largestArea
  );
}

function doOverlap(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function getRectanglesFromOverlap(rect1, rect2) {
  const rectangles = [];

  // Check if rect2 is entirely inside rect1
  if (
    rect2.x >= rect1.x &&
    rect2.y >= rect1.y &&
    rect2.x + rect2.width <= rect1.x + rect1.width &&
    rect2.y + rect2.height <= rect1.y + rect1.height
  ) {
    return rectangles;
  }

  // Determine the overlapping area
  const xOverlap = Math.max(
    0,
    Math.min(rect1.x + rect1.width, rect2.x + rect2.width) -
      Math.max(rect1.x, rect2.x)
  );
  const yOverlap = Math.max(
    0,
    Math.min(rect1.y + rect1.height, rect2.y + rect2.height) -
      Math.max(rect1.y, rect2.y)
  );
  const overlapArea = xOverlap * yOverlap;

  // Split rect1 into two rectangles based on the overlapping area
  if (overlapArea > 0) {
    if (xOverlap < rect1.width && yOverlap < rect1.height) {
      const rect3 = {
        x: rect1.x,
        y: rect1.y + yOverlap,
        width: rect1.width,
        height: rect1.height - yOverlap,
      };
      rectangles.push(rect3);
    }
    if (xOverlap < rect1.width && yOverlap > 0) {
      const rect4 = {
        x: rect1.x + xOverlap,
        y: rect1.y,
        width: rect1.width - xOverlap,
        height: yOverlap,
      };
      rectangles.push(rect4);
    }
  }

  // Split rect2 into two rectangles based on the overlapping area
  if (overlapArea > 0) {
    if (xOverlap < rect2.width && yOverlap < rect2.height) {
      const rect5 = {
        x: rect2.x,
        y: rect2.y,
        width: xOverlap,
        height: yOverlap,
      };
      rectangles.push(rect5);
    }
    if (xOverlap < rect2.width && yOverlap > 0) {
      const rect6 = {
        x: rect2.x + xOverlap,
        y: rect2.y + yOverlap,
        width: rect2.width - xOverlap,
        height: rect2.height - yOverlap,
      };
      rectangles.push(rect6);
    }
  }

  return rectangles;
}

export default findLargestAvailableRectangles;
