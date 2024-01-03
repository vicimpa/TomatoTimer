class linkInputInObject {
  constructor(object) {
    this.object = object;
  }

  connect(id, linkElements) {
    let input = document.getElementById(id);

    if (!input) {
      throw new Error("Элемент не найден");
    }
    if (input.nodeName !== "INPUT") {
      throw new Error("Элемент не input");
    }

    linkElements.forEach((linkElement) => {
      if (linkElement in this.object) {
        input.value = this.object[linkElement];

        input.addEventListener("input", () => {
          this.object[linkElement] = +input.value;
        });
        return;
      }

      let HTMLElement = document.getElementById(linkElement);

      if (HTMLElement) {
        HTMLElement.innerText = input.value;

        input.addEventListener("input", () => {
          HTMLElement.innerText = input.value;
        });

        return;
      }

      throw new Error(`${linkElement} не  Object Key и не DOM element`);
    });
  }
}

class TomatoTimer extends Timer {
  #defaultSettings = {
    workTime: 25,
    longBreak: 11,
    shortBreak: 0,
    rounds: 0,
  };

  #currentRound = 0;
  #currentInterval = 0;

  constructor(...argum) {
    super(argum);

    this.userSettings = { ...this.#defaultSettings };
    this.currentStatus = "";
    this.iterations = [
      {
        name: "Время работать",
        taime: this.userSettings.workTime,
      },
    ];

    super.setTime(0, this.userSettings.workTime);

    let { workTime, longBreak, shortBreak, rounds } = this.#defaultSettings;
    let intervals = [workTime, longBreak, shortBreak];

    this.startRound(intervals);

    let inputLinker = new linkInputInObject(this.userSettings);
    inputLinker.connect("inputTimer", ["workTime", "valueTimer"]);
    inputLinker.connect("inputShortBreak", ["shortBreak", "valueShortBreak"]);
    inputLinker.connect("inputLongBreak", ["longBreak", "valueLongBreak"]);
    inputLinker.connect("inputRounds", ["rounds", "valueRounds"]);
  }

  skipIterate() {
    clearInterval(this.intervalId);
    this.callOnCompletion?.();
  }

  startRound = (intervals) => {
    if (!isFinite(intervals[this.#currentInterval])) return;

    this.setTime(0, intervals[this.#currentInterval]);

    this.#currentInterval += 1;

    if (this.#currentInterval >= intervals.length - 1) {
      this.#currentInterval = 0;
    }

    this.callOnCompletion = () => {
      this.startRound(intervals);
    };
  };

  stopTomatoTimer() {}
  resetTomatoTimer() {}
}

let tomatoTimer = new TomatoTimer("taimers");
