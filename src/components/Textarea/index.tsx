import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@utils/cn";
import { useId } from "@utils/useId";
import styles from "./styles.module.css";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  maxLength?: number;
  autoResize?: boolean;
}

const AUTO_RESIZE_MAX_HEIGHT = 320;

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

const assignRef = <T,>(ref: React.ForwardedRef<T>, value: T | null): void => {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      isInvalid = false,
      maxLength,
      autoResize = false,
      id,
      disabled = false,
      className,
      value,
      defaultValue,
      onChange,
      rows = 4,
      placeholder,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const textareaId = useId({ id, prefix: "textarea" });
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    const countId = `${textareaId}-count`;

    const [uncontrolledValue, setUncontrolledValue] = useState(
      String(defaultValue ?? ""),
    );

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const mirrorRef = useRef<HTMLDivElement | null>(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value ?? "") : uncontrolledValue;

    useLayoutEffect(() => {
      if (!autoResize || !textareaRef.current || !mirrorRef.current) {
        return;
      }

      const mirrorEl = mirrorRef.current;
      const textareaEl = textareaRef.current;
      const mirrorHeight = mirrorEl.scrollHeight;
      const nextHeight = Math.min(mirrorHeight, AUTO_RESIZE_MAX_HEIGHT);

      textareaEl.style.height = `${nextHeight}px`;
      textareaEl.style.overflowY =
        mirrorHeight > AUTO_RESIZE_MAX_HEIGHT ? "auto" : "hidden";
    }, [autoResize, currentValue]);

    const showError = isInvalid && Boolean(errorMessage);
    const showHelper = !showError && Boolean(helperText);
    const showCount = typeof maxLength === "number";

    const describedByIds = [
      ariaDescribedBy,
      showError ? errorId : undefined,
      showHelper ? helperId : undefined,
      showCount ? countId : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    const usage = showCount ? currentValue.length / maxLength : 0;
    const countStateClass =
      usage >= 1
        ? styles.countDanger
        : usage >= 0.8
        ? styles.countWarning
        : styles.countNormal;

    const textareaPlaceholder = label ? " " : placeholder;
    const resolvedAriaLabel =
      ariaLabel ?? label ?? placeholder ?? "Textarea field";

    return (
      <div
        className={cn(
          styles.wrapper,
          label && styles.withLabel,
          isInvalid && styles.invalid,
          disabled && styles.disabled,
          className,
        )}
      >
        <div className={styles.control}>
          <div className={styles.fieldWrap}>
            <textarea
              {...rest}
              id={textareaId}
              ref={(node) => {
                textareaRef.current = node;
                assignRef(ref, node);
              }}
              value={value}
              defaultValue={defaultValue}
              onChange={(event) => {
                if (!isControlled) {
                  setUncontrolledValue(event.target.value);
                }
                onChange?.(event);
              }}
              placeholder={textareaPlaceholder}
              className={styles.textarea}
              rows={rows}
              maxLength={maxLength}
              disabled={disabled}
              aria-label={resolvedAriaLabel}
              aria-describedby={describedByIds || undefined}
            />

            {label ? (
              <label htmlFor={textareaId} className={styles.label}>
                {label}
              </label>
            ) : null}

            {autoResize ? (
              <div ref={mirrorRef} className={styles.mirror} aria-hidden="true">
                {`${currentValue || " "}\n`}
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.metaRow}>
          <div>
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

          {showCount ? (
            <p id={countId} className={cn(styles.countText, countStateClass)}>
              {currentValue.length} / {maxLength}
            </p>
          ) : null}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export type { TextareaProps as TextareaComponentProps };
