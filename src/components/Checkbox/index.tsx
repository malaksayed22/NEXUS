import { forwardRef, useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import { cn } from "@utils/cn";
import { useId } from "@utils/useId";
import styles from "./styles.module.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  size?: "sm" | "md" | "lg";
  indeterminate?: boolean;
  error?: boolean;
  helperText?: string;
}

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (el: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(el);
      else (ref as MutableRefObject<T | null>).current = el;
    });
  };
}

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M2 6l3 3 5-5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DashIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M2.5 6h7"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = "md",
      indeterminate = false,
      error = false,
      helperText,
      id: idProp,
      disabled = false,
      checked,
      className,
      ...rest
    },
    forwardedRef,
  ) => {
    const generatedId = useId({ prefix: "checkbox" });
    const id = idProp ?? generatedId;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate && !checked;
      }
    }, [indeterminate, checked]);

    const isIndeterminate = indeterminate && !checked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      rest.onChange?.(e);
    };

    return (
      <div className={cn(styles.root, disabled && styles.disabled, className)}>
        <label className={cn(styles.label, styles[size])} htmlFor={id}>
          <input
            ref={mergeRefs(inputRef, forwardedRef)}
            id={id}
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            checked={checked}
            aria-invalid={error || undefined}
            {...rest}
            onChange={handleChange}
          />
          <span
            className={cn(
              styles.box,
              styles[size],
              checked && styles.checked,
              isIndeterminate && styles.indeterminate,
              error && styles.errorBox,
            )}
            aria-hidden="true"
          >
            {checked ? <CheckIcon /> : isIndeterminate ? <DashIcon /> : null}
          </span>
          {label ? <span className={styles.labelText}>{label}</span> : null}
        </label>
        {helperText ? (
          <p
            className={cn(
              styles.helperText,
              error && styles.helperError,
            )}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export type { CheckboxProps as CheckboxComponentProps };
