const cursor = document.querySelector(".cursor");
const eyes = document.querySelectorAll(".eye");
const cursorScale = document.querySelectorAll(".cursor-scale");
const cursorScaleSmall = document.querySelectorAll(".cursor-scale-small");
const button = document.querySelector(".btn");
const footerText = document.querySelector("footer");

function animate(event) {
  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const deltaX = event.pageX - eyeCenterX;
    const deltaY = event.pageY - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);

    const distance = Math.min(Math.hypot(deltaX, deltaY) / 10, 15);
    const pupilX = distance * Math.cos(angle);
    const pupilY = distance * Math.sin(angle);

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });
}

function moveCursor(e) {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
}

function hideCursor() {
  cursor.classList.add("hidden");
}

function showCursor() {
  cursor.classList.remove("hidden");
}

function scaleCursor(link) {
  cursor.classList.add("grow");
  if (link.classList.contains("small")) {
    cursor.classList.remove("grow");
    cursor.classList.add("grow-small");
  }
}

function resetCursor() {
  cursor.classList.remove("grow");
  cursor.classList.remove("grow-small");
}

document.body.addEventListener("mousemove", animate);
document.body.addEventListener("mousemove", moveCursor);
window.addEventListener("mouseout", hideCursor);
window.addEventListener("mouseover", showCursor);

cursorScale.forEach((link) => {
  link.addEventListener("mouseleave", resetCursor);
  link.addEventListener("mousemove", () => scaleCursor(link));
});

cursorScaleSmall.forEach((link) => {
  link.addEventListener("mouseleave", resetCursor);
  link.addEventListener("mousemove", () => cursor.classList.add("grow-small"));
});

button.addEventListener("mouseover", () => {
  cursor.classList.add("btn-hidden");
});

button.addEventListener("mouseleave", () => {
  cursor.classList.remove("btn-hidden");
});

footerText.addEventListener("mouseover", () => {
  cursor.classList.add("grow-smaller");
});

footerText.addEventListener("mouseleave", () => {
  cursor.classList.remove("grow-smaller");
});
const interactiveElements = document.querySelectorAll("p, h1, footer");
interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", showCursor);
  element.addEventListener("mouseleave", hideCursor);
});

document.body.addEventListener("mousemove", (event) => {
  const target = event.target;
  if (!target.closest("p, h1, footer")) {
    hideCursor();
  } else {
    showCursor();
  }
});
