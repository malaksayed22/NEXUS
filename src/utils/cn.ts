export type ClassValue = string | false | null | undefined;

export const cn = (...values: ClassValue[]): string => {
  return values
    .filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0,
    )
    .join(" ");
};
