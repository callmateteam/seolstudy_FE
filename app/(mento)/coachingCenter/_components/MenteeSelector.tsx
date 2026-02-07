"use client";

import Select from "@/components/ui/Select";

interface MenteeSelectorProps {
  mentees: { value: string; label: string }[];
  dates: { value: string; label: string }[];
  selectedMentee: string | null;
  selectedDate: string | null;
  onMenteeChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function MenteeSelector({
  mentees,
  dates,
  selectedMentee,
  selectedDate,
  onMenteeChange,
  onDateChange,
}: MenteeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <span className="text-label-m text-gray-700">멘티</span>
        <Select
          options={mentees}
          value={selectedMentee}
          placeholder="멘티 선택"
          onChange={onMenteeChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-label-m text-gray-700">날짜</span>
        <Select
          options={dates}
          value={selectedDate}
          placeholder="날짜 선택"
          onChange={onDateChange}
        />
      </div>
    </div>
  );
}
