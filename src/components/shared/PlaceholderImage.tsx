/**
 * PlaceholderImage — renders a navy-to-royal gradient with
 * score-line texture and the slot name when an actual image
 * file is missing from /public/images/.
 */

type PlaceholderImageProps = {
  name: string;
  width?: number;
  height?: number;
  className?: string;
};

export function PlaceholderImage({
  name,
  width = 800,
  height = 600,
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-navy to-royal ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
      role="img"
      aria-label={`Placeholder for ${name}`}
    >
      {/* Fluting texture overlay */}
      <div className="absolute inset-0 fluting-texture" />

      {/* Score lines decoration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col gap-[3px] w-24 opacity-30">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="block h-px bg-gold" />
          ))}
        </div>
      </div>

      {/* Slot name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/40 font-sans text-xs font-semibold tracking-[0.2em] uppercase">
          {name}
        </span>
      </div>
    </div>
  );
}
