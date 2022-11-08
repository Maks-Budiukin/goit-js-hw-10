import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');


let selectedDate = 0;
let timeDiff = 0;
let intervalId = 0;

startBtn.setAttribute("disabled", "disabled");


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
  
    selectedDate = Date.parse(selectedDates[0]);
    clearInterval(intervalId);
    
    if (selectedDate > Date.now()) {

      timeDiff = selectedDate - Date.now();
      startBtn.removeAttribute("disabled");
      
      days.textContent = `${convertMs(timeDiff).days}`.padStart(2, 0);
      hours.textContent = `${convertMs(timeDiff).hours}`.padStart(2, 0);
      minutes.textContent = `${convertMs(timeDiff).minutes}`.padStart(2, 0);
      seconds.textContent = `${convertMs(timeDiff).seconds}`.padStart(2, 0);
      
    } else {

      days.textContent = `00`;
      hours.textContent = `00`;
      minutes.textContent = `00`;
      seconds.textContent = `00`;
      Notify.failure('Please choose a date in the future');

    }
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', onStart);

function onStart() {

    intervalId = setInterval(counter, 1000);
    function counter() {
    const disableTime = selectedDate - Date.now();
      
        if (disableTime <= 1040) {
            clearInterval(intervalId);
        }
        
    days.textContent = `${convertMs(disableTime).days}`.padStart(2, 0);
    hours.textContent = `${convertMs(disableTime).hours}`.padStart(2, 0);
    minutes.textContent = `${convertMs(disableTime).minutes}`.padStart(2, 0);
    seconds.textContent = `${convertMs(disableTime).seconds}`.padStart(2, 0);
        
  }

  startBtn.setAttribute("disabled", "disabled");
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };

}

