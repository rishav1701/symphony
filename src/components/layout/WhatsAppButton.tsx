"use client";

import { usePathname } from "next/navigation";
import { contactInfo } from "@/data/contact";

export function WhatsAppButton() {
  const pathname = usePathname();

  // Hide on book-now page to avoid collision with sticky action area
  if (pathname === "/book-now") return null;

  return (
    <a
      href={`https://wa.me/${contactInfo.whatsapp}`}
      target="_blank"
      rel="noopener"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 wa-pulse"
      aria-label="Contact us on WhatsApp"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <svg
        viewBox="0 0 448 512"
        width="25"
        height="29"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M380.9 97.1A222.6 222.6 0 0 0 223.9 32C101.4 32 1.7 131.6 1.7 254.1c0 39.1 10.2 77.3 29.5 110.9L0 480l117.8-30.9a222.6 222.6 0 0 0 106.1 27h.1c122.4 0 222.2-99.7 222.2-222.2a221 221 0 0 0-65.3-156.8ZM223.9 438.7h-.1a184.6 184.6 0 0 1-94-25.5l-6.7-4-69.9 18.3 18.7-68.2-4.4-7a184.2 184.2 0 0 1-28.2-98.2c0-101.7 82.9-184.5 184.7-184.5a183.4 183.4 0 0 1 130.7 54.2 183.4 183.4 0 0 1 54 130.8c0 101.7-82.9 184.5-184.8 184.5Zm101.3-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.5 21.7-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.2 59.8 94.9 83.9 35.3 15.2 49.1 16.5 66.7 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.3-5-3.7-10.6-6.5Z" />
      </svg>
    </a>
  );
}
