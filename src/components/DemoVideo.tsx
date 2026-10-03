import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "@phosphor-icons/react";

interface Props {
  title: string;
  shareUrl: string;
}

function toEmbedUrl(shareUrl: string): string {
  return shareUrl.replace("/share/", "/embed/");
}

export function DemoVideo({ title, shareUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent active:-translate-y-px active:scale-[0.98]"
      >
        {isOpen ? <X size={16} strokeWidth={1.5} /> : <Play size={16} weight="fill" />}
        {isOpen ? "Close demo" : "Watch demo"}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
          >
            <iframe
              src={toEmbedUrl(shareUrl)}
              title={`${title} demo video`}
              allow="fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
