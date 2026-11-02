import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { BlogList } from "@/components/blog/BlogList";
import { blogPosts, categories } from "@/lib/blog-data";
import { meta } from "@/lib/seo";

export const metadata: Metadata = meta({
  title: "Health & Rehab Blog",
  description:
    "Expert articles on physiotherapy, injury prevention, rehabilitation, and movement health from Nagpal's Physio Care.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        overline="From the Clinic"
        heading="Health & Rehab Insights"
        description="Expert articles on physiotherapy, injury prevention, and movement health — written to inform, not to alarm."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-6 px-4 py-3 rounded-sm bg-gold/10 border border-gold/20">
          <p className="text-xs font-sans text-gold">
            <strong>Note:</strong> All articles are currently draft content pending review and approval by Dr. Lovish Nagpal before publication.
          </p>
        </div>

        <BlogList posts={blogPosts} categories={categories} />
      </div>
    </>
  );
}
