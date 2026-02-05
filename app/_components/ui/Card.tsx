type CardVariant = "default" | "primary";

interface CardProps {
  title: string;
  description: string;
  variant?: CardVariant;
}

const VARIANT: Record<CardVariant, { bg: string; title: string; desc: string }> = {
  default: { bg: "bg-gray-50", title: "text-gray-900", desc: "text-gray-700" },
  primary: { bg: "bg-primary-50", title: "text-primary-700", desc: "text-gray-700" },
};

export default function Card({ title, description, variant = "default" }: CardProps) {
  const { bg, title: titleColor, desc } = VARIANT[variant];

  return (
    <div className={`rounded-xl p-4 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)] ${bg}`}>
      <p className={`mb-1 text-title-l ${titleColor}`}>{title}</p>
      <p className={`text-body-m ${desc}`}>{description}</p>
    </div>
  );
}
