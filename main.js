let timer = new Timer();

let test = document.getElementById("taimers");

test.innerHTML = timer.createTimer();
timer.setTime(0, 1, 5);

class PomodorDefaultSettings {
  constructor() {
    this.timer = 25;
    this.shortBreak = 5;
    this.longBreak = 15;
    this.rounds = 4;
  }
}

class PomodorUserSettings extends PomodorDefaultSettings {
  constructor() {
    super();
  }
  reset() {
    this.timer = super.timer;
    this.shortBreak = super.shortBreak;
    this.longBreak = super.longBreak;
    this.rounds = super.rounds;
  }
}

let pomodorUserSettings = new PomodorUserSettings();

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
      input = undefined;
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
      } else {
        HTMLElement = null;
      }

      throw new Error(`${linkElement} не  Object Key и не DOM element`);
    });
  }
}

let inputLinker = new linkInputInObject(pomodorUserSettings);
inputLinker.connect("inputTimer", ["timer", "valueTimer"]);
inputLinker.connect("inputShortBreak", ["shortBreak", "valueShortBreak"]);
inputLinker.connect("inputLongBreak", ["longBreak", "valueLongBreak"]);
inputLinker.connect("inputRounds", ["rounds", "valueRounds"]);

