/**
 * PlaceholderNote — dev-only indicator visible when
 * NEXT_PUBLIC_SHOW_PLACEHOLDERS=true. Marks data that
 * still needs client confirmation.
 */

type PlaceholderNoteProps = {
  field?: string;
};

export function PlaceholderNote({ field }: PlaceholderNoteProps) {
  if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "true") return null;

  return (
    <span className="placeholder-note" title={field ? `Placeholder: ${field}` : "Placeholder value"}>
      ⬡ {field || "TBC"}
    </span>
  );
}
