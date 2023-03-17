function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }

  // Calculate the luminance of the color
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Calculate the difference between this color and the next
  let delta = 0;
  for (let i = 0; i < str.length; i++) {
    delta += Math.abs(str.charCodeAt(i) - str.charCodeAt(i - 1));
  }
  delta = (delta % 16) - 8;

  // If the color is too light, make it darker
  if (luminance > 0.7) {
    const factor = 0.5 + delta / 64;
    const newColor = color.replace(
      /^#(\w\w)(\w\w)(\w\w)$/,
      (match, r, g, b) => {
        const newR = Math.max(0, parseInt(r, 16) * factor);
        const newG = Math.max(0, parseInt(g, 16) * factor);
        const newB = Math.max(0, parseInt(b, 16) * factor);
        return `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`;
      }
    );
    return newColor;
  }

  // If the color is too dark, make it lighter
  if (luminance < 0.3) {
    const factor = 1.5 + delta / 64;
    const newColor = color.replace(
      /^#(\w\w)(\w\w)(\w\w)$/,
      (match, r, g, b) => {
        const newR = Math.min(255, parseInt(r, 16) * factor);
        const newG = Math.min(255, parseInt(g, 16) * factor);
        const newB = Math.min(255, parseInt(b, 16) * factor);
        return `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`;
      }
    );
    return newColor;
  }

  return color;
}

export default stringToColor;
