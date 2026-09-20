import type { ContactInfo } from "./types";

export const contactInfo: ContactInfo = {
  phone: "+91 00000 00000",
  email: "hello@symphonyconventioncentre.com",
  address: "Chemmanthoor, Punalur, Kollam, Kerala, India",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "910000000000",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Symphony+Convention+Centre,+Chemmanthoor,+Punalur,+Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapLinkUrl: "https://maps.google.com/?q=Symphony+Convention+Centre+Chemmanthoor+Punalur+Kerala",
  hours: "Open daily · 9 AM – 9 PM",
  placeholder: false,
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/", icon: "Instagram" },
    { platform: "Facebook", url: "https://facebook.com/", icon: "Facebook" },
    { platform: "YouTube", url: "https://youtube.com/", icon: "Youtube" },
  ],
};
