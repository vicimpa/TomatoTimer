export type TLoop = (time: number, dtime: number) => any;
export type TRunner = () => void;

var LOOP_SET = new Set<TLoop>();

var lastTime = -1;
var lastDeltatime = -1;

setInterval(() => {
  const time = performance.now();

  if (lastTime < 0) {
    lastTime = time;
    return;
  }

  lastDeltatime = time - lastTime;
  lastTime = time;

  for (const loop of LOOP_SET) {
    runLoop(loop);
  }
}, 1000 / 30);

export const runLoop = <T extends TLoop>(loop: T): ReturnType<T> => {
  return loop(lastTime, lastDeltatime);
};

export const looper = (loop: TLoop) => (
  LOOP_SET.add(loop),
  () => { LOOP_SET.delete(loop); }
);