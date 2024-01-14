import { looper } from "utils/looper";

import { Subscriber, TSub } from "./Subscriber";

export type TObserve<T> = () => T;
export type TCondition<T> = (a: T, b: T) => any;

export class Observer<T> extends Subscriber<T> {
  #observe!: TObserve<T>;
  #condition!: TCondition<T>;
  #runner!: (() => void) | undefined;

  constructor(
    observe: TObserve<T>,
    condition?: TCondition<T>
  ) {
    super(observe());
    this.#observe = observe;
    this.#condition = condition ?? ((a, b) => a === b);
  }

  subscribe(callback: TSub<T>, initEvent = true) {
    try {
      return super.subscribe(callback, initEvent);
    } finally {
      if (this.subsSize && !this.#runner) {
        this.#runner = looper(() => {
          const result = this.#observe();

          if (!this.#condition(this.value, result))
            this.value = result;
        });
      }

      if (!this.subsSize && this.#runner) {
        this.#runner();
        this.#runner = undefined;
      }
    }
  }
}