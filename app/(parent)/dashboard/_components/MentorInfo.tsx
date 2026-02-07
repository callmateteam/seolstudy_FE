import Chip from "@/components/ui/Chip";

interface MentorInfoProps {
  name: string;
  education: string;
}

export default function MentorInfo({ name, education }: MentorInfoProps) {
  return (
    <section className="border-t border-gray-200 pt-5">
      <div className="flex items-center gap-3">
        <Chip>멘토</Chip>
        <p className="text-title-m text-gray-900">{name}</p>
      </div>
      <p className="text-label-m mt-2 text-gray-500">학력: {education}</p>
    </section>
  );
}
