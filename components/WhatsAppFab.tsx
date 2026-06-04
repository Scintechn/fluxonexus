"use client";
import { track } from "@vercel/analytics";
import { whatsappLink } from "@/lib/business";

export function WhatsAppFab({ message }: { message: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      onClick={() => track("whatsapp_click", { location: "fab" })}
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_36px_-8px_rgb(37_211_102/0.6)] transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:h-16 sm:w-16"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12.05 0C5.5 0 .2 5.3.19 11.83a11.78 11.78 0 0 0 1.6 5.96L0 24l6.4-1.67a11.86 11.86 0 0 0 5.65 1.43h.01c6.55 0 11.85-5.3 11.86-11.83a11.74 11.74 0 0 0-3.4-8.45zM12.06 21.8a9.92 9.92 0 0 1-5.05-1.38l-.36-.21-3.8.99 1.02-3.7-.24-.38a9.85 9.85 0 0 1-1.52-5.29c0-5.45 4.45-9.88 9.93-9.88 2.65 0 5.14 1.03 7.02 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.45-4.45 9.96-9.9 9.96zm5.43-7.42c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.15c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.51l-.57-.01a1.1 1.1 0 0 0-.8.37c-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}
