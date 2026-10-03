import { useEffect, useState, type ComponentType } from "react";
import { Briefcase, EnvelopeSimple, FolderSimple, House, Wrench, type IconProps } from "@phosphor-icons/react";

interface NavItem {
  id: string;
  label: string;
  Icon: ComponentType<IconProps>;
}

const items: NavItem[] = [
  { id: "top", label: "Home", Icon: House },
  { id: "work", label: "Projects", Icon: FolderSimple },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "stack", label: "Skills", Icon: Wrench },
  { id: "contact", label: "Contact", Icon: EnvelopeSimple },
];

export function FloatingNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-900/70 px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
    >
      <ul className="flex items-center gap-1">
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="group relative">
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:bg-white/10 active:scale-95 md:h-12 md:w-12 ${
                  isActive ? "bg-white/10 text-accent" : "text-paper"
                }`}
              >
                <Icon size={22} strokeWidth={1.5} />
              </a>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 font-mono text-xs text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
