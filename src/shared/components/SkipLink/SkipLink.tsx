import React from "react";
import "./SkipLink.css";

interface SkipLinkProps {
  targetId: string;
}

export function SkipLink({ targetId }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className="SkipLink-container">
      Pular para o conteúdo principal
    </a>
  );
}
