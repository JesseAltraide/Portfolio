import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { GITHUB_PROFILE, LINKEDIN_URL } from "../data";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

const socials = [
  { label: "GitHub", href: GITHUB_PROFILE, Icon: GithubLogo },
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: LinkedinLogo },
];

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-7xl px-5 pb-16 pt-28 md:px-10">
      <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <h2 className="text-4xl font-semibold leading-none tracking-tighter md:col-span-7 md:text-6xl">
          Hiring for backend or AI automation? Let&apos;s talk.
        </h2>
        <div className="flex flex-col items-start gap-5 md:col-span-4 md:col-start-9 md:justify-end">
          <ContactForm />
        </div>
      </Reveal>
      <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-6">
        <p className="font-mono text-xs text-zinc-600">Jesse Altraide</p>
        <ul className="flex items-center gap-2">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition duration-300 hover:-translate-y-0.5 hover:text-accent active:scale-95"
              >
                <Icon size={22} strokeWidth={1.5} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
