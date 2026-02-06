interface DotProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
}

const SIZE: Record<string, string> = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2.5 h-2.5",
};

const COLOR: Record<string, string> = {
  primary: "bg-primary-500",
  white: "bg-white",
  gray: "bg-gray-300",
};

export default function Dot({ size = "md", color = "primary" }: DotProps) {
  return <div className={`rounded-full ${SIZE[size]} ${COLOR[color]}`} />;
}
