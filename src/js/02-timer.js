import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start');

startBtn.disabled = true;
let timerId = null;

startBtn.addEventListener('click', onTimeStart);

const timerValue = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const fp = flatpickr('#datetime-picker', options);

function onTimeStart() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startDate = new Date();
    const countDown = selectedDate - startDate;
    startBtn.disabled = true;

    if (countDown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimer(convertMs(countDown));
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerValue.days.textContent = days;
  timerValue.hours.textContent = hours;
  timerValue.minutes.textContent = minutes;
  timerValue.seconds.textContent = seconds;
}
