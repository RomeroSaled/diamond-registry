import { Diamond } from "lucide-react";

interface DiamondLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

export const DiamondLogo = ({ size = "md", className = "" }: DiamondLogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} text-primary diamond-glow`}>
        <Diamond className="w-full h-full fill-current" strokeWidth={1.5} />
      </div>
    </div>
  );
};
