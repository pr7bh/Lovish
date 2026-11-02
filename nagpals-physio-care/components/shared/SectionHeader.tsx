import { cn } from "cn";

interface Props {
  overline?: string;
  heading: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  overline,
  heading,
  description,
  centered = true,
  className,
}: Props) {
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      {overline && (
        <div
          className={cn(
            "flex items-center gap-3 mb-5",
            centered && "justify-center"
          )}
        >
          <span className="w-8 h-px bg-gold" />
          <span className="text-xs font-sans font-medium tracking-widest text-gold uppercase">
            {overline}
          </span>
          <span className="w-8 h-px bg-gold" />
        </div>
      )}
      <h2 className="font-heading text-4xl lg:text-5xl text-rich-black leading-tight tracking-tight">
        {heading}
      </h2>
      {description && (
        <p className="mt-5 text-base text-muted-text leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
