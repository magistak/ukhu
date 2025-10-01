# Overview

This project provides **two separate relocation portals** with different purposes:

- **Hungarian Site** (`/hu/*`): For Hungarians moving to the UK (HU→UK) - content in Hungarian
- **English Site** (`/en/*`): For anyone moving to Hungary (→HU) - content in English

Each language serves a completely different audience and direction, with tailored content, guides, and resources. The application uses a headless architecture where WordPress serves as the content management system for editors, while a Next.js frontend delivers fast, mobile-first user experiences with Firebase handling authentication, data storage, and serverless functions.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

**October 2025 - Modern UI Transformation**
- Implemented jaw-dropping 2025 design system with flashy modern effects
- Aurora animated gradients in hero sections with dual-layer background animations
- Glassmorphism effects throughout (frosted glass header, trust indicators)
- 3D card hover effects with perspective transforms and gradient borders
- Modern gradient buttons with shimmer, magnetic hover, and ripple effects
- Gradient text treatments on headings and logo
- Full accessibility support (prefers-reduced-motion, hover gating)
- Performance-optimized GPU-accelerated animations

# System Architecture

## Frontend Architecture
- **Next.js 14** with TypeScript for the web application using App Router
- **Internationalization**: Path-based routing (`/en/*`, `/hu/*`) with locale-aware content loading
- **Static Site Generation (SSG)** for most content pages with Incremental Static Regeneration (ISR) for time-sensitive content
- **Responsive Design**: Mobile-first approach with CSS Modules architecture
- **Modern Design System (2025)**: 
  - Aurora gradient animations and glassmorphism effects
  - 3D transforms and perspective-based interactions
  - GPU-accelerated animations with reduced-motion support
  - Gradient text, glow effects, and modern visual treatments
  - Comprehensive utility class system for flashy UI components
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
- **Netlify** for production deployment (GitHub → Netlify workflow)
- **GitHub Repository**: magistak/ukhu
- **Firebase CLI** for local development and Firebase services deployment
- **PNPM** workspaces for monorepo package management

## Third-party Integrations
- **Email Service Provider** (adapter pattern for future integration)
- **Analytics Service** (placeholder implementation for future tracking)
- **WordPress Application Passwords** for secure API authentication