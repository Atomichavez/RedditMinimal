import { useEffect, useRef } from "react";

export const useUpdateEffect = (effect, deps = []) => {
  const isFirstMount = useRef(true);
  useEffect(() => {
    console.log(JSON.stringify(isFirstMount))
    if(!isFirstMount.current) effect()
    else isFirstMount.current = false
  }, [deps]);
}