import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, rows = 4, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <p className="text-title-m text-gray-900">{label}</p>}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full resize-none rounded-xl bg-gray-50 p-3 text-body-m text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50",
            error && "ring-1 ring-error-500",
            className,
          )}
          {...props}
        />
        {error && <p className="text-label-s text-error-500">{error}</p>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
export default TextArea;
