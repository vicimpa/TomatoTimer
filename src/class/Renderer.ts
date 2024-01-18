export class Renderer {
  can!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  time!: number;
  dtime!: number;

  update(): void { }
  render(): void { }
}