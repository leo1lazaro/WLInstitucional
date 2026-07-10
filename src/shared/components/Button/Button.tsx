import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  size = "medium",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `Button-container Button-${variant} Button-${size} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
