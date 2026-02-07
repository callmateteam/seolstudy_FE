import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { Pencil } from "lucide-react";

interface MenteeProfileCardProps {
  name: string;
  profileImage: string | null;
  joinDate: string;
  school: string;
  grade: string;
  subjects: string[];
  mentorName: string;
}

export default function MenteeProfileCard({
  name,
  profileImage,
  joinDate,
  school,
  grade,
  subjects,
  mentorName,
}: MenteeProfileCardProps) {
  const infoRows = [
    { label: "가입일:", value: `${joinDate} 시작` },
    { label: "학교:", value: `${school} · ${grade}` },
    { label: "학습과목:", value: subjects.join(" · ") },
    { label: "담당 멘토:", value: mentorName },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            initials={name.charAt(0)}
            size="lg"
            variant="primary"
            src={profileImage ?? undefined}
          />
          <h2 className="text-heading-l text-gray-900">{name}</h2>
        </div>
        <Link href="/me/edit" className="flex items-center gap-1 text-label-m text-primary-500">
          <Pencil size={14} />
          수정
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {infoRows.map((row) => (
          <div key={row.label} className="flex items-baseline gap-3">
            <span className="w-[72px] shrink-0 text-body-m text-gray-400">{row.label}</span>
            <span className="text-body-m text-gray-700">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
