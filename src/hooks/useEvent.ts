import { useCallback, useRef } from "react";

export const useEvent = <T extends (...args: any[]) => any>(
  func: T
) => {
  const ref = useRef(func);
  ref.current = func;
  return useCallback((
    (...args) => (
      ref.current(...args)
    )
  ) as T, []);
};