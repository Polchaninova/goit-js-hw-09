
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body')
}
let intervalId = null;
let isActive = false;

refs.btnStart.addEventListener('click', showStart);
refs.btnStop.addEventListener('click', showStop);


function showStart() {
  // e.prevent.Default();
  if (isActive) {
    return
  }
  isActive = true;
  // refs.btnStart.disabled = 'disabled';
  refs.btnStart.disabled = true;


  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
    // showStart()
  }, 1000)
}

function showStop() {
  clearInterval(intervalId)
  isActive = false;
  refs.btnStart.disabled = false;
}


// showStop()
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}



