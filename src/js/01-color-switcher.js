const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;
const DELAY = 1000;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopBtnClick() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
