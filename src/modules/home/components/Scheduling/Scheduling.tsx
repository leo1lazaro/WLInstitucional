import React from "react";
import { MessageSquare, Calendar, ShieldCheck, HeartHandshake } from "lucide-react";
import { Button } from "../../../../shared/components/Button/Button";
import "./Scheduling.css";

interface SchedulingProps {
  whatsappUrl: string;
}

export function Scheduling({ whatsappUrl }: SchedulingProps) {
  return (
    <section id="scheduling" className="Scheduling-container">
      <div className="Scheduling-wrapper">
        <div className="Scheduling-card">
          <span className="Scheduling-tag">Agendamento Simples</span>
          <h2 className="Scheduling-title">Como agendar sua consulta?</h2>
          <p className="Scheduling-description">
            O agendamento de consultas é feito de forma direta e sem burocracias pelo WhatsApp. 
            Clique no botão abaixo para abrir a conversa, envie a mensagem padrão e conversaremos para encontrar o melhor dia e horário para o seu atendimento.
          </p>

          <div className="Scheduling-features">
            <div className="Scheduling-featureItem">
              <ShieldCheck className="Scheduling-featureIcon" size={20} />
              <div>
                <h4 className="Scheduling-featureTitle">Sigilo Profissional</h4>
                <p className="Scheduling-featureDesc">Atendimento totalmente pautado no código de ética do psicólogo, garantindo sigilo absoluto.</p>
              </div>
            </div>

            <div className="Scheduling-featureItem">
              <Calendar className="Scheduling-featureIcon" size={20} />
              <div>
                <h4 className="Scheduling-featureTitle">Formatos de Atendimento</h4>
                <p className="Scheduling-featureDesc">Consultas individuais online para todo o Brasil e presencial de forma humanizada.</p>
              </div>
            </div>

            <div className="Scheduling-featureItem">
              <HeartHandshake className="Scheduling-featureIcon" size={20} />
              <div>
                <h4 className="Scheduling-featureTitle">Acolhimento imediato</h4>
                <p className="Scheduling-featureDesc">Sem intermediários ou secretárias. O contato inicial é feito diretamente comigo.</p>
              </div>
            </div>
          </div>

          <div className="Scheduling-action">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="Scheduling-link">
              <Button variant="primary" size="large">
                <MessageSquare size={18} />
                Iniciar Agendamento no WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Scheduling;
