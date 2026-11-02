interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
  accent?: boolean;
}

export function MetricCard({ title, value, subtitle, accent }: MetricCardProps) {
  return (
    <div
      className={`rounded-sm border p-5 ${
        accent
          ? "bg-gold text-white border-gold"
          : "bg-white border-beige"
      }`}
    >
      <p className={`text-xs font-sans font-semibold uppercase tracking-widest mb-1 ${accent ? "text-white/80" : "text-muted-text"}`}>
        {title}
      </p>
      <p className={`font-heading text-4xl font-light ${accent ? "text-white" : "text-rich-black"}`}>
        {value}
      </p>
      {subtitle && (
        <p className={`text-xs mt-1 ${accent ? "text-white/70" : "text-muted-text"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
