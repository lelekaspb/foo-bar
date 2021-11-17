"use strict";

window.addEventListener("DOMContentLoaded", start);

const queue = {
  prevSize: 0,
  currentSize: 0,
};

function start() {
  loop();
}

function loop() {
  changeCurrentSize();
  changeUI();
  setTimeout(loop, 15000);
}

function changeCurrentSize() {
  const queueSize = generateRandomNumber();
  queue.currentSize = queueSize;
}

function changePrevSize(size) {
  queue.prevSize = size;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 30);
}

function changeUI() {
  animateBar(queue.prevSize, queue.currentSize);
  changePrevSize(queue.currentSize);
}

function animateBar(prevSize, currentSize) {
  let counter = 0;
  if (prevSize < currentSize) {
    for (let i = prevSize + 1; i <= currentSize + 1; i++) {
      setTimeout(function () {
        document.querySelector(`rect.current`).classList.remove("current");
        document.querySelector(`rect:nth-child(${i})`).classList.add("current");
        document.querySelector("#gauge-label").textContent = i - 1;
      }, 150 * counter);
      counter++;
    }
  } else if (prevSize > currentSize) {
    for (let n = prevSize + 1; n >= currentSize + 1; n--) {
      setTimeout(function () {
        document.querySelector(`rect.current`).classList.remove("current");
        document.querySelector(`rect:nth-child(${n})`).classList.add("current");
        document.querySelector("#gauge-label").textContent = n - 1;
      }, 150 * counter);
      counter++;
    }
  } else {
    document.querySelector("#gauge-label").animate(
      [
        // keyframes
        { opacity: "1" },
        { opacity: "0" },
        { opacity: "1" },
      ],
      {
        // timing options
        duration: 1000,
      }
    );
  }
}
