type ScoreLinesProps = {
  count?: number;
  className?: string;
};

/** A set of 3–5 ultra-thin parallel gold lines — a subtle nod to a musical stave. */
export function ScoreLines({ count = 5, className = "" }: ScoreLinesProps) {
  return (
    <div className={`score-lines ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
