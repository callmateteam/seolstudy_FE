"use client";

import Select from "@/components/ui/Select";

interface MenteeSelectorProps {
  mentees: { value: string; label: string }[];
  selectedMentee: string | null;
  selectedDate: string;
  onMenteeChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function MenteeSelector({
  mentees,
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
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-body-m text-gray-700"
        />
      </div>
    </div>
  );
}
