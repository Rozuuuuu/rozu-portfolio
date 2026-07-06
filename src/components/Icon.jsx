import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    AtSign,
    Award,
    BadgeCheck,
    Bot,
    Brain,
    ChevronDown,
    Circle,
    CircleAlert,
    CircleCheck,
    CircleDot,
    ClipboardList,
    Cloud,
    Code,
    Compass,
    Database,
    Dices,
    Dumbbell,
    ExternalLink,
    FileCode,
    Flame,
    FolderGit2,
    GitBranch,
    Link2,
    Server,
    Triangle,
    Workflow,
    Footprints,
    Gauge,
    HardHat,
    Infinity as InfinityIcon,
    ImagePlus,
    Info,
    LayoutGrid,
    Mail,
    MapPin,
    Medal,
    Package,
    Paintbrush,
    Pencil,
    PenTool,
    PlaneTakeoff,
    Play,
    SearchX,
    Send,
    Settings2,
    ShieldCheck,
    Sparkles,
    Terminal,
    TrendingUp,
    TriangleAlert,
    Trophy,
    Volleyball,
    Wrench,
} from 'lucide-react';

/**
 * Central icon component — Lucide stroke icons (24×24, fill none,
 * round caps) keyed by the Material Symbols names already used in
 * data files, so callers and data don't need renaming.
 *
 * Sized at 1em so existing text-size utilities (text-xl, text-sm…)
 * keep controlling icon size exactly as the icon font did.
 */
const ICONS = {
    add_photo_alternate: ImagePlus,
    alternate_email: AtSign,
    arrow_back: ArrowLeft,
    arrow_forward: ArrowRight,
    arrow_outward: ArrowUpRight,
    assignment: ClipboardList,
    brush: Paintbrush,
    build: Wrench,
    casino: Dices,
    check_circle: CircleCheck,
    circle: Circle,
    cloud: Cloud,
    code: Code,
    dataset: Database,
    deployed_code: Package,
    design_services: PenTool,
    directions_run: Footprints,
    draw: Pencil,
    emoji_events: Trophy,
    engineering: HardHat,
    error: CircleAlert,
    expand_more: ChevronDown,
    explore: Compass,
    fire: Flame,
    fitness_center: Dumbbell,
    flight_takeoff: PlaneTakeoff,
    git: GitBranch,
    github: FolderGit2,
    grid_view: LayoutGrid,
    infinity: InfinityIcon,
    link: Link2,
    robot: Bot,
    server: Server,
    vercel: Triangle,
    workflow: Workflow,
    info: Info,
    insights: TrendingUp,
    integration_instructions: FileCode,
    location_on: MapPin,
    mail: Mail,
    military_tech: Medal,
    open_in_new: ExternalLink,
    play_arrow: Play,
    psychology: Brain,
    search_off: SearchX,
    send: Send,
    settings_suggest: Settings2,
    smart_toy: Bot,
    speed: Gauge,
    sports_basketball: CircleDot,
    sports_volleyball: Volleyball,
    stars: Sparkles,
    terminal: Terminal,
    verified: BadgeCheck,
    verified_user: ShieldCheck,
    warning: TriangleAlert,
    workspace_premium: Award,
};

const Icon = ({ name, className = '', ...props }) => {
    const LucideIcon = ICONS[name];
    if (!LucideIcon) {
        if (import.meta.env.DEV) console.warn(`Icon: no mapping for "${name}"`);
        return null;
    }
    return (
        <LucideIcon
            size="1em"
            strokeWidth={1.7}
            aria-hidden="true"
            className={`inline-block shrink-0 ${className}`}
            {...props}
        />
    );
};

export default Icon;
