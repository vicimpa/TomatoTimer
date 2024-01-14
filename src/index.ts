import { Controller } from "class/Controller";
import { TomatoTimer } from "class/TomatoTimer";
import { times } from "utils/times";

// Находим всё, что нужно
const infoElement = document.getElementById('timer')!;
const statusInfo = document.getElementById('status')!;
const buttons = document.getElementById('buttons')!;
const controllers = document.getElementById('controllers')!;

// Создаём таймер
const timer = new TomatoTimer();

// Подписываемся на кнопки
buttons.onclick = ({ target }) => {
  if (target instanceof HTMLButtonElement) {
    const click = target.dataset.action;

    switch (click) {
      // Обрабатываем стандартные события
      case 'reset':
      case 'skip': {
        timer[click]();
        break;
      }

      case 'start-stop': {
        if (timer.isRunning)
          timer.stop();
        else
          timer.start();
        break;
      }

      // Сбросить текущий
      case 'reset-current': {
        timer.reset(true);
        break;
      }
    }
  }
};

for (const element of controllers.querySelectorAll('label')) {
  const { name } = element.dataset;
  const ctrlItem = new Controller(name!, element);

  switch (name) {
    case 'work':
    case 'break':
    case 'relax': {
      const valueItem = timer.steps[name];
      ctrlItem.value = `${valueItem.time / 60 / 1000 | 0}`;
      ctrlItem.subscribe(v => {
        valueItem.time = (+v) * 60 * 1000;
      });
      break;
    }

    case 'iters': {
      ctrlItem.value = `${timer.needIters + 1}`;
      ctrlItem.subscribe((v) => {
        timer.needIters = +v - 1;
      });
      break;
    }
  }
}

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