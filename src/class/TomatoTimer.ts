import { DEFAULT_ITERATIONS_COUNT, DEFAULT_TIMES } from "@/config";
import { IDestructedClass, SymbolDestructor } from "@/hooks/useClass";
import { computed, effect, Signal, signal } from "@preact/signals-react";

import { Runner } from "./Runner";

export type TStepItem = {
  name: string;
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
export class TomatoTimer extends Runner implements IDestructedClass {
  time = signal(0);
  step = signal('work' as keyof TSteps);
  iters = signal(0);
  needIters = signal(DEFAULT_ITERATIONS_COUNT);

  isNextLong = computed(() => {
    if (!this.needIters.value)
      return false;

    return (this.iters.value + 1) % this.needIters.value === 0;
  });

  remaining = computed(() => this.stepTime.value - this.time.value);
  stepObject = computed(() => this.steps[this.step.value]);
  stepTime = computed(() => this.stepObject.value.time.value);
  stepName = computed(() => this.stepObject.value.name);

  steps: TSteps = {
    'work': { name: 'Работа 💪', time: signal(DEFAULT_TIMES.work) },
    'break': { name: 'Перерыв ⏱️', time: signal(DEFAULT_TIMES.break) },
    'relax': { name: 'Отдых 💤', time: signal(DEFAULT_TIMES.relax) }
  };

  skip(v?: number) {
    this.time.value = v ?? 0;
    v ?? this.stop();

    if (this.step.value === 'work') {
      this.step.value = this.isNextLong.value ? 'relax' : 'break';
    } else {
      this.step.value = 'work';
      this.iters.value++;
    }
  }

  #effect = effect(() => {
    while (this.remaining.value < 0) {
      this.skip(
        this.time.peek() - this.stepTime.peek()
      );
    }
  });

  [SymbolDestructor]() {
    super[SymbolDestructor]?.();
    this.#effect();
  }

  constructor() {
    super((_, dtime) => {
      this.time.value += dtime;
    });
  }

  reset() {
    this.resetCurrent();
    this.step.value = 'work';
    this.iters.value = 0;
    this.stop();
  }

  resetCurrent() {
    this.time.value = 0;
  }
}