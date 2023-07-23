import { createContext, useContext } from "react";

export function createTypedContext<T>() {
  const ctx = createContext<T>(undefined as T);

  function useTypedContext(): T {
    if (!ctx) throw new Error("context provider not found");
    return useContext<T>(ctx);
  }

  return [useTypedContext, ctx.Provider, ctx.Consumer] as const;
}
