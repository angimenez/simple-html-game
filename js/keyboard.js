const key_pressed = {};
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

function attachKeyboardEvents() {
  addEvent(document, "keydown", (e) => {
    key_pressed[e.keyCode] = true;
    e.preventDefault();
  });
  addEvent(document, "keyup", (e) => {
    key_pressed[e.keyCode] = false;
    e.preventDefault();
  });
  function addEvent(element, eventName, func) {
    element.addEventListener(eventName, func, false);
  }
}
