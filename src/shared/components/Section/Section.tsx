import React, { ReactNode } from "react";
import "./Section.css";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`Section-container ${className}`}>
      <div className="Section-wrapper">
        {(title || subtitle) && (
          <div className="Section-header">
            {title && <h2 className="Section-title">{title}</h2>}
            {subtitle && <p className="Section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="Section-content">{children}</div>
      </div>
    </section>
  );
}
export default Section;
