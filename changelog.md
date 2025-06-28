## [2024-06-22] Fix Vercel Deployment Dependency Conflict

### Changed
- Downgraded `tailwind-scrollbar` from version 4.0.2 to 3.1.0 to resolve dependency conflict with TailwindCSS v3.4.11
- Fixed build error that was preventing successful deployment on Vercel

## [2024-06-20] Sidebar Enhancement with Hover Expand

### Added
- Collapsible sidebar that expands on hover for desktop view
- Animated transitions for sidebar elements
- Improved mobile sidebar with full-screen overlay
- Context-based sidebar navigation system

### Changed
- Sidebar now collapses to icons-only mode when not hovered
- Enhanced active state indicators with smooth animations
- Improved mobile sidebar with better layout and controls

## [2024-06-20] Command Center Workspace Redesign

### Added
- Command center theme with dark starfield background and electric teal accents
- Glassmorphism UI components with subtle animations
- Feature grid with cards for Chat with Docs, Analytics, and Upload Documents
- User avatar dropdown in sidebar
- Supabase tables for tracking workspace usage: `get_started` and `chat_docs`
- Utility functions for tracking workspace interactions

### Changed
- Complete redesign of workspace UI with futuristic command center aesthetic
- Enhanced sidebar with active state indicators and user profile section
- Improved "Coming Soon" placeholder for Chat with Docs section
- Added animations and micro-interactions throughout the interface

### Technical
- Added CSS variables for command center theme and utility classes
- Implemented RLS policies for new Supabase tables
- Added tracking for workspace access and feature usage

## [2024-06-19] Workspace Dashboard & Auth Redirect Flow

### Added
- `src/pages/workspace/index.tsx`: Main workspace layout with responsive sidebar and section routing.
- `src/pages/workspace/components/Sidebar.tsx`: Sidebar component with navigation items.
- `src/pages/workspace/sections/HomeSection.tsx`: Home section with welcome card and Chat with Docs card.
- `src/pages/workspace/sections/ChatDocsSection.tsx`: Placeholder Coming Soon section.

### Updated
- `src/App.tsx`: Added `/workspace/*` route.
- `src/pages/authGate/components/LoginForm.tsx`: Implemented post-login redirect UX and disabled button state.
- `src/pages/authGate/components/RegistrationForm.tsx`: Implemented post-registration redirect UX and disabled button state.

### Fixed
- Removed fake `signInWithPassword` email-existence pre-check in `RegistrationForm.tsx`; now relies solely on `signUp` response, eliminating false "email already in use" errors and 400 logs.

### Notes
Implemented smooth redirect experience with 1.5 s delay and spinner, plus new elegant Workspace dashboard with responsive sidebar and placeholder sections. 

## [2024-06-22] Branding Update - Fixed Hero Section Title

### Changed
- Hardcoded "Smart Service" title in HeroSection.tsx instead of using translation split to ensure consistent branding
- Removed any remaining references to "Zenith AI" from the hero section
- Changed "SMART SERVICE AI" to "SMART SERVICE" in AIEngineSection.tsx
- Changed "Smart Service AI" to "Smart Service" in DialogSection.tsx
- Updated translations: changed "Smart AI Capabilities" to "Smart Service Capabilities" in both English and French

## [2024-06-22] Branding Update - Simplified Product Name

### Changed
- Removed "Zenith AI" from the product name, simplifying it to just "Smart Service"
- Updated system prompts in geminiService.ts to reflect the new branding

## [2024-06-22] Mobile Navbar Auth Navigation Fix

### Fixed
- Wrapped mobile navigation Login & Sign Up buttons in `NavigationBar.tsx` with `Link` components using `asChild`, ensuring they correctly navigate to `/auth?mode=login` and `/auth?mode=register` routes and close the menu upon click. 