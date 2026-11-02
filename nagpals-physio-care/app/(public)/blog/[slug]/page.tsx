import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { AppointmentCTA } from "@/components/shared/AppointmentCTA";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { meta } from "@/lib/seo";

export const instant = false;

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return meta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.relatedSlugs);
  const formattedDate = new Date(post.date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <PageHero
        overline={post.category}
        heading={post.title}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Article content */}
          <article className="lg:col-span-2">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-beige">
              <span className="flex items-center gap-1.5 text-sm text-muted-text font-sans">
                <Clock size={14} />
                {post.readTime}
              </span>
              <span className="text-sm text-muted-text font-sans">{formattedDate}</span>
              {post.isDraft && (
                <span className="px-2.5 py-0.5 bg-gold/15 text-gold text-xs font-sans font-medium rounded-sm">
                  Draft — Pending clinical review
                </span>
              )}
            </div>

            {/* Featured image */}
            <div className="aspect-[16/7] bg-beige rounded-sm overflow-hidden mb-10 relative">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            {/* Content */}
            <AnimateSection>
              <div className="prose-content space-y-10">
                {post.sections.map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <h2 className="font-heading text-2xl lg:text-3xl text-rich-black mb-4">
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        className="text-base text-muted-text leading-relaxed mb-4 last:mb-0"
                      >
                        {p}
                      </p>
                    ))}
                    {section.list && (
                      <ul className="mt-4 space-y-2">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm text-muted-text"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </AnimateSection>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-beige">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-beige text-xs text-muted-text font-sans rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-beige">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-sans text-gold hover:gap-3 transition-all duration-200"
              >
                <ArrowLeft size={14} /> Back to Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AnimateSection from="right">
              <div className="p-6 rounded-sm bg-rich-black">
                <h3 className="font-heading text-xl text-ivory mb-3">
                  Questions About Your Health?
                </h3>
                <p className="text-sm text-ivory/60 leading-relaxed mb-5">
                  A clinical assessment gives you answers specific to your condition.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex w-full h-11 items-center justify-center gap-2 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200"
                >
                  Book Appointment
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </AnimateSection>

            <AnimateSection from="right" delay={0.05}>
              <div className="p-5 rounded-sm border border-beige text-xs text-muted-text font-sans leading-relaxed">
                <strong className="text-rich-black/80">Disclaimer:</strong> The content of this article is for educational purposes only. It does not constitute medical advice. Consult a qualified healthcare professional before making any decisions about your health.
              </div>
            </AnimateSection>
          </aside>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-beige">
            <h2 className="font-heading text-3xl text-rich-black mb-10">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <AppointmentCTA />
    </>
  );
}
