export const GITHUB_PROFILE = "https://github.com/JesseAltraide";
export const EMAIL = "Jaltraide10@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jesse-altraide-7ab06525b";
export const CV_URL = "/Jesse_Altraide_CV.pdf";
export const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;
export interface Project {
  id: string;
  name: string;
  context: string;
  summary: string;
  proof: string;
  stack: string[];
  github: string;
  privateNote?: string;
  demo?: string;
  demoPoster?: string;
  live?: string;
  framework: string;
}

export const projects: Project[] = [
  {
    id: "01",
    name: "Voice Support Agent",
    context: "Koya Talent / Claude Agent SDK, Vapi, MCP",
    summary:
      "A voice-based customer support agent with a self-built MCP server. Callers are verified on three server-matched factors before any account lookup, and every spoken figure has to trace back to a retrieved record.",
    proof: "Per-turn latency cut from ~8s to under 3s. 370+ tests, including attack-string suites.",
    stack: ["Claude Agent SDK", "Vapi", "MCP", "Supabase", "Postgres"],
    demo: "https://www.loom.com/share/03c275eef53442789b638e4c4c2a609e",
    demoPoster: "https://cdn.loom.com/sessions/thumbnails/03c275eef53442789b638e4c4c2a609e-e753bdb9e54d667b.gif",
    live: "https://voice-support-assistant-5osb.onrender.com/",
    github: "https://github.com/JesseAltraide/Voice-Support-Assistant",
    framework: "Claude Agent SDK",
  },
  {
    id: "02",
    name: "Lead Research Agent",
    context: "Koya Talent / Claude Agent SDK",
    summary:
      "An autonomous agent that picks from six tools across a multi-step research workflow. Spend limits live inside the tool layer, and qualification status is derived from per-criterion evidence rather than model self-assessment.",
    proof: "Saved statuses that contradict their evidence are rejected.",
    stack: ["Claude Agent SDK", "TypeScript", "Firecrawl", "Apify"],
    github: "https://github.com/JesseAltraide/Lead-scraper",
    framework: "Claude Agent SDK",
  },
  {
    id: "03",
    name: "Proposal Generator",
    context: "Koya Talent / Next.js, Supabase",
    summary:
      "Full-stack AI proposal app with role-based access for salespeople and approvers, server-side PDF generation and email-verified client delivery. Every state change is an atomic conditional write.",
    proof: "No duplicate approvals or regenerations under concurrent requests.",
    stack: ["Next.js", "Supabase", "RLS", "PDF"],
    github: "https://github.com/JesseAltraide/Proposal-System",
    framework: "Next.js",
  },
  {
    id: "04",
    name: "Ops Reporting Pipeline",
    context: "Koya Talent / n8n, Supabase, Claude",
    summary:
      "Unifies Sales, People Ops and Project Delivery data into one dashboard with AI-written insights. A shared run ID is traceable across every table, and a failed source falls back to the last good run with a staleness stamp.",
    proof: "Claude flagged a real attrition spike by comparing three reporting windows in one call.",
    stack: ["n8n", "Supabase", "Claude API"],
    demo: "https://www.loom.com/share/40fab3656ee94c02bdfcab169194a6a6",
    demoPoster: "https://cdn.loom.com/sessions/thumbnails/40fab3656ee94c02bdfcab169194a6a6-4c2572ec7411ce02.gif",
    github: "https://github.com/JesseAltraide/Reporting-pipeline",
    framework: "n8n",
  },
  {
    id: "05",
    name: "Content Research Pipeline",
    context: "Koya Talent / n8n, Next.js",
    summary:
      "SEO-grounded articles with per-excerpt source citations and independently scored channel adaptations, gated by a two-pass evaluation with hard-block floors per criterion.",
    proof: "Reordered to propose angles before extraction, skipping cost on angles never chosen.",
    stack: ["n8n", "Next.js", "Claude API"],
    github: "https://github.com/JesseAltraide/Content-Creation-App",
    framework: "n8n",
  },
  {
    id: "06",
    name: "Ajjixa Backend",
    context: "Lead Backend Engineer / Spring Boot",
    summary:
      "75+ REST APIs across four user roles: leads with round-robin distribution and approval workflows, an atomic deal-closing engine, and a versioned plot-scoring engine over JSONB polygons.",
    proof: "List payloads cut from ~16 MB to under 1 KB. 14 Flyway migrations, validate-only.",
    stack: ["Spring Boot", "Spring Security", "PostgreSQL", "Docker"],
    github: "",
    privateNote: "Private client repository",
    framework: "Spring Boot",
  },
];

export const metrics = [
  { value: "800+", label: "automated tests, 69 suites, zero regressions" },
  { value: "<300ms", label: "listing queries over 10,000+ records" },
  { value: "75+", label: "REST APIs shipped for Ajjixa" },
  { value: "8s to 3s", label: "voice agent per-turn latency" },
];

export type ExperienceIcon = "phone" | "briefcase" | "buildings" | "robot";

export interface ExperienceLink {
  label: string;
  href: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  summary: string;
  icon: ExperienceIcon;
  highlights: string[];
  links?: ExperienceLink[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Mobile Application Developer",
    org: "Tizeti Network Limited",
    period: "Mar 2025 - Sep 2025",
    summary: "Two production Android apps in Kotlin, with secure backend API integration.",
    icon: "phone",
    highlights: ["2 apps live on Google Play", "Reliable auth and persistent storage"],
    links: [
      { label: "MyTizeti on Google Play", href: "https://play.google.com/store/apps/details?id=com.mytzt.mytizetiapp&pcampaignid=web_share" },
      { label: "Freefiber on Google Play", href: "https://play.google.com/store/apps/details?id=com.tzt.freefiber_android&pcampaignid=web_share" },
    ],
  },
  {
    role: "Backend Engineer and Mobile App Developer",
    org: "Bulvds",
    period: "Feb 2026 - Sep 2026",
    summary: "Built the Experiences booking feature end to end in Express and wired it into the app.",
    icon: "briefcase",
    highlights: [
      "10,000+ records listed in under 300ms",
      "800+ tests across 69 suites, zero regressions",
      "Fixed a false update prompt for live App Store users",
    ],
    links: [
      { label: "Bulvds on the App Store", href: "https://apps.apple.com/ng/app/bulvds-stays-experiences/id6739577400" },
    ],
  },
  {
    role: "Lead Backend Engineer",
    org: "Ajjixa",
    period: "Jul 2026 - Present",
    summary: "Spring Boot platform for plot sales across four user roles.",
    icon: "buildings",
    highlights: [
      "75+ documented REST APIs",
      "List payloads cut from ~16 MB to under 1 KB",
      "Atomic deal-closing and commission engine",
      "14 Flyway migrations, schema drift fails at startup",
    ],
  },
  {
    role: "AI Automation Engineer",
    org: "Koya Talent",
    period: "Aug 2026 - Present",
    summary: "Voice, lead-research and reporting agents on the Claude Agent SDK, MCP and n8n.",
    icon: "robot",
    highlights: [
      "370+ tests incl. attack-string suites",
      "Voice latency cut from ~8s to under 3s",
      "Fixed a live account-data leak found in review",
    ],
  },
];

export type FallbackIcon = "database" | "queue" | "cloud" | "spider" | "flame" | "phone" | "tree" | "key" | "gear" | "sparkle";

export interface Skill {
  name: string;
  slug?: string;
  fallback?: FallbackIcon;
}

export interface SkillCategory {
  label: string;
  blurb: string;
  items: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    blurb: "What I write production code in.",
    items: [
      { name: "Java", slug: "openjdk" },
      { name: "Kotlin", slug: "kotlin" },
      { name: "TypeScript", slug: "typescript" },
      { name: "SQL", fallback: "database" },
    ],
  },
  {
    label: "Backend",
    blurb: "Services, auth and APIs that hold up under load.",
    items: [
      { name: "Spring Boot", slug: "springboot" },
      { name: "Spring Security", slug: "springsecurity" },
      { name: "JPA / Hibernate", slug: "hibernate" },
      { name: "Express", slug: "express" },
      { name: "TypeORM", slug: "typeorm" },
      { name: "JWT", slug: "jsonwebtokens" },
      { name: "Redis", slug: "redis" },
    ],
  },
  {
    label: "Data",
    blurb: "Schemas, migrations and queries I can reason about.",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Supabase", slug: "supabase" },
      { name: "Flyway", slug: "flyway" },
    ],
  },
  {
    label: "AI and automation",
    blurb: "Agents, MCP servers and pipelines with guardrails.",
    items: [
      { name: "Claude API", slug: "claude" },
      { name: "Claude Agent SDK", slug: "anthropic" },
      { name: "MCP", slug: "modelcontextprotocol" },
      { name: "n8n", slug: "n8n" },
      { name: "Vapi", fallback: "phone" },
      { name: "Firecrawl", fallback: "flame" },
      { name: "Apify", fallback: "spider" },
      { name: "RAG", fallback: "sparkle" },
    ],
  },
  {
    label: "Tooling",
    blurb: "How it gets built, tested and shipped.",
    items: [
      { name: "Docker", slug: "docker" },
      { name: "Render", slug: "render" },
      { name: "Maven", slug: "apachemaven" },
      { name: "Git", slug: "git" },
      { name: "OpenAPI", slug: "openapiinitiative" },
      { name: "Jest", slug: "jest" },
      { name: "Apache POI", slug: "apache" },
      { name: "AWS S3", fallback: "cloud" },
      { name: "BullMQ", fallback: "queue" },
      { name: "Pusher", slug: "pusher" },
    ],
  },
  {
    label: "Mobile",
    blurb: "Apps in production on the Play Store and App Store.",
    items: [
      { name: "React Native", slug: "react" },
      { name: "Kotlin (Android)", slug: "android" },
    ],
  },
];

export const frameworks = ["Claude Agent SDK", "Next.js", "n8n", "Spring Boot"] as const;
