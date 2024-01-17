import { fromPath } from "@/utils/fromPath";
import { round } from "@/utils/math";
import { toEffect } from "@/utils/toEffect";
import { computed, signal } from "@preact/signals-react";

import { Renderer } from "./Renderer";
import { TomatoTimer } from "./TomatoTimer";
import { Vec2 } from "./Vec2";

export class TimeLine extends Renderer {
  count = 30;
  time = 0;
  iters = 0;
  size = signal(new Vec2());

  constructor(public timer: TomatoTimer) {
    super();

    toEffect(this, () => {
      this.time = this.timer.time.value;
      this.iters = this.timer.iters.value;
    });
  }

  update(_time: number, _dtime: number): void { }

  steps = computed(() => {
    const { timer } = this;
    const size = this.size.value;
    const iters = timer.iters.value;
    const steps: { s: number, e: number; c: string; }[] = [];
    const draw = timer.zoom.value;

    var totalRight = 0;
    var totalLeft = 0;

    for (let i = 0; totalRight < size.x * 2; i++) {
      const key = timer.computeNext(iters + i) ? 'relax' : 'break';
      const workTime = timer.steps.work.time.value / draw;
      const freeTime = timer.steps[key].time.value / draw;

      if (timer.step.value !== 'work' && i == 0) {
        totalRight -= workTime;
        totalLeft -= workTime;
      }

      steps.push({ s: totalRight, e: totalRight += workTime, c: timer.steps.work.color });
      steps.push({ s: totalRight, e: totalRight += freeTime, c: timer.steps[key].color });
    }

    for (let i = -1; totalLeft > -size.x && iters + i >= 0; i--) {
      const key = timer.computeNext(iters + i) ? 'relax' : 'break';
      const workTime = timer.steps.work.time.value / draw;
      const freeTime = timer.steps[key].time.value / draw;

      steps.unshift({ s: totalLeft -= freeTime, e: freeTime, c: timer.steps[key].color });
      steps.unshift({ s: totalLeft -= workTime, e: workTime, c: timer.steps.work.color });
    }

    return steps;
  });

  render(can: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    const { timer } = this;
    const size = Vec2.fromSize(can).times(.5);
    const draw = timer.zoom.value;
    const time = this.time / draw;
    if (!this.size.value.equal(size))
      this.size.value = size;

    ctx.translate(size);

    for (const step of this.steps.value) {
      fromPath(ctx, () => {
        ctx.fillStyle = step.c;
        ctx.fillRect(step.s - round(time), -size.y + 5, step.e - step.s, size.y * 2);
      });
    }

    fromPath(ctx, () => {
      ctx.strokeStyle = '#fff';
      ctx.moveTo(0, -size.y);
      ctx.lineTo(0, size.y * .4);
      ctx.stroke();
    });

    fromPath(ctx, () => {
      ctx.moveTo(0, -size.y + 5);
      ctx.lineTo(-5, -size.y);
      ctx.lineTo(5, -size.y);
      ctx.fillStyle = timer.stepObject.value.color;
      ctx.fill();
    });
  }
}