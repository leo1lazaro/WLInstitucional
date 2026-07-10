# AGENTS.md — Site Institucional Psicologia Clínica

Este arquivo é a fonte de verdade para qualquer agente de IA (Claude Code, Cursor, Copilot, Codex, etc.) que for criar, alterar ou revisar código neste repositório. Antes de gerar qualquer arquivo, o agente **deve ler este documento por completo** e seguir os padrões descritos aqui. Se uma instrução do usuário conflitar com este documento, o agente deve seguir o documento e sinalizar o conflito, a menos que o usuário peça explicitamente para alterar o padrão.

Este documento vale para o repositório inteiro. Não há AGENTS.md aninhados em subpastas — todas as regras abaixo se aplicam a `app/`, `modules/` e `shared/` igualmente.

---

## 1. Visão geral do projeto

Site institucional **one page** para uma psicóloga, com uma página administrativa simples (`/admin`), sem login, sem cadastro de pacientes e sem coleta de dados do usuário neste momento.

Objetivo do produto: transmitir confiança, acolhimento e profissionalismo através de um design minimalista e leve.

Objetivo de engenharia: código limpo, componentizado, tipado e fácil de evoluir por qualquer desenvolvedor ou agente que nunca tenha visto o projeto antes.

---

## 2. Stack e princípios técnicos

* **Next.js** (App Router) + **TypeScript** + **React**;
* **CSS puro** — sem Tailwind, sem styled-components, sem CSS-in-JS;
* **Axios** centralizado para chamadas de API;
* `next/image` e `next/font` para performance;
* Server Components por padrão; `"use client"` **apenas** quando o componente usa estado, efeito (`useEffect`), evento de clique/input, ou hooks de navegação (`usePathname`, `useRouter`).

### Princípios inegociáveis

1. Sem lógica de negócio duplicada (scroll, montagem de link do WhatsApp, chamadas de API);
2. Sem dado textual, telefone ou URL hardcoded dentro de JSX;
3. Sem componente gigante — se um componente passar de ~150 linhas de JSX, quebrar em subcomponentes;
4. Toda chamada de API passa por `shared/services/endpoints.ts`. Nunca `api.get`/`api.post` direto num componente ou hook;
5. Toda página nova reaproveita Header/Footer globais definidos em `app/layout.tsx` — nunca recriar;
6. TypeScript estrito: nunca usar `any`; preferir `unknown` + narrowing quando o tipo não for conhecido de antemão.

---

## 3. Comandos de setup e desenvolvimento

O agente deve assumir os comandos abaixo como padrão, a menos que o `package.json` do repositório indique scripts diferentes (sempre conferir o `package.json` antes de rodar um comando).

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build

# rodar build de produção localmente
npm run start

# lint
npm run lint
```

Antes de finalizar qualquer alteração de código, o agente deve rodar `npm run lint` (e `npm run build`, quando a mudança for estrutural — ex: nova rota, novo layout) e corrigir os erros encontrados antes de considerar a tarefa concluída.

Variáveis de ambiente ficam documentadas em `.env.example` na raiz do projeto. Toda nova variável de ambiente adicionada ao código **precisa** ser refletida nesse arquivo, com um valor de exemplo (nunca um valor real/sensível).

```txt
# .env.example
NEXT_PUBLIC_API_BASE_URL=https://api.exemplo.com.br
```

---

## 4. Estrutura de pastas (referência)

```txt
src/
├── app/
│   ├── admin/
│   │   └── page.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── sitemap.ts
│   └── robots.ts
│
├── modules/
│   ├── home/
│   │   ├── HomePage.tsx
│   │   ├── HomePage.css
│   │   ├── hooks/
│   │   │   └── useHomePage.ts
│   │   └── components/
│   │       ├── Presentation/
│   │       │   ├── Presentation.tsx
│   │       │   └── Presentation.css
│   │       ├── Scheduling/
│   │       │   ├── Scheduling.tsx
│   │       │   └── Scheduling.css
│   │       └── Testimonials/
│   │           ├── Testimonials.tsx
│   │           ├── Testimonials.css
│   │           └── components/
│   │               └── TestimonialCard/
│   │                   ├── TestimonialCard.tsx
│   │                   └── TestimonialCard.css
│   │
│   └── admin/
│       ├── AdminPage.tsx
│       ├── AdminPage.css
│       ├── hooks/
│       │   └── useAdminPage.ts
│       └── components/
│           └── AdminConfigCard/
│               ├── AdminConfigCard.tsx
│               └── AdminConfigCard.css
│
└── shared/
    ├── components/
    │   ├── Header/
    │   │   ├── Header.tsx
    │   │   └── Header.css
    │   ├── Footer/
    │   │   ├── Footer.tsx
    │   │   └── Footer.css
    │   ├── Button/
    │   │   ├── Button.tsx
    │   │   └── Button.css
    │   ├── Section/
    │   │   ├── Section.tsx
    │   │   └── Section.css
    │   ├── SkipLink/
    │   │   ├── SkipLink.tsx
    │   │   └── SkipLink.css
    │   └── ErrorBoundary/
    │       ├── ErrorBoundary.tsx
    │       └── ErrorBoundary.css
    ├── constants/
    │   ├── siteConfig.ts
    │   ├── testimonials.ts
    │   └── navigation.ts
    ├── helpers/
    │   └── whatsapp.ts
    ├── hooks/
    │   └── useScrollToSection.ts
    ├── services/
    │   ├── api.ts
    │   └── endpoints.ts
    ├── states/
    │   └── (contextos/stores globais, criados sob demanda — ver seção 13)
    └── types/
        ├── ApiResponse.ts
        ├── SiteConfig.ts
        └── Testimonial.ts
```

> **Housekeeping**: se o repositório ainda contiver `App.tsx`, `main.tsx`, `index.html` ou `index.css` na raiz (resquício de scaffold Vite/CRA), esses arquivos não fazem parte do padrão Next.js App Router deste projeto. O agente deve sinalizar isso ao usuário e sugerir a remoção, mas **não deve apagar sem confirmação** caso não tenha certeza se ainda estão em uso.

**Regra de ouro:** `app/` só tem rotas finas (chamam o módulo); `modules/` tem páginas e o que é específico delas; `shared/` tem tudo que é reaproveitável por mais de um módulo.

---

## 5. Convenção de nomes

| Tipo | Convenção | Exemplo |
|---|---|---|
| Componente | `PascalCase`, pasta com o mesmo nome | `Button/Button.tsx` |
| Arquivo CSS do componente | mesmo nome do componente | `Button/Button.css` |
| Hook | `useAlgumaCoisa.ts` | `useScrollToSection.ts` |
| Helper | função pura em `camelCase` | `createWhatsappUrl` em `whatsapp.ts` |
| Type | `PascalCase`, um arquivo por entidade | `Testimonial.ts` exporta `Testimonial` |
| Constante | export em `camelCase`, arquivo no plural quando fizer sentido | `testimonials.ts`, `navigation.ts` |
| Rota (pasta em `app/`) | `kebab-case` | `app/sobre-mim/page.tsx` |
| ID de seção (scroll) | `camelCase` curto | `presentation`, `scheduling` |

---

## 6. Convenção de CSS

Todo componente tem seu próprio arquivo `.css`. Classes seguem **obrigatoriamente** o padrão:

```txt
NomeComponente-contextoDaClasse
```

Exemplos válidos: `Header-container`, `TestimonialCard-author`, `Button-primary`, `Scheduling-description`.

Nunca usar classes genéricas como `.container`, `.title`, `.card`, `.text` — elas colidem entre componentes diferentes e quebram o isolamento visual.

Cores, tipografia e espaçamento vêm sempre de variáveis definidas em `app/globals.css`:

```css
:root {
  --color-primary: #a8b8a0;
  --color-primary-dark: #7d9276;
  --color-background: #f8f5f0;
  --color-surface: #ffffff;
  --color-text: #2f2f2f;
  --color-muted: #6f6f6f;
  --color-border: #e7e0d8;

  --font-size-base: 16px;
  --radius-base: 8px;
  --spacing-unit: 8px;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-primary-dark);
  outline-offset: 2px;
}
```

Nenhum componente deve definir cor "solta" (hex direto no CSS do componente) fora dessas variáveis. Se uma cor nova for necessária, ela entra em `globals.css` como uma nova variável, nunca hardcoded no arquivo do componente.

---

## 7. Contrato de resposta da API

Toda resposta da API segue o mesmo formato, tipado em `shared/types/ApiResponse.ts`:

```ts
// shared/types/ApiResponse.ts
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[] | null;
};
```

### Regras de uso

* `message` sempre vem preenchida pela API (mensagem amigável, ex.: `"Depoimento criado com sucesso"` ou `"Não foi possível concluir a operação"`) e pode ser exibida diretamente em toasts/feedbacks de UI;
* `success: true` → `data` preenchido e `errors: null`;
* `success: false` → `data: null` e `errors` com pelo menos uma mensagem;
* Todo método em `endpoints.ts` deve retornar uma Promise tipada com `ApiResponse<T>`, nunca o tipo "cru" da entidade;
* Componentes e hooks nunca leem `response.data.data` diretamente sem checar `success` antes — sempre tratar o caso `success: false` (mostrar erro, estado vazio, toast com `message`, etc.).

### Exemplo completo — endpoint

```ts
// shared/services/endpoints.ts
import { api } from "./api";
import type { ApiResponse } from "../types/ApiResponse";
import type { Testimonial } from "../types/Testimonial";
import type { SiteConfig } from "../types/SiteConfig";

export const endpoints = {
  siteConfig: {
    get: () => api.get<ApiResponse<SiteConfig>>("/site-config"),
    update: (data: SiteConfig) =>
      api.post<ApiResponse<SiteConfig>>("/site-config", data),
  },

  testimonials: {
    list: () => api.get<ApiResponse<Testimonial[]>>("/testimonials"),
    create: (data: Testimonial) =>
      api.post<ApiResponse<Testimonial>>("/testimonials", data),
  },
};
```

### Exemplo completo — hook consumindo o endpoint

```ts
// modules/home/hooks/useHomePage.ts
"use client";

import { useEffect, useState } from "react";
import { endpoints } from "@/shared/services/endpoints";
import type { Testimonial } from "@/shared/types/Testimonial";

type UseHomePageReturn = {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
};

export function useHomePage(): UseHomePageReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTestimonials() {
      setIsLoading(true);
      setError(null);

      const response = await endpoints.testimonials.list();

      if (!response.data.success) {
        setError(response.data.message);
        setIsLoading(false);
        return;
      }

      setTestimonials(response.data.data ?? []);
      setIsLoading(false);
    }

    loadTestimonials();
  }, []);

  return { testimonials, isLoading, error };
}
```

Se, no futuro, o backend real usar um campo adicional (ex.: `statusCode`, `timestamp`), o agente deve **estender** esse type em `ApiResponse.ts` em vez de criar um segundo type de resposta concorrente.

---

## 8. Header, Footer e navegação global

Header e Footer vivem exclusivamente em `shared/components` e são montados **uma única vez** em `app/layout.tsx`. Nenhum módulo deve importar ou recriar Header/Footer.

```tsx
// app/layout.tsx
import { Header } from "@/shared/components/Header/Header";
import { Footer } from "@/shared/components/Footer/Footer";
import "./globals.css";

export const metadata = {
  title: "Nome da Psicóloga | Psicologia Clínica",
  description: "Atendimento psicológico acolhedor e profissional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="SkipLink-container" href="#main-content">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

O Header precisa se comportar de forma diferente fora da home, porque os links de menu fazem scroll até seções que só existem em `/`:

```tsx
// shared/components/Header/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollToSection } from "@/shared/hooks/useScrollToSection";
import { navigationItems } from "@/shared/constants/navigation";

export function Header() {
  const pathname = usePathname();
  const { scrollToSection } = useScrollToSection();
  const isHome = pathname === "/";

  return (
    <header className="Header-container">
      <nav className="Header-menu">
        {navigationItems.map((item) =>
          isHome ? (
            <button
              key={item.sectionId}
              className="Header-menuItem"
              onClick={() => scrollToSection(item.sectionId)}
            >
              {item.label}
            </button>
          ) : (
            <Link
              key={item.sectionId}
              className="Header-menuItem"
              href={`/#${item.sectionId}`}
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
```

Essa lógica de "estou na home ou não" nunca deve ser duplicada em outro componente — se outro componente precisar do mesmo comportamento, ele reaproveita `usePathname` + a mesma checagem, ou o agente extrai um hook compartilhado (`useIsHomeRoute`, por exemplo) se o padrão se repetir em 2+ lugares.

---

## 9. Como criar um novo módulo (página)

Passo a passo que o agente **deve seguir sempre** que o usuário pedir uma nova página (ex.: "Blog", "Contato", "Sobre"):

1. Criar a rota em `app/nome-da-rota/page.tsx`, só chamando o componente do módulo;
2. Criar `modules/nome-do-modulo/NomeDoModulo.tsx` + `.css`;
3. Criar `modules/nome-do-modulo/hooks/useNomeDoModulo.ts` (mesmo que a lógica inicial seja simples, já prever `isLoading` e `error` se a página consumir API — ver exemplo da seção 7);
4. Criar `modules/nome-do-modulo/components/` apenas para os componentes específicos dessa página;
5. Adicionar `export const metadata` na `page.tsx` com `title`/`description` próprios (e `robots: { index: false, follow: false }` se a página não deve ser indexada, como o admin);
6. **Não** recriar Header/Footer — eles já vêm do `layout.tsx`;
7. Se a página tiver itens de menu próprios, atualizar `shared/constants/navigation.ts` em vez de hardcodar no Header;
8. Se a página for pública, adicioná-la em `app/sitemap.ts`.

Exemplo de rota mínima:

```tsx
// app/contato/page.tsx
import { ContactPage } from "@/modules/contact/ContactPage";

export const metadata = {
  title: "Contato",
  description: "Fale com a psicóloga e agende sua consulta.",
};

export default function Contact() {
  return <ContactPage />;
}
```

---

## 10. Como criar um novo componente

Antes de criar, o agente deve responder: **esse componente será usado em mais de um módulo, ou é global (como Header/Footer)?**

* **Sim** → criar em `shared/components/NomeDoComponente/`;
* **Não** → criar em `modules/<modulo>/components/NomeDoComponente/`;
* Se for uma variação visual pequena de um componente que já existe (ex.: outro tipo de card), **preferir estender o componente existente via props** a duplicar o arquivo.

Todo componente novo vem com:

* `NomeDoComponente.tsx`;
* `NomeDoComponente.css` (classes no padrão `NomeDoComponente-algo`);
* Tipagem de props explícita, nunca `any`.

Exemplo de componente compartilhado completo:

```tsx
// shared/components/Button/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  const variantClass =
    variant === "primary" ? "Button-primary" : "Button-secondary";

  return (
    <button className={`Button-container ${variantClass}`} {...rest}>
      {children}
    </button>
  );
}
```

```css
/* shared/components/Button/Button.css */
.Button-container {
  border: none;
  border-radius: var(--radius-base);
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  font-size: var(--font-size-base);
  cursor: pointer;
}

.Button-primary {
  background-color: var(--color-primary);
  color: var(--color-surface);
}

.Button-secondary {
  background-color: transparent;
  color: var(--color-primary-dark);
  border: 1px solid var(--color-border);
}
```

---

## 11. Como criar um novo hook

* Lógica usada por mais de um módulo → `shared/hooks/useAlgumaCoisa.ts`;
* Lógica específica de uma página → `modules/<modulo>/hooks/useAlgumaCoisa.ts`;
* Hooks que chamam API devem retornar um shape consistente: `{ data, isLoading, error }` (ou nomes de domínio equivalentes, ex.: `{ testimonials, isLoading, error }`), nunca expor a resposta crua do Axios para o componente;
* Hooks que envolvem `document`/`window` (como `useScrollToSection`) precisam do `"use client"` no topo do arquivo que os consome.

---

## 12. Como criar um novo endpoint

1. Adicionar o método dentro do objeto correspondente em `shared/services/endpoints.ts` (ou criar uma nova chave se for uma entidade nova, ex.: `contact: { send: ... }`);
2. Tipar sempre com `ApiResponse<T>`;
3. Se a entidade for nova, criar o type dela em `shared/types/NomeDaEntidade.ts` **antes** de usar em `endpoints.ts`;
4. Nunca chamar `api.get`/`api.post` fora de `endpoints.ts`;
5. Se o endpoint precisar de query params, tipar o parâmetro da função explicitamente — nunca receber `any` ou objeto solto sem type.

---

## 13. Estado global (`shared/states`)

Essa pasta só deve ganhar arquivos quando houver necessidade real de estado compartilhado entre módulos distintos (ex.: configurações vindas do admin usadas na home). Prefira sempre resolver com estado local do componente ou do hook do módulo primeiro.

Quando for realmente necessário:

* Um arquivo por domínio de estado (ex.: `siteConfigState.ts`);
* Preferir **React Context + hook próprio** (`useSiteConfigState`) a bibliotecas externas, a menos que o usuário peça explicitamente uma lib (Zustand, Redux, etc.);
* Nunca guardar estado de UI puramente local (ex.: menu mobile aberto/fechado) em estado global — isso fica dentro do próprio componente (ex.: Header).

---

## 14. SEO — checklist para toda página nova

- [ ] `export const metadata` com `title` e `description` próprios;
- [ ] Um único `h1` na página;
- [ ] Estrutura semântica (`section`, headings em ordem, sem pular de `h1` pra `h3`);
- [ ] Imagens com `alt` descritivo, usando `next/image`;
- [ ] Se a página não deve ser indexada (ex.: admin), `robots: { index: false, follow: false }`;
- [ ] Se a página nova entra na navegação principal, adicionar em `app/sitemap.ts` (quando pública) e em `navigation.ts` (quando fizer sentido no menu);
- [ ] URLs em `kebab-case`, curtas e descritivas.

---

## 15. Acessibilidade — checklist

- [ ] Todo botão/link tem texto ou `aria-label` claro (nunca só um ícone sem label);
- [ ] Contraste de texto respeita as variáveis de cor definidas (não usar `--color-muted` para texto essencial em fundo claro);
- [ ] Elementos interativos usam `:focus-visible` (já global em `globals.css` — não sobrescrever removendo o outline);
- [ ] Área de toque de botões com no mínimo 44x44px em mobile;
- [ ] Novo componente de navegação/menu é operável por teclado (Tab/Enter), não só por clique de mouse;
- [ ] Formulários (se existirem no futuro) têm `label` associado a cada input.

---

## 16. Regras invioláveis (o agente nunca deve fazer)

1. Duplicar Header/Footer dentro de um módulo;
2. Usar Tailwind, styled-components ou CSS inline fora de casos pontuais e justificados;
3. Criar chamada de API direta dentro de um componente ou fora de `endpoints.ts`;
4. Criar classes CSS genéricas (`.container`, `.title`, `.card`);
5. Hardcodar telefone, mensagem de WhatsApp ou textos institucionais direto no JSX — sempre via `shared/constants` ou `shared/helpers`;
6. Introduzir autenticação, banco de dados ou coleta de dados de usuário sem pedido explícito do usuário (fora do escopo atual do projeto);
7. Usar `any` em TypeScript;
8. Criar um segundo padrão de resposta de API diferente de `ApiResponse<T>`;
9. Marcar um componente como `"use client"` sem necessidade real (estado, efeito, evento ou hook de navegação).

---

## 17. Convenção de commits e PRs

Para manter o histórico legível para humanos e para outros agentes que revisitarem o código:

* Commits em português, no imperativo, curtos: `adiciona seção de contato`, `corrige link do whatsapp no footer`;
* Um commit por unidade lógica de mudança (não misturar "novo componente" com "refatoração de CSS não relacionada" no mesmo commit);
* Ao abrir um PR (ou resumir uma tarefa concluída), descrever: o que mudou, por que, e quais itens do checklist da seção 18 foram verificados.

---

## 18. Checklist final antes de considerar uma tarefa concluída

- [ ] Segue a árvore de pastas da seção 4 (nada solto fora do padrão `app/modules/shared`);
- [ ] CSS no padrão `NomeComponente-contexto`;
- [ ] Sem texto, telefone ou URL hardcoded fora de `constants`/`helpers`;
- [ ] Sem chamada de Axios fora de `endpoints.ts`;
- [ ] Tipagem completa (props, retorno de hook, retorno de endpoint), sem `any`;
- [ ] Header/Footer não duplicados;
- [ ] Metadata e SEO básico preenchidos, se for página nova (seção 14);
- [ ] Checklist de acessibilidade revisado (seção 15);
- [ ] `npm run lint` rodado sem erros;
- [ ] Novo arquivo `.env` (se houver) refletido em `.env.example`.

---

## 19. Glossário rápido

| Termo | Significado neste projeto |
|---|---|
| Módulo | Pasta em `modules/` que representa uma página completa (Home, Admin, etc.) |
| Componente compartilhado | Vive em `shared/components`, usado por 2+ módulos ou global (Header/Footer) |
| Componente local | Vive dentro de `modules/<modulo>/components`, específico daquela página |
| Helper | Função pura sem estado, em `shared/helpers`, reaproveitável em qualquer lugar |
| Endpoint | Método tipado em `shared/services/endpoints.ts` que encapsula uma chamada Axios |
