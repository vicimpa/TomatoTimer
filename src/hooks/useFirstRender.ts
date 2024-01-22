import { useEffect, useRef } from "react";

export const useFirstRender = () => {
  const isFirst = useRef(true);

  useEffect(() => {
      isFirst.current = false;
  }, [])

  return isFirst.current;
}