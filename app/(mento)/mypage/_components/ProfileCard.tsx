import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
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
  const educationStr = `${data.university} ${data.college} ${data.department} (${data.enrollmentStatus})`;
  const subjectsStr = data.subjects.map((s) => SUBJECT_LABELS[s] ?? s).join(" · ");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
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
        <Button variant="ghost" size="sm" icon={<Pencil size={14} />}>
          수정
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <InfoRow label="가입일" value={joinDateStr} />
        <InfoRow label="학력" value={educationStr} />
        <InfoRow label="담당 과목" value={subjectsStr} />
      </div>
    </div>
  );
}
