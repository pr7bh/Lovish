import type { MetadataRoute } from "next";
import { clinic } from "@/lib/clinic-config";
import { blogPosts } from "@/lib/blog-data";
import { services } from "@/lib/services-data";
import { conditions } from "@/lib/conditions-data";

const BASE = clinic.baseUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/conditions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const conditionPages: MetadataRoute.Sitemap = conditions.map((c) => ({
    url: `${BASE}/conditions/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts
    .filter((p) => !p.isDraft)
    .map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.date).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...servicePages, ...conditionPages, ...blogPages];
}
