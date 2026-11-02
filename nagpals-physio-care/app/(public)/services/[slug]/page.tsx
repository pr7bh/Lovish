import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { services, getServiceBySlug, getRelatedServices } from "@/lib/services-data";
import { meta } from "@/lib/seo";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return meta({
    title: service.title,
    description: `${service.shortDescription} Learn about ${service.title.toLowerCase()} at Nagpal's Physio Care.`,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedServices = getRelatedServices(service.relatedSlugs);

  return (
    <>
      <PageHero
        overline="Services"
        heading={service.title}
        description={service.shortDescription}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${slug}` },
        ]}
      />
      <ServiceDetail service={service} relatedServices={relatedServices} />
    </>
  );
}
