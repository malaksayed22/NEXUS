import { forwardRef, type HTMLAttributes, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@utils/cn";
import styles from "./styles.module.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant: "elevated" | "outlined" | "filled";
  isHoverable?: boolean;
  isClickable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  objectFit?: "cover" | "contain";
}

export type CardSectionProps = HTMLAttributes<HTMLDivElement>;

const CardHeader = ({ className, ...rest }: CardSectionProps) => (
  <div className={cn(styles.header, className)} {...rest} />
);

const CardBody = ({ className, ...rest }: CardSectionProps) => (
  <div className={cn(styles.body, className)} {...rest} />
);

const CardFooter = ({ className, ...rest }: CardSectionProps) => (
  <div className={cn(styles.footer, className)} {...rest} />
);

const CardImage = ({
  src,
  alt,
  aspectRatio = "16/9",
  objectFit = "cover",
}: CardImageProps) => (
  <div
    className={cn(
      styles.imageWrap,
      styles[`aspect${aspectRatio.replace("/", "x")}`],
    )}
  >
    <img
      src={src}
      alt={alt}
      className={cn(styles.image, styles[`fit${objectFit}`])}
      loading="lazy"
    />
  </div>
);

type CardCompound = React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Image: typeof CardImage;
};

const CardBase = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant,
      isHoverable = false,
      isClickable = false,
      padding = "md",
      className,
      role,
      tabIndex,
      onClick,
      onKeyDown,
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

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (isClickable && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        event.currentTarget.click();
      }

      onKeyDown?.(event);
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          styles.card,
          styles[variant],
          styles[`padding${padding[0]?.toUpperCase()}${padding.slice(1)}`],
          isHoverable && styles.hoverable,
          isClickable && styles.clickable,
          className,
        )}
        role={isClickable ? role ?? "button" : role}
        tabIndex={isClickable ? tabIndex ?? 0 : tabIndex}
        whileTap={isClickable ? { scale: 0.99 } : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    );
  },
) as CardCompound;

CardBase.displayName = "Card";

CardBase.Header = CardHeader;
CardBase.Body = CardBody;
CardBase.Footer = CardFooter;
CardBase.Image = CardImage;

export const Card = CardBase;

export type { CardProps as CardComponentProps };
export type { CardSectionProps as CardHeaderProps };
export type { CardSectionProps as CardBodyProps };
export type { CardSectionProps as CardFooterProps };
export type { CardImageProps as CardImageComponentProps };
