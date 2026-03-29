import { forwardRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@utils/cn";
import styles from "./styles.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "ghost" | "danger";
  size: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const iconSizeClassMap: Record<ButtonProps["size"], string> = {
  sm: styles.iconSM,
  md: styles.iconMD,
  lg: styles.iconLG,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      isLoading = false,
      leftIcon = undefined,
      rightIcon = undefined,
      fullWidth = false,
      disabled = false,
      type = "button",
      className,
      children,
      onClick,
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      ...rest
    },
    ref,
  ) => {
    void onDrag;
    void onDragStart;
    void onDragEnd;
    void onAnimationStart;
    void onAnimationEnd;
    void onAnimationIteration;

    const isDisabled = disabled || isLoading;
    const iconSizeClass = iconSizeClassMap[size];

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          className,
        )}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        data-loading={isLoading ? "true" : "false"}
        whileTap={!isDisabled ? { scale: 0.97 } : undefined}
        transition={{ duration: 0.15, ease: "easeOut" }}
        onClick={handleClick}
        {...rest}
      >
        <span className={cn(styles.content, isLoading && styles.contentHidden)}>
          {leftIcon ? (
            <span className={cn(styles.icon, iconSizeClass)}>{leftIcon}</span>
          ) : null}
          {children}
          {rightIcon ? (
            <span className={cn(styles.icon, iconSizeClass)}>{rightIcon}</span>
          ) : null}
        </span>

        <AnimatePresence>
          {isLoading ? (
            <motion.span
              className={styles.loaderWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <svg
                className={styles.spinner}
                viewBox="0 0 24 24"
                role="status"
                aria-label="Loading"
              >
                <circle
                  className={styles.spinnerTrack}
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  strokeWidth="3"
                />
                <path
                  className={styles.spinnerHead}
                  d="M12 3a9 9 0 0 1 9 9"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.button>
    );
  },
);

Button.displayName = "Button";
