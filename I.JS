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
    workTime: 1,
    longBreak: 2,
    shortBreak: 3,
    rounds: 0,
  };

  #currentRound = 0;

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

    let inputLinker = new linkInputInObject(this.userSettings);
    inputLinker.connect("inputTimer", ["workTime", "valueTimer"]);
    inputLinker.connect("inputShortBreak", ["shortBreak", "valueShortBreak"]);
    inputLinker.connect("inputLongBreak", ["longBreak", "valueLongBreak"]);
    inputLinker.connect("inputRounds", ["rounds", "valueRounds"]);
  }

  startTomatoTimer() {
    let { workTime, longBreak, shortBreak, rounds } = this.#defaultSettings;
    let intervals = [workTime, longBreak];

    // 0 - значение с которого начнутся итерации
    this.startRound(0, intervals);
  }

  skipIterate() {
    clearInterval(this.intervalId);
    this.callOnCompletion?.();
  }

  startRound = (iterationNumber, intervals) => {
    if (!isFinite(intervals[iterationNumber])) return;

    super.setTime(0, intervals[iterationNumber]);
    super.startTimer();

    console.log(!intervals[iterationNumber + 1]);
    if (!intervals[iterationNumber]) {
      console.log("усё");
      this.callOnCompletion = undefined;
      return;
    }

    this.callOnCompletion = () => {
      this.startRound(++iterationNumber, intervals);
    };
  };

  stopTomatoTimer() {}
  resetTomatoTimer() {}
}

let tomatoTimer = new TomatoTimer("taimers");
