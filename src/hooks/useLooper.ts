import { useEffect } from "react";

import { looper, TLoop } from "@/utils/looper";

import { useEvent } from "./useEvent";

export const useLooper = <T extends TLoop>(
  func: T
) => {
  const refLooper = useEvent(func);

  useEffect(() => (
    looper(refLooper)
  ));
};