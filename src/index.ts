import { Controller } from "class/Controller";
import { FDate } from "class/FDate";
import { TomatoTimer } from "class/TomatoTimer";
import { times } from "utils/times";

// Находим всё, что нужно
const timerElement = document.getElementById('timer')!;
const msTimerElement = document.getElementById('mstimer')!;
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

      // Start-stop
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

const ONE_MINUTES = FDate.fromString('1m');

// Маппим контроллеры
for (const element of controllers.querySelectorAll('label')) {
  const { name } = element.dataset;

  switch (name) {
    case 'work':
    case 'break':
    case 'relax': {
      new Controller(name!, element).subscribe(v => {
        timer.steps[name].time = (+v) * ONE_MINUTES;
      });
      break;
    }

    case 'iters': {
      new Controller(name!, element).subscribe((v) => {
        timer.needIters = +v - 1;
      });
      break;
    }
  }
}

// Рендерим результаты
timer.observer.subscribe(
  ({ time, stepName, isRunning }) => {
    const [ms, s, m, h] = times(time, [1000, 60, 60, 0]);

    const timeString = `${h}:${m}:${s}`;
    const msTimeString = ms.padStart(3, '0');
    const statusString = `[${stepName}] ${isRunning ? 'Запущен' : 'Остановлен'}`;

    if (timerElement.innerText !== timeString)
      timerElement.innerText = timeString;

    if (msTimerElement.innerText !== msTimeString)
      msTimerElement.innerText = msTimeString;

    if (statusInfo.innerText !== statusString)
      statusInfo.innerText = statusString;
  }
);