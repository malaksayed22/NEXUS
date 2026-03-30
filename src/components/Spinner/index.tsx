import { forwardRef } from "react";
import { cn } from "@utils/cn";
import styles from "./styles.module.css";

export interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
  className?: string;
}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = "md", label = "Loading", className }, ref) => (
    <svg
      ref={ref}
      className={cn(styles.spinner, styles[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={label}
    >
      <circle
        className={styles.track}
        cx="12"
        cy="12"
        r="9"
        strokeWidth="3"
      />
      <path
        className={styles.head}
        d="M12 3a9 9 0 0 1 9 9"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
);

Spinner.displayName = "Spinner";

export type { SpinnerProps as SpinnerComponentProps };
