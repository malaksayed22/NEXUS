import { AnimatePresence, motion } from "framer-motion";
import { cloneElement } from "react";
import { useId } from "@utils/useId";
import { cn } from "@utils/cn";
import { useTooltip } from "@utils/useTooltip";
import styles from "./styles.module.css";

export interface TooltipProps {
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
  disabled?: boolean;
  children: React.ReactElement;
}

const motionByPlacement: Record<
  NonNullable<TooltipProps["placement"]>,
  {
    initial: { opacity: number; x?: number; y?: number };
    animate: { opacity: number; x?: number; y?: number };
  }
> = {
  top: {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0 },
  },
  bottom: {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
  },
  left: {
    initial: { opacity: 0, x: 4 },
    animate: { opacity: 1, x: 0 },
  },
  right: {
    initial: { opacity: 0, x: -4 },
    animate: { opacity: 1, x: 0 },
  },
};

export const Tooltip = ({
  content,
  placement = "top",
  delay = 300,
  disabled = false,
  children,
}: TooltipProps) => {
  const tooltipId = useId({ prefix: "tooltip" });
  const { isVisible, showTooltip, hideTooltip } = useTooltip({
    delay,
    disabled,
  });

  const existingAriaDescribedBy = children.props["aria-describedby"] as
    | string
    | undefined;
  const nextAriaDescribedBy = isVisible
    ? [existingAriaDescribedBy, tooltipId].filter(Boolean).join(" ")
    : existingAriaDescribedBy;

  const trigger = cloneElement(children, {
    "aria-describedby": nextAriaDescribedBy || undefined,
    onMouseEnter: (event: React.MouseEvent) => {
      children.props.onMouseEnter?.(event);
      showTooltip();
    },
    onMouseLeave: (event: React.MouseEvent) => {
      children.props.onMouseLeave?.(event);
      hideTooltip();
    },
    onFocus: (event: React.FocusEvent) => {
      children.props.onFocus?.(event);
      showTooltip();
    },
    onBlur: (event: React.FocusEvent) => {
      children.props.onBlur?.(event);
      hideTooltip();
    },
  });

  return (
    <span className={styles.wrapper}>
      {trigger}
      <AnimatePresence>
        {isVisible && !disabled ? (
          <motion.span
            role="tooltip"
            id={tooltipId}
            className={cn(styles.tooltip, styles[placement])}
            initial={motionByPlacement[placement].initial}
            animate={motionByPlacement[placement].animate}
            exit={motionByPlacement[placement].initial}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {content}
            <span
              className={cn(styles.arrow, styles[`arrow${placement}`])}
              aria-hidden="true"
            />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
};

export type { TooltipProps as TooltipComponentProps };
