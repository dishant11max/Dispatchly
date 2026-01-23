import React from "react";
import { cn } from "@/lib/utils";

const NeoCard = ({ children, className, hoverEffect = true, ...props }) => {
  return (
    <div
      className={cn(
        "border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all",
        hoverEffect &&
          "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default NeoCard;
