const stats = [
  { value: "20+", label: "let tradice" },
  { value: "12", label: "dětí ročně" },
  { value: "300 000 Kč", label: "roční náklady" },
  { value: "100%", label: "transparentní" },
];

export default function StatBar() {
  return (
    <div className="bg-dark/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="py-4 px-6 text-center text-warm-white border-r border-warm-white/10 last:border-r-0"
          >
            <div className="font-serif text-2xl font-bold text-gold">
              {stat.value}
            </div>
            <div className="text-xs text-warm-white/70 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
