import React, { ReactNode } from "react";
import "./AdminConfigCard.css";

interface AdminConfigCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AdminConfigCard({
  title,
  description,
  children,
}: AdminConfigCardProps) {
  return (
    <div className="AdminConfigCard-container">
      <div className="AdminConfigCard-header">
        <h3 className="AdminConfigCard-title">{title}</h3>
        <p className="AdminConfigCard-description">{description}</p>
      </div>
      <div className="AdminConfigCard-content">{children}</div>
    </div>
  );
}
export default AdminConfigCard;
