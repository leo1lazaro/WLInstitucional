import React from "react";
import { Info } from "lucide-react";
import { TestimonialCard } from "./components/TestimonialCard/TestimonialCard";
import type { Testimonial } from "../../../../shared/types/Testimonial";
import "./Testimonials.css";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const hasTestimonials = testimonials && testimonials.length > 0;

  return (
    <section id="testimonials" className="Testimonials-container">
      <div className="Testimonials-wrapper">
        <div className="Testimonials-header">
          <span className="Testimonials-badge">Depoimentos</span>
          <h2 className="Testimonials-title">O que dizem os pacientes</h2>
          <p className="Testimonials-subtitle">
            O acolhimento e o respeito são as bases de cada atendimento. Veja os relatos de quem já passou pelo processo terapêutico.
          </p>
        </div>

        {hasTestimonials ? (
          <div className="Testimonials-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div className="Testimonials-emptyState">
            <Info className="Testimonials-emptyIcon" size={32} />
            <h3 className="Testimonials-emptyTitle">Nenhum depoimento no momento</h3>
            <p className="Testimonials-emptyText">
              Os depoimentos de pacientes estão sendo atualizados e estarão disponíveis em breve.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
export default Testimonials;
