import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@utils/cn";
import styles from "./styles.module.css";

export interface BadgeProps {
  variant: "default" | "success" | "warning" | "danger" | "info" | "brand";
  size: "sm" | "md";
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export const Badge = ({
  variant,
  size,
  dot = false,
  removable = false,
  onRemove,
  children,
}: BadgeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence onExitComplete={() => onRemove?.()}>
      {isVisible ? (
        <motion.span
          className={cn(styles.badge, styles[variant], styles[size])}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.82 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
          <span className={styles.content}>{children}</span>
          {removable ? (
            <button
              type="button"
              className={styles.removeButton}
              aria-label="Remove badge"
              onClick={() => setIsVisible(false)}
            >
              <span className={styles.removeIcon} aria-hidden="true">
                ×
              </span>
            </button>
          ) : null}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
};

export type { BadgeProps as BadgeComponentProps };
