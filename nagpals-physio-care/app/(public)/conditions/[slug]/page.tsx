import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ConditionDetail } from "@/components/conditions/ConditionDetail";
import { conditions, getConditionBySlug } from "@/lib/conditions-data";
import { meta } from "@/lib/seo";

export const instant = false;

export async function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/conditions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) return {};
  return meta({
    title: `${condition.title} — Physiotherapy Treatment`,
    description: `Understand ${condition.title.toLowerCase()}: symptoms, causes, and how physiotherapy at Nagpal's Physio Care can support your recovery.`,
    path: `/conditions/${slug}`,
  });
}

export default async function ConditionPage({
  params,
}: PageProps<"/conditions/[slug]">) {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) notFound();

  return (
    <>
      <PageHero
        overline="Conditions We Treat"
        heading={condition.title}
        description={condition.shortDescription}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: condition.title, href: `/conditions/${slug}` },
        ]}
      />
      <ConditionDetail condition={condition} />
    </>
  );
}
