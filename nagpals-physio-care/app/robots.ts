import type { MetadataRoute } from "next";
import { clinic } from "@/lib/clinic-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${clinic.baseUrl}/sitemap.xml`,
  };
}
