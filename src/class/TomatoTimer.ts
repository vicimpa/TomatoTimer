import { Observer } from "./Observer";
import { Timer } from "./Timer";

export type TStepItem = {
  name: string;
  time: number;
};

export type TSteps = {
  work: TStepItem;
  break: TStepItem;
  relax: TStepItem;
};

/**
 * Тут я заколебусь описывать =) Сам разберись
 */
export class TomatoTimer {
  #timer = new Timer();

  step: keyof TSteps = 'work';
  iters = 0;
  needIters = 3;

  steps: TSteps = {
    'work': {
      name: 'Работа 💪',
      time: 25 * 60 * 1000
    },
    'break': {
      name: 'Перерыв ⏱️',
      time: 5 * 60 * 1000
    },
    'relax': {
      name: 'Отдых 💤',
      time: 20 * 60 * 1000
    }
  };

  get stepObject() {
    return this.steps[this.step];
  }

  get stepTime() {
    return this.stepObject.time;
  }

  get stepName() {
    return this.stepObject.name;
  }

  get time() {
    return this.stepTime - this.#timer.value;
  }

  observer = new Observer(
    // Getter
    () => ({
      time: this.time,
      step: this.step,
      iters: this.iters,
      isRunning: this.#timer.isRunning,
      needIters: this.needIters,
      stepName: this.stepName,
      stepTime: this.stepTime,
    }),

    // Condition
    (a, b) => (
      true
      && a.step === b.step
      && a.time === b.time
      && a.iters === b.iters
      && a.isRunning === b.isRunning
    )
  );

  isNextLong() {
    if (!this.needIters)
      return false;

    return (this.iters + 1) % (this.needIters + 1) === 0;
  }

  skip(v?: number) {
    this.#timer.reset(v ?? 0);

    if (this.step === 'work') {
      this.step = this.isNextLong() ? 'relax' : 'break';
    } else {
      this.step = 'work';
      this.iters++;
    }
  }

  constructor() {
    this.#timer.subscribe(
      (v = 0) => {
        while (this.stepTime - v < 0) {
          v -= this.stepTime;
          this.skip(v);
        }
      }
    );
  }

  start() {
    this.#timer.start();
  }

  stop() {
    this.#timer.stop();
  }

  reset() {
    this.#timer.reset();
    this.step = 'work';
    this.iters = 0;
  }
}