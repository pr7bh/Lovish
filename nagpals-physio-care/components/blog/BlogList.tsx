"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import type { BlogPost } from "@/lib/blog-data";

interface Props {
  posts: BlogPost[];
  categories: string[];
}

export function BlogList({ posts, categories }: Props) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Category filter */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="group"
        aria-label="Filter articles by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`px-4 h-9 rounded-sm text-sm font-sans font-medium transition-colors duration-200 ${
              active === cat
                ? "bg-gold text-white"
                : "bg-ivory border border-beige text-muted-text hover:border-gold hover:text-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article grid */}
      {filtered.length === 0 ? (
        <p className="text-muted-text text-sm py-12 text-center">
          No articles in this category yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
