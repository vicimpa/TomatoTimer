import { ControllerItem } from "./ControllerItem";
import { Subscriber } from "./Subscriber";

export type TElements = { [key: string]: HTMLElement; };
export type TControllres<T extends TElements> = { [key in keyof T]: ControllerItem };

export class Controller<T extends TElements> extends Subscriber<TControllres<T>> {
  constructor(elements: T) {
    const ranges: TControllres<T> = {} as any;

    for (const key in elements) {
      const item = new ControllerItem(key, elements[key]);
      ranges[key] = item;
      item.subscribe(() => this.update(), false);
    }

    super(ranges);
  }
}