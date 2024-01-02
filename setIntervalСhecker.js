class IntervalMenagerie {
  constructor() {
    this.activeIntervals = {};

    this.originalSetInterval = window.setInterval.bind(window);
    this.originalClearInterval = window.clearInterval.bind(window);

    window.setInterval = this.setInterval.bind(this);
    window.clearInterval = this.clearInterval.bind(this);
  }

  setInterval(func, interval) {
    const intervalID = this.originalSetInterval(func, interval);
    this.activeIntervals[intervalID] = {
      name: func.name,
      function: func,
    };
    return intervalID;
  }

  clearInterval(intervalID) {
    delete this.activeIntervals[intervalID];
    this.originalClearInterval(intervalID);
  }
}

const intervalMenagerie = new IntervalMenagerie().activeIntervals;
