type AvatarSize = "sm" | "md" | "lg";
type AvatarVariant = "default" | "primary";

interface AvatarProps {
  initials: string;
  variant?: AvatarVariant;
  size?: AvatarSize;
}

const SIZE: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-label-s",
  md: "w-10 h-10 text-body-m",
  lg: "w-14 h-14 text-title-l",
};

const VARIANT: Record<AvatarVariant, string> = {
  default: "bg-gray-200 text-gray-700",
  primary: "bg-primary-100 text-primary-500",
};

export default function Avatar({ initials, variant = "default", size = "md" }: AvatarProps) {
  return (
    <div className={`flex items-center justify-center rounded-full font-semibold ${SIZE[size]} ${VARIANT[variant]}`}>
      {initials.slice(0, 2)}
    </div>
  );
}
