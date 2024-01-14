import { looper, TRunner } from "utils/looper";

import { Subscriber } from "./Subscriber";

export type TTransform<T> = (v: number) => T;

export class Timer<T = number> extends Subscriber<T> {
  #runner?: TRunner;
  #denom: TTransform<T>;

  #current = 0;

  get current() {
    return this.#current;
  }

  set current(v) {
    this.#current = v;
    this.value = this.#denom(v);
  }

  constructor(denom?: TTransform<T>) {
    super((denom?.(0) ?? 0) as any);
    this.#denom = denom ?? ((v: number) => v) as any;
  }

  get isRunning() {
    return Boolean(this.#runner);
  }

  start() {
    if (this.#runner) return;
    this.#runner = looper((_, dtime) => {
      this.current += dtime;
    });
  }

  stop() {
    if (!this.#runner) return;

    this.#runner();
    this.#runner = undefined;
  }

  reset(v?: number) {
    v ?? this.stop();
    this.current = v ?? 0;
  }
}