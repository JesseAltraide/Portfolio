import { useState } from "react";

interface Props {
  title: string;
  shareUrl: string;
  poster?: string;
}

function toEmbedUrl(shareUrl: string): string {
  return `${shareUrl.replace("/share/", "/embed/")}?hideEmbedTopBar=true&hide_owner=true&hide_share=true`;
}

export function DemoVideo({ title, shareUrl, poster }: Props) {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
      <iframe
        src={toEmbedUrl(shareUrl)}
        title={`${title} demo video`}
        loading="eager"
        allow="fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setIsReady(true)}
        className="absolute inset-0 h-full w-full"
      />

      {!isReady && (
        <div role="status" className="absolute inset-0 flex items-center justify-center bg-zinc-950">
          {poster && (
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          )}
          <span className="shimmer-sweep absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="relative font-mono text-xs uppercase tracking-widest text-zinc-300">Loading demo...</span>
        </div>
      )}
    </div>
  );
}
