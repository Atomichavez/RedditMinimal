import { useEffect, useRef } from "react";

export const useUpdateEffect = (effect, deps = []) => {
  const isFirstMount = useRef(true);
  useEffect(() => {
    if(!isFirstMount.current) effect()
    else isFirstMount.current = false
  }, [deps]);
}

export const feedPathParsing = (location) => {
  return location.split('/')[2]
}

export const subsPathParsing = (location) => {
  return location.split('/')[3]
}