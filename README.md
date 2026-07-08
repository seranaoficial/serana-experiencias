# Serana Experiencias

Landing page para **Serana Experiencias** — la línea de eventos, retiros y prácticas de bienestar de la marca Serana.

## Stack

- HTML5 + CSS3 vanilla (sin build step)
- JS vanilla para cursor, scroll reveal, quiz interactivo y formulario
- Deploy: Vercel estático (sin funciones serverless)

## Estructura

```
.
├── index.html       # Estructura principal
├── styles.css       # Design system alineado a serana.food
├── app.js           # Interacciones, quiz, formulario
├── public/
│   └── favicon.svg  # Logo de Serana
├── package.json     # Solo para que Vercel lo detecte
└── README.md
```

## Desarrollo local

```bash
python3 -m http.server 8000
# o cualquier servidor estático
```

## Deploy

El proyecto está conectado a Vercel. Cada push a `main` dispara un deploy automático.

## Paleta de diseño

| Token | Hex | Uso |
|-------|-----|-----|
| `--serana-cream` | `#FEFADF` | Fondo principal |
| `--serana-olive` | `#5F6C37` | Acentos secundarios |
| `--serana-forest` | `#273617` | Textos y fondos oscuros |
| `--serana-ochre` | `#DCA15D` | Acentos cálidos |
| `--serana-terracotta` | `#BC6C25` | Acentos de impacto |

Tipografías: **Montserrat** (sans) + **Playfair Display** (serif).
