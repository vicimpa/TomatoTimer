import { FC, useEffect, useRef } from "react";

import { Renderer } from "@/class/Renderer";
import { Vec2 } from "@/class/Vec2";
import { useEvent } from "@/hooks/useEvent";
import { looper } from "@/utils/looper";
import { resizer } from "@/utils/resizer";
import { styled } from "@mui/material";

const Container = styled('div')({
  position: 'relative'
});

const Content = styled('canvas')({
  position: 'absolute'
});

export type TRenderingFunction = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  time: number,
  deltaTime: number
) => any;

export type TCanvasProps = {
  width?: number | string;
  height?: number | string;
  rendering?: TRenderingFunction | Renderer;
};

export const Canvas: FC<TCanvasProps> = ({
  width = 'auto',
  height = 'auto',
  rendering = () => { }
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const refRendering = useEvent<TRenderingFunction>((a, b, c, d) => {
    rendering instanceof Renderer ? (
      rendering.update(c, d),
      rendering.render(a, b)
    ) : rendering(a, b, c, d);
  });

  useEffect(() => {
    if (!ref.current)
      return;

    const canvas = ref.current;
    const context = canvas.getContext('2d')!;
    const size = new Vec2();

    const offResizer = resizer(canvas.parentElement!, (
      (width, height) => (
        size.set(width, height)
      )
    ));

    const offLooper = looper((time, deltaTime) => {
      const oldSize = Vec2.fromSize(canvas);
      if (!oldSize.equal(size))
        Object.assign(canvas, size.size);

      context.resetTransform();
      context.clearRect(0, 0, size);
      refRendering(canvas, context, time, deltaTime);
    });

    return () => {
      offResizer();
      offLooper();
    };
  }, []);

  return (
    <Container style={{ width, height }}>
      <Content ref={ref} />
    </Container>
  );
};