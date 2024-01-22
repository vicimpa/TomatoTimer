import { DEFAULT_ITERATIONS_COUNT, DEFAULT_SPEED, DEFAULT_TIMES } from "@/config";
import { Signal, batch, effect, signal } from "@preact/signals-react";
import { CodeGenerator } from "./CodeGenerator";
import { SafeLocalStorage } from "./SafeStorage";
import { TomatoTimer } from "./TomatoTimer";

type TPreset = {
  tomato: TomatoTimer;
  codeGenerator: typeof CodeGenerator;
};

export class TomatoTimerPreset {
  #code: Signal<string>;
  #tomato: TomatoTimer;
  #codeGenerator: typeof CodeGenerator;

  constructor({ tomato, codeGenerator }: TPreset) {
    this.#codeGenerator = codeGenerator;
    this.#tomato = tomato;

    this.#code = signal(
      SafeLocalStorage.getItem(TomatoTimerPreset.name) ||
        this.#codeGenerator.generateCode([
          DEFAULT_TIMES.work,
          DEFAULT_TIMES.break,
          DEFAULT_TIMES.relax,
        ])
    );

    this.#toEffects();
  }

  get code() {
    return this.#code.value;
  }

  loadCode(code: string) {
    this.#code.value = code;

    const [workTime, breakTime, relaxTime, needIters, speed] =
      this.#codeGenerator.parseCode(this.#code.value) as number[];

    batch(() => {
      this.#tomato.steps.work.time.value = workTime;
      this.#tomato.steps.break.time.value = breakTime;
      this.#tomato.steps.relax.time.value = relaxTime;
      this.#tomato.speed.value = speed;
      this.#tomato.needIters.value = needIters;
    });
  }

  reset() {
    this.#tomato.reset();
    batch(() => {
      this.#tomato.steps.work.time.value = DEFAULT_TIMES.work;
      this.#tomato.steps.break.time.value = DEFAULT_TIMES.break;
      this.#tomato.steps.relax.time.value = DEFAULT_TIMES.relax;
      this.#tomato.needIters.value = DEFAULT_ITERATIONS_COUNT;
      this.#tomato.speed.value = DEFAULT_SPEED;
    })
  }

  checkCode(code?: string) {
    return this.#codeGenerator.testCode(code || this.#code.value);
  }

  #toEffects() {
    effect(() => {
      const tomatoOptions = [
        this.#tomato.steps.work.time.value,
        this.#tomato.steps.break.time.value,
        this.#tomato.steps.relax.time.value,
        this.#tomato.needIters.value,
        this.#tomato.speed.value,
      ];

      this.#code.value = this.#codeGenerator.generateCode(tomatoOptions);
    });

    effect(() => {
      SafeLocalStorage.setItem(TomatoTimerPreset.name, this.#code.value);
    })
  }
}
