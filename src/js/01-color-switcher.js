const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
    console.log(`I love async JS!  ${getRandomHexColor()}`);
  }, 1000);

  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
}

function onStopBtnClick() {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
