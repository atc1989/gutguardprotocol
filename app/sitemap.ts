import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const staticRoutes = ["", "/legal", "/privacy", "/science", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    changeFrequency: route === "" ? "weekly" : "monthly",
    lastModified,
    priority: route === "" ? 1 : 0.7,
    url: `${siteConfig.siteUrl}${route}`,
  }));
}
