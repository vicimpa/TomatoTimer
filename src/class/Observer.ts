import { looper, runLoop, TRunner } from "utils/looper";

import { Subscriber, TSub } from "./Subscriber";

export type TObserve<T> = (time: number, dtime: number) => T;
export type TCondition<T> = (a: T, b: T) => any;

/**
 * @description
 * Херня для слежения за данными
 */
export class Observer<T> extends Subscriber<T> {
  #observe!: TObserve<T>;
  #condition!: TCondition<T>;
  #runner?: TRunner;

  get isRunning() {
    return Boolean(this.#runner);
  }

  /**
   * @param observe Функция получения данных
   * @param condition Необязательная функция сравнения данных
   */
  constructor(
    observe: TObserve<T>,
    condition?: TCondition<T>
  ) {
    super(runLoop(observe));
    this.#observe = observe;
    this.#condition = condition ?? ((a, b) => a === b);
  }

  /**
   * @description
   * Запуск цикла сравнения новых данных с предыдущими
   */
  start() {
    if (this.#runner)
      return;

    this.#runner = looper((time, dtime) => {
      // Получаем новые данные
      const result = this.#observe(time, dtime);

      // Сравниваем с предыдущими и устанавливаем, если не равны
      if (!this.#condition(this.value, result))
        this.value = result;
    });
  }

  /**
   * @description
   * Остановка цикла сравнения новых данных с предыдущими
   */
  stop() {
    if (!this.#runner)
      return;

    this.#runner();
    this.#runner = undefined;
  }

  /**
   * Так же как и в Subscriber
   */
  subscribe(callback: TSub<T>, initEvent = true) {
    try {
      return super.subscribe(callback, initEvent);
    } finally {
      // Если есть подписчики
      if (this.subsSize)
        this.start();

      // Если их нет
      if (!this.subsSize)
        this.stop();
    }
  }
}