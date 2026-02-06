import { Fragment } from "react";

interface TimeSegmentProps {
  segments: string[];
  activeIndex: number;
  onSegmentClick?: (index: number) => void;
}

export default function TimeSegment({ segments, activeIndex, onSegmentClick }: TimeSegmentProps) {
  return (
    <div className="flex items-center gap-1">
      {segments.map((segment, i) => (
        <Fragment key={i}>
          <div
            onClick={() => onSegmentClick?.(i)}
            className={`flex h-10 w-10 items-center justify-center rounded-md border text-title-m ${onSegmentClick ? "cursor-pointer" : ""} ${i === activeIndex ? "border-primary-500 bg-primary-50 text-primary-500" : "border-gray-200 bg-white text-gray-700"}`}
          >
            {segment}
          </div>
          {i < segments.length - 1 && <span className="text-title-m text-gray-400">:</span>}
        </Fragment>
      ))}
    </div>
  );
}
