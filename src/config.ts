import { FDate } from "./class/FDate";

export const DEFAULT_TIMES = {
  work: FDate.fromString('25m'),
  break: FDate.fromString('5m'),
  relax: FDate.fromString('20m')
};

export const DEFAULT_ITERATIONS_COUNT = 4;
export const DEFAULT_SPEED = 1;
export const DEFAULT_ZOOM = FDate.fromString('10s');
export const ONE_MINUTES = FDate.fromString('1m');