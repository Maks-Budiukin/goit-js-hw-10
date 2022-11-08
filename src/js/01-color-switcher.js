const startBtn = document.querySelector('[data-start]');
const stoptBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', onStart);
stoptBtn.addEventListener('click', onStop);


let intervalId = 0;


function onStart() {
    startBtn.setAttribute("disabled", "disabled");
    intervalId = setInterval(setBodyColor, 1000);
    function setBodyColor() {
        document.body.style.backgroundColor = getRandomHexColor();
        
    }
    
    // console.log(intervalId);
}

function onStop() {
    startBtn.removeAttribute("disabled");
    clearInterval(intervalId);
}