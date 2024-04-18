export function onClickOutside(element, callback) {
  window.onclick = (event) => {
    if (!element.contains(event.target)) {
      callback(event);
    }
  };
}
