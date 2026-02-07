import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

interface MentorInfoProps {
  name: string;
  education: string;
}

export default function MentorInfo({ name, education }: MentorInfoProps) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-card">
      <h3 className="text-title-l text-gray-900">담당 멘토</h3>

      <div className="mt-4 flex items-center gap-4">
        <Avatar initials={name.charAt(0)} size="lg" variant="primary" />
        <div className="flex-1">
          <p className="text-title-m text-gray-900">{name}</p>
          <p className="text-label-m text-gray-500">
            학력: {education}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Button fullWidth variant="primary" outlined>
          상담 신청
        </Button>
      </div>
    </section>
  );
}
