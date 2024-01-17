import { useLayoutEffect, useMemo } from "react";

export const SymbolDestructor = Symbol('destructor');

export interface IDestructedClass {
  [SymbolDestructor]: () => void;
}

export const useClass = <T, A extends any[]>(
  classType: new (...args: A) => T,
  ...args: A
) => {
  const object = useMemo(() => (
    new classType(...args)
  ), [...args]) as T & { [SymbolDestructor]?: () => void; };

  useLayoutEffect(() => {
    if (!object[SymbolDestructor])
      return;

    return () => {
      object[SymbolDestructor]?.();
    };
  }, [...args]);

  return object;
};