const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

function attachKeyboardEvents(gameObj) {
  addEvent(document, "keydown", (e) => {
    gameObj.onKeyDown(e.keyCode);
    e.preventDefault();
  });
  addEvent(document, "keyup", (e) => {
    gameObj.onKeyUp(e.keyCode);
    e.preventDefault();
  });
  function addEvent(element, eventName, func) {
    element.addEventListener(eventName, func, false);
  }
}
