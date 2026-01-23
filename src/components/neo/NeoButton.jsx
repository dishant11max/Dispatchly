import React from "react";
import { cn } from "@/lib/utils";

const NeoButton = ({
  children,
  onClick,
  variant = "primary", // primary (orange), secondary (white), dark (black)
  className,
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 font-bold border-4 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 uppercase tracking-wide text-sm";

  const variants = {
    primary:
      "bg-[#FF8C00] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black",
    secondary: "bg-white hover:bg-gray-50 text-black",
    dark: "bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(128,128,128,1)]",
    success: "bg-[#22C55E] text-white hover:bg-[#22C55E]/90",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeoButton;
