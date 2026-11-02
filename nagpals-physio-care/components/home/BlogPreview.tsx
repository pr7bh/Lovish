import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { blogPosts } from "@/lib/blog-data";

const posts = blogPosts.slice(0, 3);

export default function BlogPreview() {
  return (
    <section id="blog" className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <AnimateSection from="left" className="max-w-xl">
            <SectionHeader
              overline="From the Clinic"
              heading="Health & Rehab Insights"
              description="Expert articles on physiotherapy, injury prevention, and movement health."
              centered={false}
            />
          </AnimateSection>
          <AnimateSection from="right">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-sans text-gold hover:gap-3 transition-all duration-200 shrink-0"
            >
              View All Articles
              <ArrowRight size={15} />
            </Link>
          </AnimateSection>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <AnimateSection key={post.slug} delay={i * 0.1}>
              <article className="group h-full flex flex-col rounded-sm border border-beige bg-ivory overflow-hidden hover:border-gold/40 hover:shadow-md transition-all duration-300">
                <Link href={`/blog/${post.slug}`} className="block aspect-[16/9] bg-beige relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-sans font-medium text-gold tracking-wide">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-text font-sans">
                      {new Date(post.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-rich-black leading-snug mb-3 group-hover:text-gold transition-colors duration-200">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-text leading-relaxed flex-1 mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-muted-text font-sans">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-sans text-gold flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
                    >
                      Read More <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            </AnimateSection>
          ))}
        </div>
      </div>
    </section>
  );
}
