

import { Renderer } from "./Renderer";
import { TomatoTimer } from "./TomatoTimer";
import { Vec2 } from "./Vec2";

export class TimeLine extends Renderer {
  count = 30;

  constructor(public timer: TomatoTimer) {
    super();
  }

  update(_time: number, _dtime: number): void {

  }

  render(can: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    const size = Vec2.fromSize(can).times(.5);
    const aSize = size.times(1, .5);
    const bSize = size.ctimes(1, .3);
    const step = size.x / this.count;

    ctx.translate(size);

    for (let i = 0; i < this.count; i++) {
      const x = i * step;
      const y = i % 5 ? bSize.y : aSize.y;

      ctx.moveTo(x, -y);
      ctx.lineTo(x, y);
      ctx.moveTo(-x, -y);
      ctx.lineTo(-x, y);
      ctx.stroke();
    }
  }
}