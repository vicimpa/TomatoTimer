import { DEFAULT_ZOOM } from "@/config";
import { fromPath } from "@/utils/fromPath";
import { max, round } from "@/utils/math";
import { computed, Signal, signal } from "@preact/signals-react";

import { Renderer } from "./Renderer";
import { TomatoTimer } from "./TomatoTimer";
import { Vec2 } from "./Vec2";

export class TimeLine extends Renderer {
  iters = 0;
  size = signal(new Vec2());

  constructor(
    public timer: TomatoTimer,
    public zoom: Signal<number> = signal(DEFAULT_ZOOM)
  ) {
    super();
  }

  steps = computed(() => {
    const { timer } = this;
    const size = this.size.value;
    const iters = timer.iters.value;
    const steps: { s: number, e: number; c: string; }[] = [];
    const draw = this.zoom.value;
    const maxLength = max(...Object.values(timer.steps).map(e => e.time.value)) / draw;

    var totalLeft = 0, totalRight = 0;

    for (let i = 0; totalRight < size.x + maxLength; i++) {
      const step = timer.computeStep(iters + i);
      const { time, color: c } = timer.steps[step];
      const fixValue = time.value / draw;
      steps.push({ s: totalRight, e: totalRight += fixValue, c });
    }

    for (let i = -1; totalLeft > -size.x && iters + i >= 0; i--) {
      const step = timer.computeStep(iters + i);
      const { time, color: c } = timer.steps[step];
      const fixValue = time.value / draw;
      steps.unshift({ s: totalLeft -= fixValue, e: fixValue, c });
    }

    return steps;
  });

  render(): void {
    const { can, ctx } = this;
    const { timer } = this;
    const size = Vec2.fromSize(can).times(.5);
    const draw = this.zoom.value;
    const time = timer.time.value / draw;

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