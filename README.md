# PlayerStall - Sports Locker Business Website

A modern, professional Astro website for PlayerStall, a sports locker business serving customers across the United States.

## Features

- **Homepage** - Showcasing services and features
- **Services** - Detailed information about locker solutions
- **Locations** - Find PlayerStall locations across the US
- **About** - Company information and values
- **Contact** - Contact form and business information

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:4321`

### Build for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── layouts/     # Layout components
│   │   └── BaseLayout.astro
│   └── pages/       # Page components
│       ├── index.astro
│       ├── services.astro
│       ├── locations.astro
│       ├── about.astro
│       └── contact.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Customization

- Update contact information in the footer and contact page
- Modify location details in `src/pages/locations.astro`
- Customize colors and styling in each component's `<style>` section
- Add your logo by replacing the text logo in `BaseLayout.astro`

## Technologies

- [Astro](https://astro.build) - Web framework
- TypeScript - Type safety
- Modern CSS - Styling

## License

All rights reserved © 2024 PlayerStall

