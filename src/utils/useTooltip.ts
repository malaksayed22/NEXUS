import { useCallback, useRef, useState } from "react";

export interface UseTooltipOptions {
  delay?: number;
  disabled?: boolean;
}

export interface UseTooltipResult {
  isVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
}

export const useTooltip = ({
  delay = 300,
  disabled = false,
}: UseTooltipOptions = {}): UseTooltipResult => {
  const [isVisible, setIsVisible] = useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = useCallback(() => {
    if (disabled) {
      return;
    }

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay, disabled]);

  const hideTooltip = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 50);
  }, []);

  return {
    isVisible,
    showTooltip,
    hideTooltip,
  };
};
