import { cos, hypot, max, min, rem, rems, sin } from "@/utils/math";

type TMutation = (x: number, y: number) => any;
type TParameter = [] | [vec: Vec2] | [xy: number] | [x: number, y: number];
type TPointVec2 = { x: number, y: number; };
type TTupleVec2 = [x: number, y: number];
type TSizeVec2 = { width: number, height: number; };
type TRect2 = [
  ...([x: number, y: number] | [xy: Vec2]),
  ...([w: number, h: number] | [wh: Vec2])
];

export class Vec2 {
  x: number = 0;
  y: number = 0;

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

  get tuple(): TTupleVec2 {
    return [this.x, this.y];
  }

  get size(): TSizeVec2 {
    return {
      width: this.x,
      height: this.y
    };
  }

  get point(): TPointVec2 {
    return {
      x: this.x,
      y: this.y
    };
  }

  constructor(...args: TParameter) {
    this.set(...args);
  }

  mutation<F extends TMutation>(args: TParameter, mutation: F): ReturnType<F> {
    const first = args[0] ?? 0;

    if (first instanceof Vec2)
      return mutation(first.x, first.y);

    return mutation(first, args[1] ?? first);
  }

  equal(...args: TParameter) {
    return this.mutation(args, (x, y) => {
      return x === this.x && y === this.y;
    });
  }

  inRect(...args: TRect2) {
    const [x, y, w, h] = args.reduce<number[]>((acc, e) => (
      e instanceof Vec2 ? (
        acc.concat(e.x, e.y)
      ) : (
        acc.concat(e)
      )
    ), []);

    if (
      false
      || this.x < x
      || this.y < y
      || this.x > w + x
      || this.y > h + y
    ) return false;

    return true;
  }

  cropMin(...args: TParameter) {
    this.mutation(args, (x, y) => {
      this.x = max(this.x, x);
      this.y = max(this.y, y);
    });
    return this;
  }

  cropMax(...args: TParameter) {
    this.mutation(args, (x, y) => {
      this.x = min(this.x, x);
      this.y = min(this.y, y);
    });
    return this;
  }

  set(...args: TParameter) {
    this.mutation(args, (x, y) => {
      this.x = x;
      this.y = y;
    });
    return this;
  }

  plus(...args: TParameter) {
    this.mutation(args, (x, y) => {
      this.x += x;
      this.y += y;
    });
    return this;
  }

  minus(...args: TParameter) {
    this.mutation(args, (x, y) => {
      this.x -= x;
      this.y -= y;
    });
    return this;
  }

  times(...args: TParameter) {
    this.mutation(args, (x, y) => {
      this.x *= x;
      this.y *= y;
    });
    return this;
  }

  div(...args: TParameter) {
    this.mutation(args, (x, y) => {
      this.x /= x;
      this.y /= y;
    });
    return this;
  }

  rem(...args: TParameter) {
    this.mutation(args, (x, y) => {
      this.x = rem(this.x, x);
      this.y = rem(this.y, y);
    });
    return this;
  }

  rems(...args: TParameter) {
    this.mutation(args, (x, y) => {
      this.x = rems(this.x, x);
      this.y = rems(this.y, y);
    });
    return this;
  }

  clone() {
    return new Vec2(this);
  }

  cplus(...args: TParameter) {
    return this.clone().plus(...args);
  }

  cminus(...args: TParameter) {
    return this.clone().minus(...args);
  }

  ctimes(...args: TParameter) {
    return this.clone().times(...args);
  }

  cdiv(...args: TParameter) {
    return this.clone().div(...args);
  }

  crem(...args: TParameter) {
    return this.clone().rem(...args);
  }

  crems(...args: TParameter) {
    return this.clone().rems(...args);
  }

  length() {
    return hypot(...this);
  }

  distance(...args: TParameter) {
    return this.cminus(...args).length();
  }

  normalize() {
    return this.div(this.length());
  }

  cnormalize() {
    return this.clone().normalize();
  }

  static fromAngle(d: number) {
    return new this(sin(d), cos(d));
  }

  static fromPoint(point: TPointVec2) {
    return new this(point.x, point.y);
  }

  static fromSize(point: TSizeVec2) {
    return new this(point.width, point.height);
  }
}