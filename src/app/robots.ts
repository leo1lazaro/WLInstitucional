// Robots nativo do Next.js (colocado aqui para estrutura e exportação perfeita)
export default function robots() {
  const baseUrl = "https://psicologa-exemplo.com.br";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
export type Robots = ReturnType<typeof robots>;
