import React from "react";
import { Link } from "react-router-dom";
import { HeartCrack, ArrowLeft } from "lucide-react";
import { Button } from "../shared/components/Button/Button";
import "./globals.css"; // Ensure colors apply

export function NotFound() {
  return (
    <div className="NotFound-container" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "80px 24px",
      minHeight: "60vh",
      backgroundColor: "var(--color-background)",
      fontFamily: "var(--font-sans)",
      gap: "24px"
    }}>
      <HeartCrack size={64} style={{ color: "var(--color-primary-dark)", opacity: 0.8 }} />
      <h1 style={{
        fontSize: "36px",
        fontWeight: "600",
        color: "var(--color-text)",
        letterSpacing: "-0.02em",
        margin: "0"
      }}>
        Página não encontrada
      </h1>
      <p style={{
        fontSize: "16px",
        color: "var(--color-muted)",
        maxWidth: "480px",
        lineHeight: "1.6",
        margin: "0"
      }}>
        A página que você está procurando não existe ou foi movida para outro endereço. 
        Que tal voltar para o espaço de acolhimento inicial?
      </p>
      <Link to="/" style={{ textDecoration: "none", marginTop: "12px" }}>
        <Button variant="primary" size="medium">
          <ArrowLeft size={16} />
          Voltar para a Home
        </Button>
      </Link>
    </div>
  );
}
export default NotFound;
