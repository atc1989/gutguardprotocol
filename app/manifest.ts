import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#fbfaf7",
    categories: ["health", "medical", "wellness"],
    description: siteConfig.description,
    display: "standalone",
    lang: "en-PH",
    name: siteConfig.name,
    short_name: "GutGuard",
    start_url: "/",
    theme_color: "#0a0a0a",
  };
}
