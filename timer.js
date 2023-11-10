Timer.prototype = {
  createTimer() {
    return `<span id="${this.id}">00:00</span>`;
  },

  setTime(hours = 0, minutes = 0, seconds = 0) {
    const timerValue = document.getElementById(this.id);
    const time = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };

    if ("timerDuration" in this === false) {
      this.timerDuration = time;
    }

    function formatNumber(value) {
      return value.toString().padStart(2, "0");
    }

    // function formatNumber(value) {
    //   return value >= 10 ? `${value}` : `0${value}`;
    // }

    let textValue = ``;

    if (hours) {
      textValue += `${formatNumber(hours)}: `;
    }
    if (minutes || hours) {
      textValue += `${formatNumber(minutes)}:`;
    }
    textValue += `${formatNumber(seconds)}`;

    timerValue.innerText = textValue;

    return (this.time = time);
  },

  startTimer() {
    let intervalId;
    let { hours, minutes, seconds } = this.time;

    let countDown = () => {
      if (minutes <= 0 && seconds <= 0 && hours <= 0) {
        this.stopTimer();
        return;
      }

      if (minutes <= 0 && seconds <= 0) {
        hours--;
        minutes = 60;
      }

      if (seconds <= 0) {
        minutes--;
        seconds = 60;
      }

      seconds--;

      this.setTime(hours, minutes, seconds);
    };

    this.stopTimer();
    intervalId = setInterval(countDown, 1000);
    this.intervalId = intervalId;
  },

  stopTimer() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  },

  restartTimer() {
    this.stopTimer();
    this.setTime(...Object.values(this.timerDuration));
  },

  toString() {
    return this.createTimer();
  },
};

function Timer() {
  this.id = new Date().getTime();
}
