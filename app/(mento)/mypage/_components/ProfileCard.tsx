import Avatar from "@/components/ui/Avatar";
import { Pencil } from "lucide-react";

const SUBJECT_LABELS: Record<string, string> = {
  KOREAN: "국어",
  ENGLISH: "영어",
  MATH: "수학",
};

interface ProfileCardProps {
  data: {
    name: string;
    profileImage: string | null;
    joinedAt: string;
    university: string;
    college: string;
    department: string;
    enrollmentStatus: string;
    subjects: string[];
  };
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-body-m w-20 shrink-0 text-gray-500">{label}:</span>
      <span className="text-body-m text-gray-900">{value}</span>
    </div>
  );
}

export default function ProfileCard({ data }: ProfileCardProps) {
  const joinDate = new Date(data.joinedAt);
  const joinDateStr = `${joinDate.getFullYear()}년 ${joinDate.getMonth() + 1}월 ${joinDate.getDate()}일 시작`;
  const educationParts = [data.university, data.college, data.department].filter(Boolean).join(" ");
  const educationStr = data.enrollmentStatus
    ? educationParts ? `${educationParts} (${data.enrollmentStatus})` : data.enrollmentStatus
    : educationParts;
  const subjectsStr = data.subjects.map((s) => SUBJECT_LABELS[s] ?? s).join(" · ");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            initials={data.name.charAt(0)}
            size="lg"
            variant="primary"
            src={data.profileImage ?? undefined}
          />
          <h2 className="text-heading-l text-gray-900">{data.name}</h2>
        </div>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 text-label-m text-gray-500"
        >
          <Pencil size={14} />
          수정
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <InfoRow label="가입일" value={joinDateStr} />
        <InfoRow label="학력" value={educationStr} />
        <InfoRow label="담당 과목" value={subjectsStr} />
      </div>
    </div>
  );
}
