type ProgressVariant = "rounded" | "square";

interface ProgressBarProps {
  value: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
  labelPosition?: "left" | "right";
}

export default function ProgressBar({ value, variant = "rounded", showLabel = false, labelPosition = "right" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = variant === "rounded" ? "rounded-full" : "rounded-none";

  return (
    <div className="flex items-center gap-2">
      {showLabel && labelPosition === "left" && (
        <span className="w-8 text-right text-label-s text-gray-500">{clamped}%</span>
      )}
      <div className={`flex-1 h-2.5 bg-gray-200 ${radius}`}>
        <div className={`h-full bg-primary-500 transition-all ${radius}`} style={{ width: `${clamped}%` }} />
      </div>
      {showLabel && labelPosition === "right" && (
        <span className="w-8 text-label-s text-gray-500">{clamped}%</span>
      )}
    </div>
  );
}
