import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@utils/cn";
import { useId } from "@utils/useId";
import styles from "./styles.module.css";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  size: "sm" | "md" | "lg";
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  isInvalid?: boolean;
  isSuccess?: boolean;
}

const WarningIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="M10 3.5 2.5 16.5h15L10 3.5Zm0 4.25v4.5m0 2.5h.01"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path
      d="m4 10 3.5 3.5L16 5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      size,
      leftAddon,
      rightAddon,
      isInvalid = false,
      isSuccess = false,
      id,
      disabled = false,
      className,
      placeholder,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const inputId = useId({ id, prefix: "input" });
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const describedByIds = [
      ariaDescribedBy,
      isInvalid && errorMessage ? errorId : undefined,
      !isInvalid && helperText ? helperId : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    const showError = isInvalid && Boolean(errorMessage);
    const showHelper = !showError && Boolean(helperText);
    const showSuccessIcon = isSuccess && !isInvalid;
    const rightContent = showSuccessIcon ? <SuccessIcon /> : rightAddon;
    const inputPlaceholder = label ? " " : placeholder;
    const resolvedAriaLabel =
      ariaLabel ?? label ?? placeholder ?? "Input field";

    return (
      <div
        className={cn(
          styles.wrapper,
          styles[size],
          label && styles.withLabel,
          isInvalid && styles.invalid,
          showSuccessIcon && styles.success,
          disabled && styles.disabled,
          className,
        )}
      >
        <div className={styles.control}>
          {leftAddon ? (
            <span className={cn(styles.addon, styles.leftAddon)}>
              {leftAddon}
            </span>
          ) : null}

          <div className={styles.fieldWrap}>
            <input
              {...rest}
              id={inputId}
              ref={ref}
              placeholder={inputPlaceholder}
              className={styles.input}
              disabled={disabled}
              aria-label={resolvedAriaLabel}
              aria-invalid={isInvalid || undefined}
              aria-describedby={describedByIds || undefined}
            />
            {label ? (
              <label htmlFor={inputId} className={styles.label}>
                {label}
              </label>
            ) : null}
          </div>

          {rightContent ? (
            <span className={cn(styles.addon, styles.rightAddon)}>
              {rightContent}
            </span>
          ) : null}
        </div>

        {showError ? (
          <p id={errorId} className={styles.errorText} role="alert">
            <span className={styles.errorIcon}>
              <WarningIcon />
            </span>
            {errorMessage}
          </p>
        ) : null}

        {showHelper ? (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export type { InputProps as InputComponentProps };
