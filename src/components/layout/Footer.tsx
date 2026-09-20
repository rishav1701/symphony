import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { ScoreLines } from "@/components/shared/ScoreLines";
import { Container } from "@/components/shared/Container";

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="currentColor">
          <path d="M13.5 21v-8h2.5l.5-3h-3V7.5c0-.9.4-1.5 1.5-1.5H16V3.1c-.3-.1-1.2-.1-2.3-.1-2.3 0-4.2 1.3-4.2 4.2V10H7v3h2.5v8h4Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="currentColor">
          <path d="M21.4 7.3a2.8 2.8 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.4.3a2.8 2.8 0 0 0-2 2A29.4 29.4 0 0 0 2.5 12a29.4 29.4 0 0 0 .1 4.7 2.8 2.8 0 0 0 2 2c1.5.3 7.4.3 7.4.3s5.9 0 7.4-.3a2.8 2.8 0 0 0 2-2A29.4 29.4 0 0 0 21.5 12a29.4 29.4 0 0 0-.1-4.7ZM10 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Score-line divider above footer */}
      <div className="py-8">
        <ScoreLines />
      </div>

      <footer
        className="bg-navy fluting-texture text-white/70"
        role="contentinfo"
        data-dark
      >
        <Container>
          <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex flex-col gap-[2px] w-4" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="block h-px bg-gold/50" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-semibold tracking-[0.18em] text-white leading-none">
                    SYMPHONY
                  </span>
                  <span className="font-sans text-[8px] font-medium tracking-[0.25em] uppercase text-white/50 mt-0.5">
                    CONVENTION CENTRE
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                {siteConfig.description}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-white mb-6">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navLinks.filter(l => !l.isCta).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-gold transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-white mb-6">
                Contact
              </h3>
              <div className="space-y-3 text-sm">
                <p>{contactInfo.phone}</p>
                <p>{contactInfo.email}</p>
                <p>{contactInfo.hours}</p>
              </div>
            </div>

            {/* Location + Social */}
            <div>
              <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-white mb-6">
                Location
              </h3>
              <p className="text-sm mb-6">{contactInfo.address}</p>

              <div className="flex gap-4">
                {contactInfo.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener"
                    className="flex flex-col items-center gap-2 text-white/50 hover:text-gold transition-colors"
                    aria-label={social.platform}
                  >
                    <span className="w-12 h-12 flex items-center justify-center rounded border border-white/20 hover:border-gold/40 transition-colors">
                      <SocialIcon platform={social.platform} />
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em]">
                      {social.platform}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
            © {year} {siteConfig.name}. All rights reserved.
          </div>
        </Container>
      </footer>
    </>
  );
}
