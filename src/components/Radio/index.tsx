import { createContext, forwardRef, useContext } from "react";
import { cn } from "@utils/cn";
import { useId } from "@utils/useId";
import styles from "./styles.module.css";

/* ── Context ─────────────────────────────────────────────────────────────── */

interface RadioContextValue {
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled: boolean;
  size: "sm" | "md" | "lg";
}

const RadioContext = createContext<RadioContextValue | null>(null);

const useRadioContext = (): RadioContextValue => {
  const ctx = useContext(RadioContext);
  if (!ctx) {
    throw new Error("Radio must be used inside RadioGroup");
  }
  return ctx;
};

/* ── RadioGroup ──────────────────────────────────────────────────────────── */

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  orientation?: "vertical" | "horizontal";
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup = ({
  name,
  value,
  onChange,
  disabled = false,
  size = "md",
  orientation = "vertical",
  label,
  children,
  className,
}: RadioGroupProps) => (
  <RadioContext.Provider value={{ name, value, onChange, disabled, size }}>
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        styles.group,
        orientation === "horizontal" && styles.horizontal,
        className,
      )}
    >
      {children}
    </div>
  </RadioContext.Provider>
);

/* ── Radio ───────────────────────────────────────────────────────────────── */

export interface RadioProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "onChange" | "checked"
  > {
  value: string;
  label?: string;
  helperText?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value: radioValue, label, helperText, id: idProp, disabled: radioProp, className, ...rest }, ref) => {
    const { name, value, onChange, disabled: groupDisabled, size } =
      useRadioContext();
    const isDisabled = radioProp || groupDisabled;
    const isChecked = value === radioValue;
    const generatedId = useId({ prefix: "radio" });
    const id = idProp ?? generatedId;

    return (
      <div className={cn(styles.root, isDisabled && styles.disabled, className)}>
        <label className={cn(styles.label, styles[size])} htmlFor={id}>
          <input
            ref={ref}
            id={id}
            type="radio"
            name={name}
            value={radioValue}
            checked={isChecked}
            disabled={isDisabled}
            className={styles.input}
            onChange={() => { if (!isDisabled) onChange(radioValue); }}
            {...rest}
          />
          <span
            className={cn(styles.dot, styles[size], isChecked && styles.checked)}
            aria-hidden="true"
          >
            {isChecked ? <span className={styles.innerDot} /> : null}
          </span>
          {label ? <span className={styles.labelText}>{label}</span> : null}
        </label>
        {helperText ? (
          <p className={styles.helperText}>{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Radio.displayName = "Radio";

export type { RadioGroupProps as RadioGroupComponentProps };
export type { RadioProps as RadioComponentProps };
