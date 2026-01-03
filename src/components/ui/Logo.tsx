import React from "react";
import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light"; // dark = for light backgrounds (navbar), light = for dark backgrounds (footer)
}

export const Logo: React.FC<LogoProps> = ({ className, variant = "dark" }) => {
  // Footer Variant - Full Logo
  if (variant === "light") {
    return (
      <div className={cn("inline-block", className)}>
        <img
          src="/logo-footer.png"
          alt="InvitingYou"
          className="h-24 w-auto rounded-sm"
        />
      </div>
    );
  }

  // Navbar Variant - Text Logo Image
  return (
    <div className={cn("flex items-center select-none", className)}>
      <img
        src="/logo-text.png"
        alt="InvitingYou"
        className="h-8 w-auto object-contain"
      />
    </div>
  );
};
