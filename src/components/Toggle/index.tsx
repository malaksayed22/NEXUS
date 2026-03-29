import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@utils/cn";
import styles from "./styles.module.css";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  ariaLabel?: string;
  labelPosition?: "left" | "right";
  size: "sm" | "md" | "lg";
  disabled?: boolean;
}

const thumbOffsetMap: Record<ToggleProps["size"], number> = {
  sm: 12,
  md: 20,
  lg: 24,
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked,
      onChange,
      label,
      ariaLabel,
      labelPosition = "right",
      size,
      disabled = false,
    },
    ref,
  ) => {
    const toggle = () => {
      if (disabled) {
        return;
      }
      onChange(!checked);
    };

    return (
      <label className={cn(styles.wrapper, disabled && styles.disabled)}>
        {label && labelPosition === "left" ? (
          <span className={styles.label}>{label}</span>
        ) : null}

        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={ariaLabel ?? label ?? "Toggle"}
          className={cn(styles.track, styles[size], checked && styles.checked)}
          disabled={disabled}
          onClick={toggle}
          onKeyDown={(event) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              toggle();
            }
          }}
        >
          <motion.span
            className={styles.thumb}
            animate={{ x: checked ? thumbOffsetMap[size] : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>

        {label && labelPosition === "right" ? (
          <span className={styles.label}>{label}</span>
        ) : null}
      </label>
    );
  },
);

Toggle.displayName = "Toggle";

export type { ToggleProps as ToggleComponentProps };
