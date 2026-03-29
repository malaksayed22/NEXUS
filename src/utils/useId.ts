import { useId as useReactId } from "react";

export interface UseIdOptions {
  id?: string;
  prefix?: string;
}

export const useId = (options: UseIdOptions = {}): string => {
  const { id, prefix = "field" } = options;
  const generatedId = useReactId().replace(/:/g, "");

  return id ?? `${prefix}-${generatedId}`;
};
