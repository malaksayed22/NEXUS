import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useId } from "@utils/useId";
import { cn } from "@utils/cn";
import { getFocusableElements, useFocusTrap } from "@utils/useFocusTrap";
import styles from "./styles.module.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "fullscreen";
  title?: string;
  description?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  isCentered?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

let bodyLockCount = 0;
let previousBodyOverflow = "";
let previousBodyPaddingRight = "";

const lockBodyScroll = () => {
  if (typeof document === "undefined") {
    return;
  }

  if (bodyLockCount === 0) {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    previousBodyOverflow = document.body.style.overflow;
    previousBodyPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  bodyLockCount += 1;
};

const unlockBodyScroll = () => {
  if (typeof document === "undefined") {
    return;
  }

  bodyLockCount = Math.max(0, bodyLockCount - 1);
  if (bodyLockCount === 0) {
    document.body.style.overflow = previousBodyOverflow;
    document.body.style.paddingRight = previousBodyPaddingRight;
  }
};

export const Modal = ({
  isOpen,
  onClose,
  size = "md",
  title,
  description,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  isCentered = true,
  children,
  footer,
}: ModalProps) => {
  const titleId = useId({ prefix: "modal-title" });
  const descriptionId = useId({ prefix: "modal-description" });
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusedElementRef.current =
      document.activeElement as HTMLElement | null;
    lockBodyScroll();

    const focusTimeout = window.setTimeout(() => {
      const panelElement = panelRef.current;
      if (!panelElement) {
        return;
      }

      const focusableElements = getFocusableElements(panelElement);
      const firstFocusable = focusableElements[0];
      if (firstFocusable) {
        firstFocusable.focus();
        return;
      }

      panelElement.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimeout);
      unlockBodyScroll();
      previousFocusedElementRef.current?.focus();
    };
  }, [isOpen, panelRef]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={cn(styles.overlay, !isCentered && styles.overlayStart)}
          data-testid="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={(event) => {
            if (closeOnOverlayClick && event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={panelRef}
            className={cn(styles.panel, styles[size])}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close modal"
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {title || description ? (
              <header className={styles.header}>
                {title ? (
                  <h2 id={titleId} className={styles.title}>
                    {title}
                  </h2>
                ) : null}
                {description ? (
                  <p id={descriptionId} className={styles.description}>
                    {description}
                  </p>
                ) : null}
              </header>
            ) : null}

            <div
              className={cn(
                styles.body,
                Boolean(footer) && styles.bodyWithFooter,
              )}
            >
              {children}
            </div>

            {footer ? (
              <footer className={styles.footer}>{footer}</footer>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};

export type { ModalProps as ModalComponentProps };
