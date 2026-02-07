import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <p className="text-title-m text-gray-900">{label}</p>}
        <input
          ref={ref}
          className={cn(
            "h-14 w-full rounded-xl bg-gray-50 px-3 text-body-m text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50",
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

Input.displayName = "Input";
export default Input;
