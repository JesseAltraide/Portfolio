import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";

interface Props {
  href: string;
  label?: string;
  variant?: "inline" | "button";
}

export function GitHubLink({ href, label = "View on GitHub", variant = "inline" }: Props) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600" aria-disabled="true">
        <GithubLogo size={16} strokeWidth={1.5} /> Repository link pending
      </span>
    );
  }
  const base = "inline-flex items-center gap-2 transition active:-translate-y-px active:scale-[0.98]";
  const styles =
    variant === "button"
      ? "rounded-full border border-white/15 px-5 py-3 text-sm font-medium hover:border-accent hover:text-accent"
      : "font-mono text-xs text-zinc-300 hover:text-accent";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
      <GithubLogo size={variant === "button" ? 18 : 16} strokeWidth={1.5} />
      {label}
      <ArrowUpRight size={14} strokeWidth={1.5} />
    </a>
  );
}
