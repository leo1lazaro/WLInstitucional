import React, { useEffect } from "react";
import { AdminPage } from "../../modules/admin/AdminPage";

// Metadata representation in React standard SPA
export const metadata = {
  title: "Administração | Painel de Controle",
  robots: { index: false, follow: false },
};

export function Admin() {
  // Apply noindex tag programmatically in the SPA environment for perfect SEO compliance
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex, nofollow");

    // Restore on unmount
    return () => {
      if (metaRobots) {
        metaRobots.setAttribute("content", "index, follow");
      }
    };
  }, []);

  return <AdminPage />;
}
export default Admin;
