# Overview

This project provides **two separate relocation portals** with different purposes:

- **Hungarian Site** (`/hu/*`): For Hungarians moving to the UK (HU→UK) - content in Hungarian
- **English Site** (`/en/*`): For anyone moving to Hungary (→HU) - content in English

Each language serves a completely different audience and direction, with tailored content, guides, and resources. The application uses a headless architecture where WordPress serves as the content management system for editors, while a Next.js frontend delivers fast, mobile-first user experiences with Firebase handling authentication, data storage, and serverless functions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Next.js 14** with TypeScript for the web application using App Router
- **Internationalization**: Path-based routing (`/en/*`, `/hu/*`) with locale-aware content loading
- **Static Site Generation (SSG)** for most content pages with Incremental Static Regeneration (ISR) for time-sensitive content
- **Responsive Design**: Mobile-first approach with minimal CSS and no UI frameworks
- **SEO Optimization**: Built-in meta tags, sitemaps, robots.txt, and canonical URLs

## Backend Architecture
- **Headless WordPress** as the content management system with audience-based content taxonomy
- **Firebase Functions** for serverless backend logic (contact forms, data validation)
- **Firebase Firestore** for user data, checklists, and form submissions
- **Firebase Authentication** for user management with email/password authentication
- **Firebase Hosting** for static site deployment

## Content Management  
- **WordPress Custom Post Types**: Guides, FAQs, Checklist Templates, Announcements
- **Audience-Based Content**: Structured content model with direction-specific filtering (`hu-to-uk`, `to-hungary`)
- **Editorial Workflow**: Version control, review processes, and content freshness tracking
- **API Integration**: REST/GraphQL endpoints for content delivery to the frontend

## Data Flow
1. Editors create and manage content in WordPress with audience-based taxonomy
2. Next.js build process fetches content via WordPress API during static generation
3. User interactions (auth, checklists, forms) are handled by Firebase services
4. Contact forms route through Firebase Functions for validation and email notifications

## Security Model
- **Firebase Security Rules**: User-scoped data access patterns
- **WordPress Hardening**: Admin-only access, MFA, IP allowlisting, read-only API tokens
- **Environment Variables**: All secrets managed through environment configuration
- **GDPR Compliance**: Data minimization, retention policies, and user data export/deletion

# External Dependencies

## Content Management
- **WordPress** (headless CMS with REST/GraphQL API)
- **Advanced Custom Fields (ACF)** for structured content fields and audience taxonomy

## Frontend Framework
- **Next.js 14** with TypeScript for React-based web application
- **React 18** for component architecture and client-side interactions

## Backend Services
- **Firebase Suite**:
  - Authentication for user management
  - Firestore for NoSQL database
  - Cloud Functions for serverless backend logic
  - Hosting for static site deployment
- **Firebase Admin SDK** for server-side operations

## Development Tools
- **TypeScript** for type safety across the entire codebase
- **ESLint & Prettier** for code formatting and linting
- **Vitest** for unit testing
- **PNPM** for package management with workspace support

## Build and Deployment
- **Vercel/Firebase Hosting** for CDN-based static site delivery
- **GitHub Actions** (implied) for CI/CD pipeline
- **Firebase CLI** for local development and deployment

## Third-party Integrations
- **Email Service Provider** (adapter pattern for future integration)
- **Analytics Service** (placeholder implementation for future tracking)
- **WordPress Application Passwords** for secure API authentication