import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const input = document.getElementById('datetime-picker');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      const time = selectedDates[0].getTime();
      startBtn.addEventListener('click', () => {
        onStartTime(time);
        btnStart.disabled = true;
        return;
      });
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addZero(Math.floor(ms / day));
  const hours = addZero(Math.floor((ms % day) / hour));
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  updateTimer({
    days,
    hours,
    minutes,
    seconds,
  });
}

function onStartTime(time) {
  let timerId = setInterval(() => {
    startBtn.disabled = true;
    const leftTime = time - Date.now();
    if (leftTime <= 0) {
      clearInterval(timerId);
      return;
    }
    convertMs(leftTime);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}

function addZero(value) {
  return String(value).padStart(2, 0);
}
