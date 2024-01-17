export abstract class Renderer {
  abstract update(
    time: number,
    dtime: number
  ): void;

  abstract render(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void;
}