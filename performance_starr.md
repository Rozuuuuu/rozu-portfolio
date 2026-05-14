# Performance & Responsiveness Overhaul (STARR)

> [!TIP]
> This document summarizes the recent architectural and performance optimizations made to the portfolio. It serves as engineering documentation that you can discuss during technical interviews.

## Situation
The React 18 + Vite portfolio was experiencing high initial load latency, largely due to a monolithic JavaScript bundle and unoptimized image assets (PNGs). Additionally, the UI lacked a consistent responsive grid system, causing layout shifts, and several interactive elements failed to meet the WCAG 44x44px minimum touch target standards on mobile devices.

## Task
As a Staff Frontend Engineer, the objective was to implement a Critical Rendering Path Optimization strategy to drive the Time to Interactive (TTI) below 2.0s and achieve a Lighthouse Performance score of 98+. Concurrently, a Mobile-First Responsive Overhaul was required to standardize the grid architecture and improve mobile accessibility.

## Action
I engineered a multi-faceted optimization strategy:

### 1. Critical Rendering Path Optimization
- **Route-based Code Splitting:** Implemented `React.lazy()` and `<Suspense>` boundaries in `App.jsx`. I eagerly loaded above-the-fold components (`Hero`, `TechnicalArsenal`) to protect the Largest Contentful Paint (LCP), while deferring below-the-fold components and secondary routes to separate chunks.
- **Manual Chunking Strategy:** Audited the bundle and configured `vite.config.js` with `build.rollupOptions.output.manualChunks`. This isolated heavy dependencies (`framer-motion`, `react-router-dom`) into discrete vendor chunks, enabling the browser to cache them independently of application code updates.
- **Asset Pipeline Upgrades:** Authored a Node.js script using `sharp` to convert all heavy PNG assets in the `public/Projects/` directory to highly-compressed `.webp` formats. I then updated the data layer (`projectsData.js`) to serve these modern formats with native `loading="lazy"` attributes.

### 2. Mobile-First Responsive Overhaul
- **Fluid Grid Architecture:** Standardized the project and metric grids across the application (`Projects.jsx`, `ProjectsPage.jsx`, `TechnicalImpact.jsx`) to a strict `1 -> 2 -> 4` fluid column layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
- **Accessible Touch Targets:** Refactored utility classes on filter tabs and call-to-action buttons, injecting `min-h-[44px]` and `min-w-[44px]` properties to guarantee WCAG-compliant tap areas on all touch devices.

## Result
- **Performance:** The initial JavaScript payload delivered to the browser was drastically reduced, heavily optimizing the Time to Interactive (TTI). Image payloads dropped significantly due to WebP compression, leading to a much faster LCP.
- **Responsiveness:** The UI now scales predictably across all viewports without layout shifts, and mobile users benefit from improved navigation through accessible touch targets.

## Reflection
This overhaul reinforced the importance of deferring non-critical resources. By eagerly loading the Hero section while lazily loading the rest of the application, we bypass the typical SPA pitfall of shipping a massive monolithic bundle. Furthermore, standardizing the grid architecture not only improved the user experience but also reduced CSS complexity and technical debt moving forward.
