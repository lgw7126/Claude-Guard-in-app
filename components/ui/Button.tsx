import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", fullWidth = false, className = "", children, ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121212] disabled:opacity-40 disabled:pointer-events-none select-none";

    const variants = {
      primary: "bg-[#7AA884] text-[#121212] focus:ring-[#7AA884]",
      secondary:
        "bg-[#252525] text-white border border-[#333333] focus:ring-[#7AA884]",
      ghost: "text-[#7AA884] hover:bg-[#7AA884]/10 focus:ring-[#7AA884]",
      danger:
        "bg-red-900/50 text-red-300 border border-red-800 focus:ring-red-500",
    };

    const sizes = {
      sm: "px-4 py-2.5 text-sm min-h-[40px]",
      md: "px-5 py-3.5 text-base min-h-[48px]",
      lg: "px-6 py-4 text-lg min-h-[56px]",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${
          fullWidth ? "w-full" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
