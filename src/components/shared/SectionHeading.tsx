import { Eyebrow } from "./Eyebrow";
import { clsx } from "clsx";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  onDark?: boolean;
  centered?: boolean;
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  onDark = false,
  centered = false,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mb-12 md:mb-16",
        centered && "text-center",
        className
      )}
    >
      <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={clsx(
          "mt-4",
          onDark && "text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-4 text-lg leading-relaxed",
            onDark ? "text-white/70" : "text-muted",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
