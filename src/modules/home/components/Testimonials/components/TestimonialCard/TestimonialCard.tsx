import React from "react";
import { Quote } from "lucide-react";
import type { Testimonial } from "../../../../../../shared/types/Testimonial";
import "./TestimonialCard.css";

interface TestimonialCardProps {
  testimonial: Testimonial;
  key?: React.Key;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="TestimonialCard-container">
      <div className="TestimonialCard-header">
        <Quote className="TestimonialCard-quoteIcon" size={24} />
        <span className="TestimonialCard-authorInitials">
          {testimonial.author.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <p className="TestimonialCard-description">"{testimonial.description}"</p>
      <div className="TestimonialCard-footer">
        <span className="TestimonialCard-authorName">{testimonial.author}</span>
        <span className="TestimonialCard-verified">Paciente atendido</span>
      </div>
    </div>
  );
}
export default TestimonialCard;
