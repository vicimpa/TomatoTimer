import { Controller } from "class/Controller";
import { TomatoTimer, TSteps } from "class/TomatoTimer";
import { findBy } from "utils/findBy";
import { times } from "utils/times";

const infoElement = document.getElementById('timer')!;
const statusInfo = document.getElementById('status')!;
const buttons = document.getElementById('buttons')!;

const ctrlElements = findBy(
  (name) => (
    document
      .querySelector<HTMLElement>(
        `#controllers [data-name=${name}]`
      )!
  ),
  'work',
  'break',
  'relax',
  'iters'
);

const ctrl = new Controller(ctrlElements);
const timer = new TomatoTimer();

buttons.onclick = ({ target }) => {
  if (target instanceof HTMLButtonElement) {
    const click = target.dataset.action;

    if (!click) return;

    if (click in timer) {
      (timer as any)[click]();
    }
  }
};

ctrl.value.iters.value = `${timer.needIters + 1}`;
ctrl.value.iters.subscribe((v) => {
  timer.needIters = +v - 1;
});

for (const _key in ctrl.value) {
  if (_key in timer.steps) {
    const key = _key as keyof TSteps;
    const ctrlItem = ctrl.value[key];
    const valueItem = timer.steps[key];
    ctrlItem.value = `${valueItem.time / 60 / 1000 | 0}`;
    ctrlItem.subscribe(v => {
      valueItem.time = (+v) * 60 * 1000;
    });
  }
}
console.log(times(51576, [60, 60, 0]));
timer.observer.subscribe(
  ({ time, stepName, isRunning }) => {
    const [s, m, h] = times(time / 1000, [60, 60, 0]);

    const timeString = `${h}:${m}:${s}`;
    const statusString = `[${stepName}] ${isRunning ? 'Запущен' : 'Остановлен'}`;

    if (infoElement.innerText !== timeString)
      infoElement.innerText = timeString;

    if (statusInfo.innerText !== statusString)
      statusInfo.innerText = `[${stepName}] ${isRunning ? 'Запущен' : 'Остановлен'}`;
  }
);