export const fromPath = <F extends () => any>(
  ctx: CanvasRenderingContext2D,
  runner: F
): ReturnType<F> => {
  try {
    ctx.beginPath();
    return runner();
  } finally {
    ctx.closePath();
  }
};