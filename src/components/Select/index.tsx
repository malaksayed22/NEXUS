import { forwardRef } from "react";
import { cn } from "@utils/cn";
import { useId } from "@utils/useId";
import styles from "./styles.module.css";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

const ChevronIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={styles.chevron}
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      size = "md",
      error = false,
      helperText,
      placeholder,
      id: idProp,
      disabled = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId({ prefix: "select" });
    const id = idProp ?? generatedId;
    const helperId = `${id}-helper`;

    return (
      <div className={cn(styles.root, disabled && styles.disabled, className)}>
        {label ? (
          <label className={cn(styles.label, styles[size])} htmlFor={id}>
            {label}
          </label>
        ) : null}
        <div className={styles.selectWrap}>
          <select
            ref={ref}
            id={id}
            className={cn(
              styles.select,
              styles[size],
              error && styles.errorSelect,
            )}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-describedby={helperText ? helperId : undefined}
            {...rest}
            onChange={(e) => { if (!disabled) rest.onChange?.(e); }}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {children}
          </select>
          <ChevronIcon />
        </div>
        {helperText ? (
          <p
            id={helperId}
            className={cn(styles.helperText, error && styles.helperError)}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";

export type { SelectProps as SelectComponentProps };
