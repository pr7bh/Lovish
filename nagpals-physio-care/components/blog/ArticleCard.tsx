import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

interface Props {
  post: BlogPost;
}

export function ArticleCard({ post }: Props) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group h-full flex flex-col rounded-sm border border-beige bg-warm-white overflow-hidden hover:border-gold/40 hover:shadow-md transition-all duration-300">
      {/* Featured image */}
      <div className="aspect-[16/9] bg-beige relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
        />
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        {post.isDraft && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 bg-gold/90 text-white text-[10px] font-sans font-medium tracking-wider uppercase rounded-sm">
              Draft
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-sans font-medium text-gold tracking-wide">
            {post.category}
          </span>
          <span className="text-xs text-muted-text font-sans">{formattedDate}</span>
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
  );
}
