import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { ScoreLines } from "@/components/shared/ScoreLines";
import { Container } from "@/components/shared/Container";

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
                    AUDITORIUM
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
                    className="w-10 h-10 flex items-center justify-center rounded border border-white/20 text-white/50 hover:text-gold hover:border-gold/40 transition-colors"
                    aria-label={social.platform}
                  >
                    <span className="text-xs font-bold">
                      {social.platform[0]}
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
