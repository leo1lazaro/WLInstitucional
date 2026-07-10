import React, { useEffect } from "react";
import { Header } from "../shared/components/Header/Header";
import { Footer } from "../shared/components/Footer/Footer";
import { SkipLink } from "../shared/components/SkipLink/SkipLink";
import { useSiteStore } from "../shared/states/useSiteStore";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { siteConfig } = useSiteStore();

  // Dynamically inject the primary color into document root style
  useEffect(() => {
    if (siteConfig.primaryColor) {
      document.documentElement.style.setProperty("--color-primary", siteConfig.primaryColor);
      
      // Calculate a slightly darker tone for hover states automatically
      // We can do this by converting hex to RGB and scaling, or just use a simple CSS filter / fallback
      // To be safe, we'll set --color-primary-dark to the user-set primaryColor or generate a CSS filter
      // Alternatively, we can let --color-primary-dark be calculated, but setting it directly from siteConfig is super neat.
      // Let's set --color-primary-dark as a slightly adjusted hex, or if it is the default, keep default.
      if (siteConfig.primaryColor === "#7d9276") {
        document.documentElement.style.setProperty("--color-primary-dark", "#61735a");
      } else {
        // Simple fallback: set dark to the same or let hover use opacity/brightness filters in CSS
        document.documentElement.style.setProperty("--color-primary-dark", siteConfig.primaryColor);
      }
    }
  }, [siteConfig.primaryColor]);

  return (
    <div className="App-rootLayout">
      <SkipLink targetId="main-content" />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
