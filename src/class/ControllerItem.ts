import { Subscriber } from "./Subscriber";

export class ControllerItem extends Subscriber<string> {
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

    input.onchange = input.oninput = () => {
      this.value = input.value;
    };

    this.subscribe(v => {
      this.#span.innerText = v;
      if (this.#input.value !== v)
        this.#input.value = v;
    });
  }
}
