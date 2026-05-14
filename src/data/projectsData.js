/**
 * Centralized project data with STARR narratives.
 * Each project entry follows the STARR method:
 *   Situation → Task → Action → Result → Reflection
 *
 * Update the STARR fields with your real engineering stories.
 */

const projects = [
    {
        slug: 'velocity-dashboard',
        tag: 'FinTech',
        tags: ['React', 'Three.js', 'Tailwind CSS'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBidNJZdCrwyGclUfeA6Bf10YlCqXfYgCaR4mL6wH5BDtWxxluQv_Iw8K6xK02C_V9tw88fQDsNJNdTT-oKnV5rKR1DVgzK_UNHOBSplChIz0mPZd4bS4y6_5itXtUAY3CYs1ikkvfto46-QkptMjlIU21iwlEKupersLeyYRIFInS6WUlKgb4pifyy2nti8vUCYk8vTCKHaNk5Tk-5Y70CpDNMICS47ysvJzZ7PCj4GoX_jX0kDC65aCeGQOACdz9K3GoPrz0WfW6L',
        title: 'Velocity Dashboard',
        desc: 'A high-fidelity performance tracking system for extreme sports enthusiasts. Built with real-time WebGL visualizations and low-latency data streams.',
        situation: 'Extreme sports athletes lacked a centralized, real-time dashboard to track performance metrics across multiple disciplines. Existing tools were fragmented, data-heavy, and offered poor visual clarity — especially under high-velocity conditions where quick glances matter.',
        task: 'Design and build a high-fidelity performance tracking dashboard that handles real-time data streams with sub-200ms latency, renders 3D visualizations of telemetry data, and remains readable at a glance during intense activity.',
        action: 'Architected a React 18 SPA with Three.js for WebGL-powered 3D terrain and velocity visualizations. Implemented WebSocket connections for live telemetry ingestion, used React Suspense for code-splitting heavy 3D modules, and designed a custom Tailwind CSS design system optimized for data density. Applied virtual scrolling for historical data tables to maintain 60fps.',
        result: 'Delivered a dashboard capable of rendering 10,000+ data points at 60fps. Reduced initial bundle size by 40% through code-splitting. Achieved a Lighthouse performance score of 98. User engagement increased 3x compared to the previous static reporting tool.',
        reflection: 'The biggest learning was balancing visual richness (Three.js) with performance constraints. In hindsight, I would have adopted a Web Worker strategy earlier for telemetry parsing to unblock the main thread. The project reinforced that performance optimization is an ongoing discipline, not a one-time task.',
        links: { demo: '#', github: '#' },
    },
    {
        slug: 'chronos-api',
        tag: 'Backend',
        tags: ['Laravel', 'PostgreSQL'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA26ALWy-OSvX7rKhG1xKqdqW0wxPKPMRGY9GpR8h7IclqdJBRiDaHP7XdDtr-lctepcffj-1xdiCy9cFab5YNq7pO37ol9-NzxiGaUznanIad4X-jmhNFre5HsK9q19B1_IcN3wszTdqxMK3gRTa3HGmem9vk4Sd3EYNNqR-ub1Q-hVtOOhcKos_waeOWXqLgBzQC19WrHzPDTLl504XZv3DftlXF14AkQpIhyv7_tCX-GJPPr7cghMREvW5ViQvToSHkdkS6GFY4i',
        title: 'Chronos API',
        desc: 'Robust enterprise-level scheduling engine optimized for distributed systems. Handling 1M+ requests daily with 99.9% uptime.',
        situation: 'An enterprise client needed a scheduling engine capable of handling millions of daily requests across distributed microservices. Their legacy cron-based system was causing cascading failures during peak loads, resulting in missed schedules and SLA breaches.',
        task: 'Build a horizontally scalable scheduling API with guaranteed delivery, idempotent execution, and real-time monitoring — targeting 99.9% uptime SLA with sub-50ms p95 latency.',
        action: 'Built on Laravel with PostgreSQL, implementing a queue-based architecture with Redis for job deduplication and rate limiting. Designed a partition-aware scheduler that distributes load across worker pools. Added comprehensive observability with structured logging, health checks, and Prometheus metrics. Wrote integration tests covering 94% of critical paths.',
        result: 'The API handles 1.2M+ daily requests with 99.95% uptime. P95 latency dropped from 340ms to 38ms. Zero missed schedules in 6 months of production. The monitoring dashboard reduced incident response time from 45min to under 5min.',
        reflection: 'Learned that idempotency is non-negotiable in distributed scheduling. The partition-aware design was the right call, but I underestimated the complexity of graceful shutdown during deployments. Future iterations would benefit from a circuit breaker pattern for downstream dependencies.',
        links: { docs: '#', github: '#' },
    },
    {
        slug: 'synapse-messenger',
        tag: 'Real-Time',
        tags: ['Node.js', 'Redis', 'WebSockets'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkHqrV81GxPifYlmTgj0BVGmGDSajPaOvtGKeiknBcqgVmRG_lFeP4DoGIakLnah_NAikHYCzJIOjOf2Kopr59L8nM7Jy3XOzZomv86kOeCHbNJm0xMgibKBaWU-J1OoMSAs_yOpQXerMPIYObaXoFz-uTh86pwW296Dp5lZSI8_NXnnFLr761yDo5md60V8fPg5AAZ8kb5ODm0NbfYnACNM3o8NtU8gpY_i2T_2ufMylQvBqlFJs2Ou_ZDYfxxtA9PG631kP-6zgo',
        title: 'Synapse Messenger',
        desc: 'A zero-knowledge encrypted messaging platform built for secure communication. Featuring real-time status syncing and end-to-end media sharing protocols.',
        situation: 'Privacy-conscious users needed a messaging platform that guaranteed zero-knowledge encryption without sacrificing the real-time experience they expect from mainstream messengers. Existing encrypted solutions had noticeable latency and poor media handling.',
        task: 'Architect a real-time messaging platform with end-to-end encryption, sub-100ms message delivery, real-time presence/typing indicators, and seamless media sharing — all without the server ever accessing plaintext content.',
        action: 'Built a Node.js backend with Socket.IO for WebSocket management and Redis Pub/Sub for horizontal scaling across multiple server instances. Implemented the Signal Protocol for E2E encryption on the client side. Designed a chunked media upload system with client-side encryption before transmission. Used service workers for offline message queuing and background sync.',
        result: 'Achieved 85ms average message delivery latency. Successfully handles 50K concurrent connections per server instance. Media sharing works seamlessly up to 100MB files with progress indicators. Zero security incidents since launch, verified by third-party audit.',
        reflection: 'The Signal Protocol integration was more complex than anticipated — key exchange edge cases (multi-device, key rotation) required significant testing. I would have invested in a formal threat model earlier. The chunked upload system proved invaluable and is now a reusable module across other projects.',
        links: { demo: '#', github: '#' },
    },
    {
        slug: 'editorial-archive',
        tag: 'Content',
        tags: ['Next.js', 'Contentful'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHzm4o4YPI3--dRsEueHejaP5Qr5drtruCJbBP7_1ggS74nZZID1ATEUJdfMF1vkoyfPoDHRwjIXTwKUwcU0A9RWjEszZsjzDPB27yDtRrnJ831i_1vR4MfdHyRsnzYDmtsii7B6WPtL8nmCTSzU77nCc-Ezzn3i3UK7nIpVJQvgQ48sS3YlyeSoQMSuXIaOrLARqmg2ZfzbLJLTlsYf4JpO1oLxshOEdDocBZuKqgnKhgG1X9-AutO-IUc85ic1N50mznKt1asu38',
        title: 'The Editorial Archive',
        desc: 'A headless CMS implementation for a global design magazine. Optimized for SEO and lightning-fast content delivery through Vercel Edge.',
        situation: 'A global design magazine was struggling with their WordPress-based site — page load times exceeded 4 seconds, SEO rankings were declining, and their editorial team needed a modern content workflow that supported rich media and real-time previews.',
        task: 'Migrate the magazine to a headless CMS architecture with sub-1-second page loads, automated SEO optimization, and a preview workflow that lets editors see changes before publishing — without disrupting ongoing content production.',
        action: 'Built with Next.js 14 App Router and Contentful as the headless CMS. Implemented ISR (Incremental Static Regeneration) for articles, used Vercel Edge Functions for geographically distributed delivery, and created a custom preview mode with draft content support. Designed an automated SEO pipeline that generates meta tags, structured data, and sitemaps from CMS content.',
        result: 'Page load time dropped from 4.2s to 0.8s (81% improvement). Organic search traffic increased 62% within 3 months. Editorial team reduced publish workflow from 25 minutes to 3 minutes. Site handles 2M+ monthly pageviews on Vercel\'s free tier.',
        reflection: 'ISR was the right architectural choice, but cache invalidation edge cases taught me to always implement a manual purge mechanism. The biggest win was the automated SEO pipeline — it removed human error from meta tag management entirely. Next time, I\'d consider Sanity over Contentful for its real-time collaboration features.',
        links: { live: '#' },
    },
    {
        slug: 'aura-vision-ai',
        tag: 'AI/ML',
        tags: ['Python', 'TensorFlow'],
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe3LFpxPA3nSEyMw4b-wqbWJrzn2ShOmadPaAncPsWbKvUwxM9IGu955--2EGnzRjtASNQ6ZDHB3qw5FmUIWrrtnzT8-j5rnHG0ndfyYpgSrb6BkCy0ziy3zeEM1qtuft5hyLu8g8rACxAbchvjKVvy4_ypdb-z9USUmsAjlwNRCo4TofGKVz0HfNhYGOjrsjjh0Y8CRjHmJ1Gv-fy9zX1jMZGhEbmnXAFJKKfzlG8F8odukEiEeORhwJ2p8z7HDGz74Gf6Xk65FXM',
        title: 'Aura Vision AI',
        desc: 'Computer vision model capable of real-time sentiment analysis and spatial awareness for retail environments.',
        situation: 'A retail chain needed to understand in-store customer behavior — sentiment, dwell time, and movement patterns — without invasive surveillance. Existing solutions required expensive proprietary hardware and offered limited real-time insights.',
        task: 'Build a computer vision pipeline that performs real-time sentiment analysis and spatial tracking using standard IP cameras, with a web dashboard for store managers to monitor engagement zones and customer flow.',
        action: 'Developed a TensorFlow-based model pipeline combining face detection (BlazeFace), expression classification (custom CNN trained on FER-2013+), and centroid tracking for spatial awareness. Built a FastAPI backend for model serving with batched inference, and a React dashboard with WebSocket-driven heatmaps. Deployed on edge devices (NVIDIA Jetson) for on-premise processing.',
        result: 'Model achieves 89% accuracy on sentiment classification at 24fps on Jetson Nano. Reduced hardware costs by 70% vs. proprietary solutions. Store managers reported actionable insights within the first week, leading to a 15% improvement in high-engagement zone placement.',
        reflection: 'Privacy-by-design was essential — all processing happens on-premise with no facial data leaving the device. The biggest challenge was optimizing model inference for edge deployment. TensorFlow Lite quantization was key, but I\'d explore ONNX Runtime next time for better cross-platform support.',
        links: { github: '#' },
    },
];

export default projects;
