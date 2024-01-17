import { looper, TLoop, TRunner } from "@/utils/looper";
import { computed, signal } from "@preact/signals-react";

export class Runner {
  #runner = signal<TRunner | undefined>(undefined);
  #loop!: TLoop;

  readonly isRunning = computed(() => !!this.#runner.value);

  constructor(loop: TLoop) {
    this.#loop = loop;
  }

  startStop() {
    if (this.#runner.value)
      this.stop();
    else
      this.start();
  }

  start() {
    if (this.#runner.value)
      return;

    this.#runner.value = looper(this.#loop);
  }

  stop() {
    if (!this.#runner.value)
      return;

    this.#runner.value();
    this.#runner.value = undefined;
  }
}