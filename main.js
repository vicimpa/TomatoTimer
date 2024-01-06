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
    this.callOnCompletion = this.skipIterate;
    this.setCurrentTime();
  }

  skipIterate() {
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
      this.#currentRound + 1 > rounds && this.#currentInterval == 1
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
}

let tomatoTimer = new TomatoTimer("taimers");
