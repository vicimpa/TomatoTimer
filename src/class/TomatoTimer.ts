import { DEFAULT_ITERATIONS_COUNT, DEFAULT_TIMES, DEFAULT_ZOOM } from "@/config";
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
  append = signal(false);
  step = computed<keyof TSteps>(() => {
    if (this.append.value)
      return this.computeNext() ? 'relax' : 'break';

    return 'work';
  });
  iters = signal(0);
  needIters = signal(DEFAULT_ITERATIONS_COUNT);
  zoom = signal(DEFAULT_ZOOM);

  computeNext(n = this.iters.value) {
    if (!this.needIters.value)
      return false;

    return !((n + 1) % this.needIters.value);
  }

  isNextLong = computed(() => this.computeNext());
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

    if (this.append.peek())
      this.iters.value++;

    this.append.value = !this.append.peek();
  }

  constructor() {
    super((_, dtime) => {
      this.time.value += dtime;
    });

    toEffect(this, () => {
      while (this.remaining.value < 0) {
        this.skip(
          this.time.peek() - this.stepTime.peek()
        );
      }
    });
  }

  reset() {
    this.resetCurrent();
    this.append.value = false;
    this.iters.value = 0;
    this.stop();
  }

  resetCurrent() {
    this.time.value = 0;
  }
}