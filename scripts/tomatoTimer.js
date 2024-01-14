import { Timer } from "./timer.js";
import { linkInputInObject } from "./linkInputInObject.js";

export class TomatoTimer extends Timer {
  #defaultSettings = {
    workTime: 25,
    longBreak: 30,
    shortBreak: 5,
    rounds: 4,
  };

  #currentInterval = 0;
  #currentRound = 1;

  constructor(...argum) {
    super(argum);

    this.userSettings = {
      ...this.#defaultSettings,
    };
    this.currentStatus = "";

    this.startRound();

    let inputLinker = new linkInputInObject(this.userSettings);
    inputLinker.connect("inputTimer", ["workTime", "valueTimer"]);
    inputLinker.connect("inputShortBreak", ["shortBreak", "valueShortBreak"]);
    inputLinker.connect("inputLongBreak", ["longBreak", "valueLongBreak"]);
    inputLinker.connect("inputRounds", ["rounds", "valueRounds"]);
  }

  startTomatoTimer() {
    if (this.time === this.timerDuration || !this.timerDuration) {
      this.startRound();
    }
    this.startTimer();
  }

  startRound() {
    this.callOnCompletion = this.skipIteration;
    this.setCurrentTime();
  }

  skipIteration() {
    this.#currentInterval += 1;

    if (this.#currentInterval > 1) {
      this.#currentInterval = 0;
      this.#currentRound += 1;
    }

    if (
      this.#currentRound > this.userSettings.rounds &&
      this.#currentInterval == 1
    ) {
      this.#currentRound = 1;
    }

    this.setCurrentTime();
  }

  resetTomatoTimer() {
    this.setCurrentTime();
  }

  setCurrentTime() {
    const { workTime, shortBreak, longBreak, rounds } = this.userSettings;

    const breakTime =
      rounds >= 2 &&
      this.#currentRound + 1 > rounds &&
      this.#currentInterval == 1
        ? longBreak
        : shortBreak;

    this.stopTimer();
    this.setTime(0, [workTime, breakTime][this.#currentInterval]);
  }

  setStatus(nameStatus, idHtmlElement) {
    const element = document.getElementById(idHtmlElement);

    const statuses = {
      workTime: "Время работать",
      longBreak: "Теперь можно немного отдохнуть",
      shortBreak: "Самое время сделать перерыв",
    };

    element.innerText = statuses[nameStatus];
  }

  setTheTimerControl(idStart, idStop, idReset, idSkip) {
    const idControlElements = [idStart, idStop, idReset, idSkip];
    const events = [
      this.startTomatoTimer.bind(this),
      this.stopTimer.bind(this),
      this.resetTomatoTimer.bind(this),
      this.skipIteration.bind(this),
    ];

    idControlElements.forEach((idControlElement, index) => {
      const controlElement = document.getElementById(idControlElement);
      controlElement.addEventListener("click", events[index]);
    });
  }
}
