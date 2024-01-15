import { Subscriber } from "./Subscriber";

/**
 * @description
 * Это контроллер для структуры
 * ```html
 * <label>
 *    <span></span>
 *    - Какой-то текст
 *    <input />
 * </label>
 * ```
 */
export class Controller extends Subscriber<string> {
  #span!: HTMLSpanElement;
  #input!: HTMLInputElement;

  constructor(key: string, elem: HTMLElement) {
    if (!(elem instanceof HTMLLabelElement))
      throw new Error(`${key} is not label element`);

    const span = elem.querySelector('span');
    const input = elem.querySelector('input');

    if (!span) throw new Error(`${key} not have span!`);
    if (!input) throw new Error(`${key} not have input!`);

    super(input.value);

    this.#span = span;
    this.#input = input;

    // При изменении input устанавливаем значение в Subscriber
    input.onchange = input.oninput = () => {
      if (this.value !== input.value)
        this.value = input.value;
    };

    // При изменении Subscriber ставить значения в span и input
    this.subscribe(v => {
      this.#span.innerText = v;
      if (this.#input.value !== v)
        this.#input.value = v;
    });
  }
}
