const sliderContainer = document.querySelector(".sliders-container");
const sliders = document.querySelector(".sliders");

let mouseDown = false;

const mousePos = { x: 0, y: -10 };
const lastSeen = { x: 0, y: 0 };

let id = null;
clearInterval(id);

setTimeout(function () {
  id = setInterval(frame, 35);
}, 3000);

function frame() {
  mousePos.x += 0.5;
  sliders.style.transform = `translateY(-20%) translateX(-50%) perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`;
}

sliderContainer.addEventListener("mousedown", (e) => {
  mouseDown = true;
  clearInterval(id);
});

sliderContainer.addEventListener("mouseup", (e) => {
  mouseDown = false;
  id = setInterval(frame, 35);
});

sliderContainer.addEventListener("mousemove", (e) => {
  const elem = e.target;
  if (mouseDown) onMove(e, elem);
});

sliderContainer.addEventListener("touchstart", (e) => {
  mouseDown = true;
  clearInterval(id);
});

sliderContainer.addEventListener("touchend", (e) => {
  mouseDown = false;
  id = setInterval(frame, 35);
});

sliderContainer.addEventListener("touchmove", (e) => {
  const elem = e.target;
  if (mouseDown) onMove(e.targetTouches[0], elem);
});

function onMove(e, elem) {
  const mouse_x = e.clientX;
  const mouse_y = e.clientY;

  if (lastSeen.y > mouse_y) {
    mousePos.y += 0.2;
  } else if (lastSeen.y < mouse_y) {
    mousePos.y -= 0.2;
  }

  if (lastSeen.x > mouse_x) {
    mousePos.x -= 0.7;
  } else if (lastSeen.x < mouse_x) {
    mousePos.x += 0.7;
  }

  lastSeen.y = mouse_y;
  lastSeen.x = mouse_x;

  sliders.style.transform = `translateY(-20%) translateX(-50%) perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`;

  //   sliders.style.transform = `rotateY(${mousePos.x}deg) translateX(-50%) perspective(1000px) rotateX(-10deg)`;
}
