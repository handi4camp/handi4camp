const stats = [
  { value: "20+", label: "let tradice" },
  { value: "12", label: "dětí ročně" },
  { value: "300 000 Kč", label: "roční náklady" },
  { value: "100%", label: "transparentní" },
];

export default function StatBar() {
  return (
    <div className="bg-warm-white border-y border-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="py-8 px-6 text-center border-r border-dark/10 last:border-r-0"
          >
            <div className="font-serif text-3xl font-bold text-forest">
              {stat.value}
            </div>
            <div className="text-xs text-dark/50 mt-1 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
