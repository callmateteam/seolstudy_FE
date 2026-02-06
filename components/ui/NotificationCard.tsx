import type { ReactNode } from "react";

interface NotificationCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  action: { label: string; onClick: () => void };
}

export default function NotificationCard({ icon, title, subtitle, action }: NotificationCardProps) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-[20px] bg-gray-50 p-2 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
      {icon}
      <div>
        <p className="text-label-s text-gray-500">{subtitle}</p>
        <p className="text-body-m text-gray-700">{title}</p>
      </div>
      <button type="button" onClick={action.onClick} className="rounded-lg bg-primary-500 p-2 text-label-m text-white cursor-pointer">
        {action.label}
      </button>
    </div>
  );
}
