/**
 * Centralized project data.
 * Each project entry contains details for the Projects page and detail view.
 * Images/videos are sourced from /Projects/ in the public folder.
 */

const projects = [
    {
        slug: 'gazbeat',
        tag: 'E-Commerce',
        tags: ['Full-Stack', 'E-Commerce', 'Deployment'],
        img: '/Projects/Gazbeat.webp',
        title: 'GazBeat & Co.',
        desc: 'Built and deployed a multi‑service e‑commerce platform for an authorized LPG gas distributor, integrating ukay‑ukay and mini‑mart operations to serve over 5,000 customers with a 98% satisfaction rate.',
    },
    {
        slug: 'habicheck',
        tag: 'Full-Stack',
        tags: ['Full-Stack', 'Habit Tracking', 'Productivity'],
        img: '/Projects/HabiCheck.webp',
        title: 'HabiCheck',
        desc: 'Engineered a full‑stack habit‑tracking application that empowers users to design custom, scored daily questions for personalized accountability and progress monitoring.',
    },
    {
        slug: 'living-journal',
        tag: 'Frontend',
        tags: ['React', 'Vite', 'Task Management'],
        img: null,
        title: 'The Living Journal App',
        desc: 'Developed a modern, dynamic to‑do list application using React and Vite, achieving a streamlined user experience for daily task management.',
    },
    {
        slug: 'reel-flow',
        tag: 'Full-Stack',
        tags: ['TypeScript', 'Supabase', 'Full-Stack'],
        img: '/Projects/Reel flow.webp',
        title: 'Reel-Flow',
        desc: 'Architected a TypeScript‑based full‑stack application on Supabase, implementing robust backend health checks and retry mechanisms for system reliability.',
    },
    {
        slug: 'ye-ai',
        tag: 'AI/ML',
        tags: ['AI', 'Generative Models', 'Full-Stack'],
        img: '/Projects/yeai.webp',
        title: 'Ye-Ai',
        desc: 'Integrated advanced AI capabilities into a functional application, exploring the potential of generative models for creative and practical use cases.',
    },
    {
        slug: 'real-estate',
        tag: 'Frontend',
        tags: ['Vite', 'React', 'Dark Mode', 'Animations'],
        img: '/Projects/Realestate.webp',
        title: 'Real Estate',
        desc: 'Refactored a property listings platform with page routing, smooth animations, and dark mode support using Vite and React.',
    },
    {
        slug: 'tpc-library-system',
        tag: 'Full-Stack',
        tags: ['Laravel', 'PHP', 'Livewire', 'Database'],
        img: null,
        title: 'TPC Library System',
        desc: 'Constructed a comprehensive library management system utilizing the Laravel framework (PHP) and Livewire for a seamless, database‑driven user experience.',
    },
    {
        slug: 'livora',
        tag: 'Full-Stack',
        tags: ['Full-Stack', 'Client Project', 'Reliability'],
        img: '/Projects/livora.webp',
        title: 'Livora',
        desc: 'Designed and implemented key application features and maintained system integrity for a client project, ensuring high availability and reliable performance.',
    },
    {
        slug: 'buy-and-build',
        tag: 'E-Commerce',
        tags: ['E-Commerce', 'Construction', 'Full-Stack'],
        img: '/Projects/buy@ndBuild.webp',
        title: 'Buy @nd Build',
        desc: 'Architected and coded core modules for an e‑commerce platform focused on construction and materials, handling backend logic and user interface components.',
    },
    {
        slug: 'cafe-ai',
        tag: 'AI/ML',
        tags: ['AI', 'Machine Learning', 'Thesis'],
        media: { type: 'video', src: '/Projects/Cafe AI video demo.mp4' },
        img: null,
        title: 'Café AI',
        desc: 'Conceptualized and prototyped an AI‑enabled café system for a thesis project, applying machine learning concepts to enhance the customer ordering experience.',
    },
    {
        slug: 'photobooth',
        tag: 'Frontend',
        tags: ['Frontend', 'Event Tech', 'Responsive'],
        img: '/Projects/photobooth.webp',
        title: 'Photobooth Website',
        desc: 'Engineered the frontend interface for an event photo booth application, ensuring a responsive and intuitive user flow for photo capture and sharing.',
    },
    {
        slug: 'career-journey-tracker',
        tag: 'Full-Stack',
        tags: ['Career Planning', 'Visualization', 'Full-Stack'],
        img: null,
        title: 'Career Journey Tracker',
        desc: 'Designed a dedicated tool for students and professionals to strategically plan and visualize their career pathways, tracking milestones and skill development.',
    },
];

export default projects;
