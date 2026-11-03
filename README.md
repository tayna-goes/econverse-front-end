# Econverse – Vitrine de Produtos
Página inicial da Econverse: vitrine de tecnologia com carrossel de produtos, modal de detalhe, carrinho de compras e newsletter. Desenvolvida como teste front-end júnior.

## Stack e tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 18 (JSX, hooks) |
| Linguagem | TypeScript (modo `strict`) |
| Build | Vite 6 |
| Estilização | Sass (SCSS) + CSS Modules |
| Fonte | `@fontsource/poppins` (self-hosted, sem CDN) |
| Testes | Vitest + Testing Library (jsdom) |
| Linter/Format | TypeScript strict + Prettier |

Sem bibliotecas de UI externas. Sem backend — os produtos vêm de um JSON público via `fetch`.

## Pré-requisitos

- **Node.js** 18 ou superior (testado com Node 22)
- **npm** 9 ou superior

## Instalação

```bash
git clone <url-do-repositório>
cd econverse-vitrine
npm install
```

## Como rodar

```bash
npm run dev
npm run build
npm run preview
```

## Como testar
```bash
npm test

npm run test:watch
```

Os testes cobrem:
- Formatação de preço, parcelas e frete grátis (`utils/format.ts`)
- Modal de produto: conteúdo, seletor de quantidade, fechar com X / ESC / sobreposição / Comprar
- Fluxo da página: vitrine montada a partir do JSON, abertura do modal ao clicar, fallback quando a API remota falha

## Estrutura de pastas

```
econverse-vitrine/
├── public/
│   ├── favicon.png
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt
│   ├── 404.html             # Página de erro personalizada
│   └── produtos.json        # Cópia local do JSON (fallback da API)
├── src/
│   ├── assets/              # logo.png, iphone.png, hero-bg.jpg, partner-bg.jpg
│   ├── components/
│   │   ├── Header/          # Barra de benefícios, busca, ícones de ação e menu mobile
│   │   ├── Hero/            # Banner principal (Black Friday)
│   │   ├── CategoryNav/     # Navegação por categorias com ícones
│   │   ├── ProductShowcase/ # Carrossel de produtos com abas e ordenação
│   │   ├── ProductModal/    # Modal de detalhe do produto + seletor de quantidade
│   │   ├── CartDrawer/      # Drawer lateral do carrinho
│   │   ├── PartnerBanners/  # Banners de benefícios (frete, parcelamento)
│   │   ├── BrandList/       # Seção "Navegue por marcas"
│   │   ├── Newsletter/      # Formulário de inscrição
│   │   ├── Footer/          # Links, redes sociais, dados da empresa
│   │   ├── DevModal/        # Modal "Desenvolvido por" (portfólio)
│   │   └── icons/           # Ícones SVG inline como componentes React
│   ├── hooks/
│   │   ├── useProducts.ts   # Estado de carregamento/erro/sucesso da API
│   │   └── useCart.ts       # Estado do carrinho (adicionar, remover, atualizar)
│   ├── services/
│   │   └── products.ts      # fetch + validação do JSON com fallback local
│   ├── styles/
│   │   ├── global.scss      # Reset, utilitários e estilos globais
│   │   ├── _vars.scss       # Tokens de design (cores, fontes, breakpoints)
│   │   └── _mixins.scss     # Mixins reutilizáveis (container, btn, focus-ring)
│   ├── test/
│   │   └── setup.ts         # Configuração do Testing Library
│   ├── types/
│   │   └── product.ts       # Interfaces Product, CartItem, ProductsResponse
│   ├── utils/
│   │   └── format.ts        # formatPrice, installmentValue, hasFreeShipping
│   ├── App.tsx              # Composição da página e estado global
│   └── main.tsx             # Entry point React
├── .env                     # Variáveis de ambiente
├── .gitignore
├── .prettierrc
├── index.html               # Ponto de entrada HTML (SEO, OG, JSON-LD)
├── package.json
├── README.md                # Este arquivo
├── SOBRE.md                 # Descrição não-técnica do projeto
├── tsconfig.json
└── vite.config.ts
```

## Comportamento e decisões

- **API**: produtos de `https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`. Se falhar (CORS, offline), usa `public/produtos.json`. Se ambos falharem, exibe mensagem de erro com botão "Tentar novamente".
- **Parcelas**: calculadas a partir do preço (`price / 2`). O campo "preço de" riscado não existe no JSON e não é exibido.
- **Frete grátis**: exibido para produtos com preço ≥ R$ 200.
- **Modal**: acessível (`role="dialog"`, focus trap, retorno de foco, ESC, scroll bloqueado).
- **Carrossel**: scroll nativo com `scroll-snap`, setas que avançam um card por vez.
- **Abas e categorias**: visuais apenas — o JSON não possui campo de categoria.

## Deploy

O projeto gera arquivos estáticos em `dist/` com `npm run build`. Pode ser hospedado em qualquer CDN ou servidor de arquivos estáticos (Vercel, Netlify, GitHub Pages, etc.).

Ao hospedar, configure o servidor para:
- Redirecionar HTTP → HTTPS
- Servir `404.html` para rotas não encontradas com status HTTP 404
- Adicionar headers de segurança: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`

## Licença
Projeto desenvolvido para fins de avaliação técnica. Todos os direitos reservados à Econverse.
