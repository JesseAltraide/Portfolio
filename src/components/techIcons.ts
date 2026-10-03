import {
  siAndroid,
  siAnthropic,
  siApache,
  siApachemaven,
  siClaude,
  siDocker,
  siExpress,
  siFlyway,
  siGit,
  siHibernate,
  siJest,
  siJsonwebtokens,
  siKotlin,
  siModelcontextprotocol,
  siN8n,
  siOpenapiinitiative,
  siOpenjdk,
  siPostgresql,
  siPusher,
  siReact,
  siRedis,
  siRender,
  siSpringboot,
  siSpringsecurity,
  siSupabase,
  siTypeorm,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
  android: siAndroid,
  anthropic: siAnthropic,
  apache: siApache,
  apachemaven: siApachemaven,
  claude: siClaude,
  docker: siDocker,
  express: siExpress,
  flyway: siFlyway,
  git: siGit,
  hibernate: siHibernate,
  jest: siJest,
  jsonwebtokens: siJsonwebtokens,
  kotlin: siKotlin,
  modelcontextprotocol: siModelcontextprotocol,
  n8n: siN8n,
  openapiinitiative: siOpenapiinitiative,
  openjdk: siOpenjdk,
  postgresql: siPostgresql,
  pusher: siPusher,
  react: siReact,
  redis: siRedis,
  render: siRender,
  springboot: siSpringboot,
  springsecurity: siSpringsecurity,
  supabase: siSupabase,
  typeorm: siTypeorm,
  typescript: siTypescript,
};

const FALLBACK_COLOR = "#ededea";
const MIN_LUMINANCE = 0.3;

function luminance(hex: string): number {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => c / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export interface BrandIcon {
  path: string;
  color: string;
  title: string;
}

export function getBrandIcon(slug: string): BrandIcon | null {
  const icon = icons[slug];
  if (!icon) return null;
  const color = luminance(icon.hex) < MIN_LUMINANCE ? FALLBACK_COLOR : `#${icon.hex}`;
  return { path: icon.path, color, title: icon.title };
}
