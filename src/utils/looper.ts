export type TLoop = (time: number, dtime: number) => any;
export type TRunner = () => void;

var LOOP_SET = new Set<TLoop>();

var lastTime = -1;
var lastDeltatime = -1;

const loop = (time: number) => {
  requestAnimationFrame(loop);

  if (lastTime < 0) {
    lastTime = time;
    return;
  }

  lastDeltatime = time - lastTime;
  lastTime = time;

  for (const loop of LOOP_SET) {
    runLoop(loop);
  }
};

requestAnimationFrame(loop);

export const runLoop = <T extends TLoop>(loop: T): ReturnType<T> => {
  return loop(lastTime, lastDeltatime);
};

export const looper = (loop: TLoop) => (
  LOOP_SET.add(loop),
  () => { LOOP_SET.delete(loop); }
);