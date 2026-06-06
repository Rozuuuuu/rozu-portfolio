import ScrollReveal from './ScrollReveal';
import { Link } from 'react-router-dom';

const frontendSkills = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", name: "HTML5" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", name: "CSS3" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", name: "TypeScript" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", name: "Vue.js" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", name: "Angular" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg", name: "Svelte" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", name: "Next.js", invertInDark: true },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", name: "Tailwind CSS" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg", name: "Sass" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg", name: "Nuxt.js" },
];

const backendSkills = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node.js" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", name: "Django" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", name: "Flask", invertInDark: true },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", name: "FastAPI" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", name: "Go" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", name: "Rust", invertInDark: true },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", name: "Java" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", name: "Spring" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", name: "PHP" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", name: "Laravel" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg", name: "Ruby on Rails" },
];

const databaseSkills = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", name: "PostgreSQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", name: "MySQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", name: "MongoDB" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", name: "Redis" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", name: "SQLite" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg", name: "Elasticsearch" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg", name: "Cassandra" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", name: "Firebase" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg", name: "MariaDB" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg", name: "Neo4j" },
];

const cloudSkills = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", name: "AWS" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", name: "Google Cloud" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", name: "Azure" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", name: "Docker" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", name: "Kubernetes" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", name: "Terraform" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", name: "GitHub Actions", invertInDark: true },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg", name: "GitLab CI" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", name: "Nginx" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg", name: "Ansible" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", name: "Linux" },
];

const SkillPill = ({ skill }) => (
    <div className="logo-pill">
        {/* [PERF FIX 4] Image lazy loading and dimensions */}
        <img 
            src={skill.icon} 
            alt={skill.name} 
            className={skill.invertInDark ? "dark:invert" : ""}
            width="48"
            height="48"
            decoding="async"
            loading="lazy"
        />
        <span>{skill.name}</span>
    </div>
);

const TechnicalArsenal = () => {
    return (
        <section className="bg-neutral-50 dark:bg-black py-24 transition-colors duration-300">
            <style>{`
                .marquee-row {
                    width: 100%;
                    overflow: hidden;
                    padding: 0.6rem 0;
                    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
                }
                .marquee-track {
                    display: flex;
                    width: max-content;
                    gap: 0;
                }
                .marquee-track.left  { animation: scroll-left  28s linear infinite; }
                .marquee-track.right { animation: scroll-right 28s linear infinite; }
                .marquee-row:hover .marquee-track { animation-play-state: paused; }
                .marquee-group {
                    display: flex;
                    align-items: center;
                    gap: 0;
                }
                .logo-pill {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 9px 20px;
                    margin: 0 6px;
                    border: 1px solid #e5e5e5;
                    border-radius: 100px;
                    background: #fafafa;
                    white-space: nowrap;
                    transition: border-color 0.25s, background 0.25s;
                    cursor: default;
                }
                .dark .logo-pill {
                    border: 1px solid #222222;
                    background: #0a0a0a;
                }
                .logo-pill:hover {
                    border-color: #cccccc;
                    background: #f5f5f5;
                }
                .dark .logo-pill:hover {
                    border-color: #444444;
                    background: #111111;
                }
                .logo-pill img {
                    width: 20px;
                    height: 20px;
                    object-fit: contain;
                    flex-shrink: 0;
                }
                .logo-pill span {
                    font-size: 13px;
                    font-weight: 400;
                    color: #555555;
                    letter-spacing: 0.01em;
                }
                .dark .logo-pill span {
                    color: #888888;
                }
                .logo-pill:hover span { 
                    color: #000000; 
                }
                .dark .logo-pill:hover span { 
                    color: #cccccc; 
                }
                .marquee-divider {
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(to right, transparent, #e5e5e5 20%, #e5e5e5 80%, transparent);
                    margin: 0.2rem 0;
                }
                .dark .marquee-divider {
                    background: linear-gradient(to right, transparent, #222222 20%, #222222 80%, transparent);
                }
                @keyframes scroll-left {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-right {
                    0%   { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
            
            <ScrollReveal className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs">Tech Stack</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 text-black dark:text-white">Skills & Frameworks</h2>
                    </div>
                    <Link to="/skills" className="hidden sm:flex text-sm font-bold text-neutral-500 hover:text-black dark:hover:text-white uppercase tracking-widest transition-colors items-center gap-1 pb-1 border-b border-transparent hover:border-black dark:hover:border-white">
                        See More <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                </div>
                
                {/* Mobile 'See More' */}
                <div className="sm:hidden mb-12">
                    <Link to="/skills" className="inline-flex text-sm font-bold text-neutral-500 hover:text-black dark:hover:text-white uppercase tracking-widest transition-colors items-center gap-1 pb-1 border-b border-transparent hover:border-black dark:hover:border-white">
                        See More <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                </div>

                <div className="w-full overflow-hidden flex flex-col gap-2 relative">
                    {/* ROW 1: Frontend */}
                    <div className="marquee-row">
                        <div className="marquee-track left">
                            <div className="marquee-group">
                                {frontendSkills.map((skill, index) => <SkillPill key={`fe1-${index}`} skill={skill} />)}
                            </div>
                            <div className="marquee-group" aria-hidden="true">
                                {frontendSkills.map((skill, index) => <SkillPill key={`fe2-${index}`} skill={skill} />)}
                            </div>
                        </div>
                    </div>

                    <div className="marquee-divider"></div>

                    {/* ROW 2: Backend */}
                    <div className="marquee-row">
                        <div className="marquee-track right">
                            <div className="marquee-group">
                                {backendSkills.map((skill, index) => <SkillPill key={`be1-${index}`} skill={skill} />)}
                            </div>
                            <div className="marquee-group" aria-hidden="true">
                                {backendSkills.map((skill, index) => <SkillPill key={`be2-${index}`} skill={skill} />)}
                            </div>
                        </div>
                    </div>

                    <div className="marquee-divider"></div>

                    {/* ROW 3: Databases */}
                    <div className="marquee-row">
                        <div className="marquee-track left">
                            <div className="marquee-group">
                                {databaseSkills.map((skill, index) => <SkillPill key={`db1-${index}`} skill={skill} />)}
                            </div>
                            <div className="marquee-group" aria-hidden="true">
                                {databaseSkills.map((skill, index) => <SkillPill key={`db2-${index}`} skill={skill} />)}
                            </div>
                        </div>
                    </div>

                    <div className="marquee-divider"></div>

                    {/* ROW 4: Cloud */}
                    <div className="marquee-row">
                        <div className="marquee-track right">
                            <div className="marquee-group">
                                {cloudSkills.map((skill, index) => <SkillPill key={`cl1-${index}`} skill={skill} />)}
                            </div>
                            <div className="marquee-group" aria-hidden="true">
                                {cloudSkills.map((skill, index) => <SkillPill key={`cl2-${index}`} skill={skill} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default TechnicalArsenal;
