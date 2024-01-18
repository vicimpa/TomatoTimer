import { DEFAULT_ITERATIONS_COUNT, DEFAULT_TIMES } from "@/config";
import { toEffect } from "@/utils/toEffect";
import { computed, Signal, signal } from "@preact/signals-react";

import { Runner } from "./Runner";

export type TStepItem = {
  name: string;
  color: string;
  time: Signal<number>;
};

export type TSteps = {
  work: TStepItem;
  break: TStepItem;
  relax: TStepItem;
};

/**
 * Тут я заколебусь описывать =) Сам разберись
 */
export class TomatoTimer extends Runner {
  time = signal(0);
  iters = signal(0);
  speed = signal(1);
  total = signal(0);
  step = computed(this.computeStep.bind(this));
  needIters = signal(DEFAULT_ITERATIONS_COUNT);

  computeStep(iters = this.iters.value): keyof TSteps {
    const needIters = this.needIters.value;

    if (!(iters & 1))
      return 'work';

    return (
      false
      || !needIters
      || !(((iters / 2 | 0) + 1) % (needIters / 2))
    ) ? 'relax' : 'break';
  }

  remaining = computed(() => this.stepTime.value - this.time.value);
  stepObject = computed(() => this.steps[this.step.value]);
  stepTime = computed(() => this.stepObject.value.time.value);
  stepName = computed(() => this.stepObject.value.name);

  steps: TSteps = {
    'work': { name: 'Work time', color: '#3394f5', time: signal(DEFAULT_TIMES.work) },
    'break': { name: 'Break time', color: '#2e7d32', time: signal(DEFAULT_TIMES.break) },
    'relax': { name: 'Relax time', color: '#9c27b0', time: signal(DEFAULT_TIMES.relax) }
  };

  skip(v?: number) {
    this.time.value = v ?? 0;
    v ?? this.stop();
    this.iters.value++;
  }

  constructor() {
    super((_, dtime) => {
      const append = dtime * this.speed.peek();
      this.time.value += append;
      this.total.value += append;
    });

    toEffect(this, () => {
      while (this.remaining.value < 0)
        this.skip(this.time.peek() - this.stepTime.peek());
    });
  }

  reset() {
    this.resetCurrent();
    this.iters.value = 0;
    this.stop();
  }

  resetCurrent() {
    this.time.value = 0;
  }
}