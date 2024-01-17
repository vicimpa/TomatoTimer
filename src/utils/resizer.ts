const MAP_OBSERVER = new WeakMap<Element, Set<(e: ResizeObserverEntry) => any>>();

const observer = new ResizeObserver(
  (entries) => {
    for (const entry of entries) {
      for (const listener of MAP_OBSERVER.get(entry.target) ?? []) {
        listener(entry);
      }
    }
  }
);

export type TResizer = (width: number, height: number) => any;

export const resizer = (target: Element, callback: TResizer) => {
  const map = MAP_OBSERVER.get(target) ?? (
    MAP_OBSERVER.set(target, new Set()),
    MAP_OBSERVER.get(target)!
  );

  const resizer = (
    {
      contentRect: {
        width,
        height
      }
    }: ResizeObserverEntry
  ) => {
    callback(width, height);
  };

  map.add(resizer);
  observer.observe(target);

  return () => {
    map.delete(resizer);
    observer.unobserve(target);
  };
};