export type MilestoneEntry = {
  year: number;
  title: string;
  description?: string;
};

export default function MilestoneTimeline({
  milestones,
}: {
  milestones: MilestoneEntry[];
}) {
  const sorted = [...milestones].sort((a, b) => a.year - b.year);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5 bg-forest/20"
        aria-hidden="true"
      />
      <ol className="space-y-8">
        {sorted.map((m) => (
          <li key={m.year} className="relative flex gap-6 pl-0">
            <div className="flex-none w-8 h-8 rounded-full bg-gold flex items-center justify-center text-xs font-bold text-dark shadow-sm z-10 ring-2 ring-warm-white">
              &#x27;{String(m.year).slice(2)}
            </div>
            <div className="flex-1 pb-2 pt-1">
              <p className="font-bold text-forest">
                {m.year} — {m.title}
              </p>
              {m.description && (
                <p className="text-sm text-dark/70 mt-1">{m.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
