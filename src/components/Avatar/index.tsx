import { cn } from "@utils/cn";
import styles from "./styles.module.css";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  shape: "circle" | "square";
  status?: "online" | "away" | "busy" | "offline";
}

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
}

const colorClasses = [
  styles.colorA,
  styles.colorB,
  styles.colorC,
  styles.colorD,
  styles.colorE,
  styles.colorF,
];

const hashName = (name: string): number => {
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }

  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
};

const GenericPerson = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 12a4.2 4.2 0 1 0 0-8.4A4.2 4.2 0 0 0 12 12Zm0 2.4c-4.3 0-7.8 2.6-7.8 5.7V21h15.6v-.9c0-3.1-3.5-5.7-7.8-5.7Z"
      fill="currentColor"
    />
  </svg>
);

export const Avatar = ({
  src,
  alt,
  name,
  size,
  shape,
  status,
}: AvatarProps) => {
  const hasName = Boolean(name && name.trim().length > 0);
  const colorClass = hasName
    ? colorClasses[hashName(name ?? "") % colorClasses.length]
    : styles.colorA;

  const initials = hasName ? getInitials(name ?? "") : "";

  return (
    <span
      className={cn(styles.avatar, styles[size], styles[shape], colorClass)}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? name ?? "Avatar"}
          className={styles.image}
          loading="lazy"
        />
      ) : hasName ? (
        <span className={styles.initials} aria-label={name}>
          {initials}
        </span>
      ) : (
        <span className={styles.fallbackIcon} aria-label="Avatar placeholder">
          <GenericPerson />
        </span>
      )}

      {status ? (
        <span
          className={cn(
            styles.status,
            styles[`status${status}`],
            styles[`status${size}`],
          )}
          aria-label={status}
        />
      ) : null}
    </span>
  );
};

export const AvatarGroup = ({ avatars, max = 5 }: AvatarGroupProps) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;
  const overflowSize = visible[visible.length - 1]?.size ?? "md";
  const overflowShape = visible[visible.length - 1]?.shape ?? "circle";

  return (
    <div className={styles.group}>
      {visible.map((avatar, index) => (
        <span
          key={`${avatar.name ?? "avatar"}-${index}`}
          className={styles.groupItem}
        >
          <Avatar {...avatar} />
        </span>
      ))}

      {overflow > 0 ? (
        <span
          className={cn(
            styles.avatar,
            styles.groupOverflow,
            styles[overflowSize],
            styles[overflowShape],
          )}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
};

export type { AvatarProps as AvatarComponentProps };
export type { AvatarGroupProps as AvatarGroupComponentProps };
