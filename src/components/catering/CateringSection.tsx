import { MenuBlock } from "./MenuBlock";
import type { CateringSection as CateringSectionType } from "@/data/types";

type CateringSectionProps = {
  section: CateringSectionType;
  index: number;
};

export function CateringSection({ section, index }: CateringSectionProps) {
  return <MenuBlock section={section} index={index} />;
}
