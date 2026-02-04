"use client";

import { useState } from "react";
import mentiDefault from "@/assets/profileImgs/Role=Mentee, State=Default.png";
import mentiHover from "@/assets/profileImgs/Role=Menti, State=Hovered.png";
import mentorDefault from "@/assets/profileImgs/Role=Mentor, State=Default.png";
import mentorHover from "@/assets/profileImgs/Role=Mentor, State=Hovered.png";
import parentDefault from "@/assets/profileImgs/Role=Parent, State=Default.png";
import parentHover from "@/assets/profileImgs/Role=Parent, State=Hovered.png";
import Image, { StaticImageData } from "next/image";

export type UserRole = "Mentee" | "Mentor" | "Parent";

type RoleOption = {
  role: UserRole;
  label: string;
  defaultAlt: string;
  activeAlt: string;
  defaultImage: StaticImageData;
  activeImage: StaticImageData;
};

interface RoleSelectProps {
  onNext: (role: UserRole) => void;
}

export default function RoleSelect({ onNext }: RoleSelectProps) {
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  const roleOptions: RoleOption[] = [
    {
      role: "Mentee",
      label: "멘티",
      defaultAlt: "멘티 일반",
      activeAlt: "멘티 선택",
      defaultImage: mentiDefault,
      activeImage: mentiHover,
    },
    {
      role: "Mentor",
      label: "멘토",
      defaultAlt: "멘토 일반",
      activeAlt: "멘토 선택",
      defaultImage: mentorDefault,
      activeImage: mentorHover,
    },
    {
      role: "Parent",
      label: "학부모",
      defaultAlt: "학부모 일반",
      activeAlt: "학부모 선택",
      defaultImage: parentDefault,
      activeImage: parentHover,
    },
  ];

  return (
    <article className="mt-43.5">
      <div className="text-center">
        <h1 className="font-semibold text-[40px] text-primary-500 mb-2">
          설스터디
        </h1>
        <span className="text-title-l text-gray-700">
          어떤 역할로 이용하시나요?
        </span>
      </div>
      <div className="flex items-center gap-3">
        {roleOptions.map((option) => {
          const isActive = hoveredRole === option.role;

          return (
            <button
              key={option.role}
              type="button"
              onClick={() => onNext(option.role)}
              onMouseEnter={() => setHoveredRole(option.role)}
              onMouseLeave={() => setHoveredRole(null)}
              aria-pressed={isActive}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <Image
                alt={isActive ? option.activeAlt : option.defaultAlt}
                src={isActive ? option.activeImage : option.defaultImage}
              />
              <span
                className={`text-label-l ${isActive ? "text-primary-500" : "text-gray-700"}`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
