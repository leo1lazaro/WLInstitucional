import React from "react";
import { useHomePage } from "./hooks/useHomePage";
import { Presentation } from "./components/Presentation/Presentation";
import { Scheduling } from "./components/Scheduling/Scheduling";
import { Testimonials } from "./components/Testimonials/Testimonials";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary/ErrorBoundary";
import "./HomePage.css";

export function HomePage() {
  const { siteConfig, testimonials, whatsappUrl, isLoading, error } = useHomePage();

  return (
    <div className="HomePage-container">
      {isLoading && (
        <div className="HomePage-loader" role="status">
          <div className="HomePage-spinner"></div>
          <p className="HomePage-loaderText">Carregando informações acolhedoras...</p>
        </div>
      )}

      {error && (
        <div className="HomePage-errorAlert" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Presentation Section */}
      <ErrorBoundary>
        <Presentation siteConfig={siteConfig} whatsappUrl={whatsappUrl} />
      </ErrorBoundary>

      {/* Scheduling Section */}
      <ErrorBoundary>
        <Scheduling whatsappUrl={whatsappUrl} />
      </ErrorBoundary>

      {/* Testimonials Section */}
      <ErrorBoundary>
        <Testimonials testimonials={testimonials} />
      </ErrorBoundary>
    </div>
  );
}
export default HomePage;
