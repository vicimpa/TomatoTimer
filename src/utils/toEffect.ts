import { IDestructedClass, SymbolDestructor } from "@/hooks/useClass";
import { effect } from "@preact/signals-react";

export const toEffect = <T extends object>(object: T, effector: Function) => {
  var uneffect: Function | undefined;

  const old = SymbolDestructor in object ? object[SymbolDestructor] : null;
  const destruct = effect(() => {
    if (typeof uneffect === 'function')
      uneffect();

    uneffect = uneffect;
    uneffect = effector();
  });

  (object as IDestructedClass)[SymbolDestructor] = function () {
    if (typeof old === 'function')
      old.call(this);
    if (typeof uneffect === 'function')
      uneffect();
    uneffect = uneffect;
    destruct.call(this);
  };
};