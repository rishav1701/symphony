"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const pathname = usePathname();

  // Hide on book-now page to avoid collision with sticky action area
  if (pathname === "/book-now") return null;

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 wa-pulse"
      aria-label="Chat on WhatsApp"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <MessageCircle size={24} fill="currentColor" />
    </a>
  );
}
