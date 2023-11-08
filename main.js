function formatNumber(value) {
  return value >= 10 ? `${value}` : `0${value}`;
}

function getTimerDuration(inputId) {
  const timerDuration = document.getElementById(inputId);
  return timerDuration.value;
}

function countDownMinutes(minutes, idInputOutput) {
  const timerValue = document.getElementById(idInputOutput);
  console.log(timerValue);
  let seconds = 0;
  let intervalId;

  function countDown() {
    if (minutes <= 0 && seconds <= 0) {
      clearInterval(intervalId);
      return;
    }

    if (seconds <= 0) {
      minutes--;
      seconds = 60;
    }
    seconds--;
    timerValue.innerText = `${formatNumber(minutes)}:${formatNumber(seconds)}`;
  }

  intervalId = setInterval(countDown, 1000);
}

function createTimer(nameTimer, idWrap, idTimer) {
  const htmlWrapper = document.getElementById(idWrap);
  const timerContainer = document.createElement("div");
  timerContainer.innerHTML = `
    <h2> ${nameTimer}</h2>
    <span id="${idTimer}">00:00</span>
  `;
  htmlWrapper.appendChild(timerContainer);
}

function startTaimer(
  nameTimer,
  idWrap,
  idInputTimerDuration,
  idTimer = new Date().getTime()
) {
  let timerDuration = getTimerDuration(idInputTimerDuration);
  createTimer(nameTimer, idWrap, idTimer);
  countDownMinutes(timerDuration, idTimer);
}

function main() {
  const buttonStarTaimer = document.getElementById("startTaimer");

  buttonStarTaimer.addEventListener("click", () => {
    startTaimer("Таймер", "taimers", "timeSetByUser");
  });
}
main();