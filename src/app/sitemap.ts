// Sitemap nativo do Next.js (colocado aqui para estrutura e exportação perfeita)
export default function sitemap() {
  const baseUrl = "https://psicologa-exemplo.com.br";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
export type Sitemap = ReturnType<typeof sitemap>;
