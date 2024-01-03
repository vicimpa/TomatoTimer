class Timer {
  constructor(idHTMLelement) {
    this.id = Math.random();
    this.timerDuration = undefined;
    this.callOnCompletion = undefined;

    if (idHTMLelement) {
      document.getElementById(idHTMLelement).innerHTML = this.createTimer();
    }
  }

  createTimer() {
    return `<span id="${this.id}">00:00</span>`;
  }

  setTime(hours = 0, minutes = 0, seconds = 0) {
    const timerValue = document.getElementById(this.id);

    if (!timerValue) {
      throw new Error("Таймер отсутствует на странице");
    }

    const time = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };

    function formatNumber(value) {
      return value.toString().padStart(2, "0");
    }

    let textValue = ``;

    if (hours) {
      textValue += `${formatNumber(hours)}:`;
    }
    if (minutes || hours) {
      textValue += `${formatNumber(minutes)}:`;
    }
    textValue += `${formatNumber(seconds)}`;

    timerValue.innerText = textValue;

    return (this.time = time);
  }

  startTimer() {
    if (this.intervalId) return;

    let intervalId;
    let { hours, minutes, seconds } = this.time;

    let countDown = () => {
      if (minutes <= 0 && seconds <= 0 && hours <= 0) {
        this.stopTimer();
        this.callOnCompletion?.();
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

    this.timerDuration = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };

    intervalId = setInterval(countDown, 1000);
    this.intervalId = intervalId;
  }

  stopTimer() {
    if (!this.intervalId) return;
    console.log(1);
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  restartTimer() {
    this.stopTimer();
    this.setTime(...Object.values(this.timerDuration));
  }

  toString() {
    return this.createTimer();
  }
}
