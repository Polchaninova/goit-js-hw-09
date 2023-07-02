import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
  intervalId: null,
  valueDays: document.querySelector('span[data-days]'),
  valueHours: document.querySelector('span[data-hours]'),
  valueMinutes: document.querySelector('span[data-minutes]'),
  valueSeconds: document.querySelector('span[data-seconds]'),
  btnStart: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  field: document.querySelector('.field'),
  notification: document.querySelector(".js-alert"),
}

class Timer {
  constructor({ onTick }) {
    // console.log(onTick);
    this.intervalId = null;
    this.enableTime = true; // Включает выбор времени
    this.time_24hr = true; // Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено.
    this.defaultDate = new Date(); //Устанавливает начальную выбранную дату (даты). Если вы используете режим: «множественный» или календарь диапазона, поставьте объекты Array of Date или массив строк даты, которые следуют за вашим dateFormat. В противном случае вы можете указать один объект Date или строку даты.
    this.minuteIncrement = 1; //Регулирует шаг ввода минут (включая прокрутку)
    this.onTick = onTick;

  }

  onClose = (selectedDates) => {
    console.log(selectedDates[0]);

    const currentTime = Date.now();
    const enterTouchTime = selectedDates[0];
    // Если пользователь выбрал дату в прошлом
    if (enterTouchTime < currentTime) {
      refs.btnStart.disabled = true;
      // return window.alert("Please choose a date in the future");
      Notiflix.Notify.failure(`Please choose a date in the future`);

    }
    // Если пользователь выбрал валидную дату(в будущем), кнопка «Start» становится активной.
    else if (enterTouchTime > currentTime) {

      refs.btnStart.disabled = false;
      refs.btnStart.classList.add('is-active')
      refs.input.classList.add('is-active')


      // ms - разница между конечной и текущей датой в миллисекундах.

      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = enterTouchTime - currentTime;
        this.time = this.convertMs(deltaTime);
        this.onTick(this.time)
        if (deltaTime < 0) {
          clearInterval(this.intervalId);
          refs.valueDays.textContent = '00';
          refs.valueHours.textContent = '00';
          refs.valueMinutes.textContent = '00';
          refs.valueSeconds.textContent = '00';
        }
      }, 1000)
    }
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  };

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timerInstance = new Timer({
  onTick: updateFunction,

})

function updateFunction() {
  refs.valueDays.textContent = `${timerInstance.time.days}`;
  refs.valueHours.textContent = `${timerInstance.time.hours}`;
  refs.valueMinutes.textContent = `${timerInstance.time.minutes}`;
  refs.valueSeconds.textContent = `${timerInstance.time.seconds}`;
}

flatpickr("#datetime-picker", timerInstance);
console.log(timerInstance);