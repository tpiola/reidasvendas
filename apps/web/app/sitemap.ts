import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  return [
    { url:base, lastModified:new Date(), changeFrequency:"weekly", priority:1 },
    { url:`${base}/politica-de-privacidade`, lastModified:new Date(), changeFrequency:"monthly", priority:.3 },
    { url:`${base}/termos-de-uso`, lastModified:new Date(), changeFrequency:"monthly", priority:.3 },
  ];
}
