import type { ContactInfo } from "./types";

export const contactInfo: ContactInfo = {
  phone: "+91 00000 00000",
  email: "hello@symphonyauditorium.example",
  address: "Address to be confirmed, Kerala, India",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "910000000000",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.5!2d76.3!3d10.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAwJzAwLjAiTiA3NsKwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1",
  mapLinkUrl: "https://maps.google.com/?q=Kerala,India",
  hours: "Open daily · 9 AM – 9 PM",
  placeholder: true,
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/", icon: "Instagram" },
    { platform: "Facebook", url: "https://facebook.com/", icon: "Facebook" },
    { platform: "YouTube", url: "https://youtube.com/", icon: "Youtube" },
  ],
};
