# Recipe Blog - Internationalized Next.js Application

A modern, fully-featured recipe blog application built with Next.js, React, TypeScript, and Tailwind CSS, with built-in support for English, Spanish, and French.

## 🌟 Features

- **Multi-Language Support**: English, Spanish, and French with next-i18next
- **Recipe Management**: Display, search, and filter recipes by category
- **Recipe Details**: Full recipe pages with ingredients, instructions, and cooking time
- **Social Sharing**: Share recipes on Twitter and Facebook
- **Print Friendly**: Optimized print styles for recipes
- **Newsletter**: Email subscription with validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Structured data and meta tags via next-seo
- **Type Safe**: Full TypeScript support
- **Docker Ready**: Containerized for easy deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker (optional)

### Installation

```bash
# Navigate to the project
cd recipe-blog

# Install dependencies
npm install

# Run in development mode
npm run dev
```

Visit http://localhost:3000 to see the application.

## 📝 Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production ⚠️ (known issue - see KNOWN_ISSUES.md)
- `npm run start` - Start production server (requires successful build)

## 🗂️ Project Structure

```
pages/           # Next.js pages (index, recipes, 404, 500)
components/      # React components (Layout, Header, Footer, etc.)
lib/             # Utilities and CMS service
public/locales/  # Translation files (en, es, fr)
styles/          # Global styles
```

## 🌍 Languages

- **English** (`/en`)
- **Spanish** (`/es`)
- **Français** (`/fr`)

## 🍽️ Features in Detail

### Search & Filter
- Real-time recipe search by title
- Filter by cuisine category
- Combined search and filter

### Newsletter
- Email validation
- Success confirmation
- Error handling

### Social Sharing
- Twitter sharing with recipe details
- Facebook sharing
- Copy-to-clipboard functionality

### Print Friendly
- Optimized layout for printing
- Hidden navigation and footer
- Print-specific styling

## 🐳 Docker

```bash
# Build image
docker build -t recipe-blog:latest .

# Run with Docker Compose
docker-compose up --build
```

Visit: http://localhost:3000


## 📦 Tech Stack

- **Frontend**: React 19, TypeScript 5, Tailwind CSS 4
- **Framework**: Next.js 16.1.4
- **i18n**: next-i18next 15.4.3
- **Forms**: react-hook-form 7.71.1
- **SEO**: next-seo 7.0.1

## 🧪 Testing

30+ `data-testid` attributes throughout the application for easy testing:
- `data-testid="featured-recipes"`
- `data-testid="recipe-card"`
- `data-testid="search-input"`
- `data-testid="newsletter-form"`

## 📄 License

MIT License

---

**Built with ❤️ using Next.js, React, and TypeScript**
