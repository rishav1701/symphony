import type { EventType } from "./types";

export const eventTypes: EventType[] = [
  { id: "et-wedding", label: "Wedding", queryValue: "wedding" },
  { id: "et-reception", label: "Reception", queryValue: "reception" },
  { id: "et-corporate", label: "Corporate Event", queryValue: "corporate-event" },
  { id: "et-cultural", label: "Cultural Event", queryValue: "cultural-event" },
  { id: "et-conference", label: "Conference", queryValue: "conference" },
  { id: "et-birthday", label: "Birthday", queryValue: "birthday" },
  { id: "et-other", label: "Other", queryValue: "other" },
];
