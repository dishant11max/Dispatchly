import React from "react";
import { cn } from "@/lib/utils";

const NeoInput = ({ label, icon: Icon, className, error, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="font-black text-sm uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        )}
        <input
          className={cn(
            "w-full bg-gray-50 border-4 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow placeholder:text-gray-400 placeholder:font-medium",
            Icon && "pl-12",
            error && "border-red-500",
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
    </div>
  );
};

const NeoSelect = ({
  label,
  icon: Icon,
  className,
  children,
  error,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="font-black text-sm uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        )}
        <select
          className={cn(
            "w-full bg-gray-50 border-4 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow appearance-none cursor-pointer",
            Icon && "pl-12",
            error && "border-red-500",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
    </div>
  );
};

const NeoTextarea = ({ label, className, error, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="font-black text-sm uppercase tracking-wide">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full bg-gray-50 border-4 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow placeholder:text-gray-400 placeholder:font-medium resize-none",
          error && "border-red-500",
          className,
        )}
        {...props}
      />
      {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
    </div>
  );
};

export { NeoInput, NeoSelect, NeoTextarea };
