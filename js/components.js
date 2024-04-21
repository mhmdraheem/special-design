export function onClickOutside(element, callback) {
  window.addEventListener("click", (event) => {
    if (!element.contains(event.target)) {
      callback(event);
    }
  });
}

export function rgbToHex(rgb) {
  rgb = rgb.slice(4, -1).split(",");
  let r = +rgb[0];
  let g = +rgb[1];
  let b = +rgb[2];

  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
