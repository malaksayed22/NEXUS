import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@utils/cn";
import styles from "./styles.module.css";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  duration?: number;
  action?: ToastAction;
  onClose?: () => void;
}

interface ToastItem extends ToastOptions {
  id: string;
  variant: ToastVariant;
  message: string;
}

export interface ToastApi {
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

interface ToastContextValue {
  toast: ToastApi;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastComponentProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const DEFAULT_DURATION = 4000;

const ToastContext = createContext<ToastContextValue | null>(null);

const iconByVariant: Record<ToastVariant, React.ReactNode> = {
  success: (
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
  ),
  error: (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M6 6l8 8m0-8-8 8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  ),
  warning: (
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
  ),
  info: (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M10 6.5h.01M10 9v4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle
        cx="10"
        cy="10"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

let toastCounter = 0;

const nextToastId = (): string => {
  toastCounter += 1;
  return `toast-${toastCounter}`;
};

export const Toast = ({ toast, onDismiss }: ToastComponentProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingRef = useRef<number>(
    Number.isFinite(toast.duration)
      ? toast.duration ?? DEFAULT_DURATION
      : Infinity,
  );
  const rootRef = useRef<HTMLDivElement>(null);

  const duration = Number.isFinite(toast.duration)
    ? toast.duration ?? DEFAULT_DURATION
    : Infinity;

  const clearDismissTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const dismiss = useCallback(() => {
    toast.onClose?.();
    onDismiss(toast.id);
  }, [onDismiss, toast]);

  const scheduleDismiss = useCallback(
    (timeoutDuration: number) => {
      clearDismissTimeout();
      if (!Number.isFinite(timeoutDuration)) {
        return;
      }

      startTimeRef.current = Date.now();
      timeoutRef.current = setTimeout(() => {
        dismiss();
      }, timeoutDuration);
    },
    [dismiss],
  );

  useEffect(() => {
    if (rootRef.current && Number.isFinite(duration)) {
      rootRef.current.style.setProperty(
        "--toast-progress-duration",
        `${duration}ms`,
      );
    }

    if (!Number.isFinite(duration)) {
      return;
    }

    remainingRef.current = duration;
    scheduleDismiss(duration);

    return () => {
      clearDismissTimeout();
    };
  }, [duration, scheduleDismiss]);

  useEffect(() => {
    if (!Number.isFinite(duration)) {
      return;
    }

    if (isPaused) {
      const elapsed = Date.now() - startTimeRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      clearDismissTimeout();
      return;
    }

    scheduleDismiss(remainingRef.current);
  }, [duration, isPaused, scheduleDismiss]);

  return (
    <motion.div
      ref={rootRef}
      layout
      role="status"
      aria-live="polite"
      className={cn(styles.toast, styles[toast.variant])}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 60, opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.icon}>{iconByVariant[toast.variant]}</div>
      <div className={styles.contentWrap}>
        <p className={styles.message}>{toast.message}</p>
        {toast.action ? (
          <button
            type="button"
            className={styles.actionButton}
            onClick={toast.action.onClick}
          >
            {toast.action.label}
          </button>
        ) : null}
      </div>
      <button
        type="button"
        className={styles.dismissButton}
        aria-label="Dismiss notification"
        onClick={dismiss}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path
            d="M6 6l8 8m0-8-8 8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </button>
      {Number.isFinite(duration) ? (
        <div className={styles.progressTrack}>
          <div
            className={cn(
              styles.progressBar,
              isPaused && styles.progressPaused,
            )}
          />
        </div>
      ) : null}
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      <AnimatePresence initial={false}>
        {toasts.map((toastItem) => (
          <Toast key={toastItem.id} toast={toastItem} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((item) => item.id !== id),
    );
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const show = useCallback(
    (
      variant: ToastVariant,
      message: string,
      options?: ToastOptions,
    ): string => {
      const id = nextToastId();
      const toastItem: ToastItem = {
        id,
        variant,
        message,
        duration: options?.duration ?? DEFAULT_DURATION,
        action: options?.action,
        onClose: options?.onClose,
      };

      setToasts((currentToasts) => [...currentToasts, toastItem]);
      return id;
    },
    [],
  );

  const toastApi = useMemo<ToastApi>(
    () => ({
      success: (message, options) => show("success", message, options),
      error: (message, options) => show("error", message, options),
      warning: (message, options) => show("warning", message, options),
      info: (message, options) => show("info", message, options),
      dismiss,
      dismissAll,
    }),
    [dismiss, dismissAll, show],
  );

  const contextValue = useMemo<ToastContextValue>(
    () => ({ toast: toastApi }),
    [toastApi],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};

export type { ToastItem as ToastRecord };
