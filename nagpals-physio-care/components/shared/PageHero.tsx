import { Breadcrumb, type BreadcrumbItem } from "@/components/shared/Breadcrumb";

interface Props {
  overline?: string;
  heading: string;
  description?: string;
  breadcrumb: BreadcrumbItem[];
}

export function PageHero({ overline, heading, description, breadcrumb }: Props) {
  return (
    <div className="bg-ivory border-b border-beige pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <Breadcrumb items={breadcrumb} />
        {overline && (
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="text-xs font-sans font-medium tracking-widest text-gold uppercase">
              {overline}
            </span>
          </div>
        )}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-rich-black leading-tight tracking-tight max-w-3xl">
          {heading}
        </h1>
        {description && (
          <p className="mt-5 text-base md:text-lg text-muted-text leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
