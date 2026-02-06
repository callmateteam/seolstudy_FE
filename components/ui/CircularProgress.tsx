const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_RATIO = 0.75;

interface CircularProgressProps {
  value: number;
  label: string;
}

function getStrokeColor(value: number): string {
  if (value >= 70) return "var(--color-success-500)";
  if (value >= 40) return "var(--color-warning-500)";
  return "var(--color-error-500)";
}

export default function CircularProgress({ value, label }: CircularProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const bgArc = ARC_RATIO * CIRCUMFERENCE;
  const bgGap = CIRCUMFERENCE - bgArc;
  const progressArc = (clamped / 100) * bgArc;
  const progressGap = CIRCUMFERENCE - progressArc;

  return (
    <div className="flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="var(--color-gray-200)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${bgArc} ${bgGap}`}
          transform="rotate(135 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke={getStrokeColor(clamped)}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${progressArc} ${progressGap}`}
          transform="rotate(135 60 60)"
        />
        <text x="60" y="52" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: "22px", fontWeight: 700 }} fill="var(--color-gray-900)">
          {clamped}
        </text>
        <text x="60" y="72" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: "11px", fontWeight: 400 }} fill="var(--color-gray-500)">
          {label}
        </text>
      </svg>
    </div>
  );
}
