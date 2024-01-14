export type TSub<T> = (v: T) => any;

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

  constructor(initialValue: T) {
    this.#value = initialValue;
  }

  update(subscriber?: TSub<T>): void {
    if (subscriber)
      return subscriber(this.value);

    for (const sub of this.#subs)
      this.update(sub);
  }

  subscribe(callback: TSub<T>, initEvent = true) {
    if (initEvent)
      this.update(callback);

    return (
      this.#subs.add(callback),
      () => {
        this.#subs.delete(callback);
      }
    );
  }
}