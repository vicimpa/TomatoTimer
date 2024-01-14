export type TSub<T> = (v: T) => any;

/**
 * @description
 * Херня для реактивности
 */
export class Subscriber<T> {
  #subs = new Set<TSub<T>>();

  get subsSize() {
    return this.#subs.size;
  }

  #value!: T;

  get value() {
    return this.#value;
  }

  set value(v) {
    if (v === this.#value)
      return;

    this.#value = v;
    this.update();
  }

  /**
   * @param initialValue Значение по-умолчанию
   */
  constructor(initialValue: T) {
    this.#value = initialValue;
  }

  /**
   * @description Херня дёргает подписчиков
   */
  update(): void {
    for (const sub of this.#subs)
      sub(this.#value);
  }

  /**
   * @description Подписывает функцию на обновление
   * @param callback Собственно функция обновления
   * @param initEvent Нужно ли дергать её изначально (по дефолту true)
   * @returns Тут функция для отписки данного подписчика
   */
  subscribe(callback: TSub<T>, initEvent = true) {
    if (initEvent)
      callback(this.#value);

    return (
      this.#subs.add(callback),
      () => {
        this.#subs.delete(callback);
      }
    );
  }
}