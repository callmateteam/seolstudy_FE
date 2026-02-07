import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Pencil } from "lucide-react";

interface MenteeProfileCardProps {
  name: string;
  profileImage: string | null;
  school: string;
  grade: string;
}

export default function MenteeProfileCard({
  name,
  profileImage,
  school,
  grade,
}: MenteeProfileCardProps) {
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
          <div>
            <h2 className="text-heading-l text-gray-900">{name}</h2>
            <p className="text-body-m text-gray-500">
              {school} · {grade}
            </p>
          </div>
        </div>
        <Link href="/me/edit">
          <Button variant="ghost" size="sm" icon={<Pencil size={14} />}>
            수정
          </Button>
        </Link>
      </div>
    </div>
  );
}
