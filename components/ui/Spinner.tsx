type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
}

const SIZE: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export default function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <svg viewBox="0 0 24 24" className={`animate-spin text-primary-500 ${SIZE[size]}`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x="11"
          y="2"
          width="2"
          height="5"
          rx="1"
          fill="currentColor"
          opacity={1 - (i * 0.85) / 11}
          transform={`rotate(${30 * i} 12 12)`}
        />
      ))}
    </svg>
  );
}
