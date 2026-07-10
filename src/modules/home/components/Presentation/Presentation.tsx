import React from "react";
import { Send } from "lucide-react";
import { Button } from "../../../../shared/components/Button/Button";
import type { SiteConfig } from "../../../../shared/types/SiteConfig";
import "./Presentation.css";

interface PresentationProps {
  siteConfig: SiteConfig;
  whatsappUrl: string;
}

export function Presentation({ siteConfig, whatsappUrl }: PresentationProps) {
  return (
    <section id="presentation" className="Presentation-container">
      <div className="Presentation-wrapper">
        <div className="Presentation-content">
          <span className="Presentation-badge">Psicoterapia Clínica</span>
          <h1 className="Presentation-title">{siteConfig.presentationTitle}</h1>
          <p className="Presentation-description">
            {siteConfig.presentationDescription}
          </p>
          <div className="Presentation-actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="Presentation-btnLink">
              <Button variant="primary" size="large">
                <Send size={18} />
                Agendar Consulta Online
              </Button>
            </a>
          </div>
        </div>
        <div className="Presentation-imageWrapper">
          <div className="Presentation-imageDecor"></div>
          <img
            src={siteConfig.presentationImageUrl}
            alt={`Foto de ${siteConfig.professionalName} - Psicóloga`}
            className="Presentation-image"
            loading="eager"
            width="600"
            height="600"
          />
        </div>
      </div>
    </section>
  );
}
export default Presentation;
