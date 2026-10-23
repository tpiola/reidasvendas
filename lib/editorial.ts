import content from '@/data/content.json';
import subscriptionArticles from '@/data/subscription-articles.json';
/** Versioned content collection; a CMS adapter can preserve this public contract. */
export const articles = [...subscriptionArticles, ...content.articles];
export type EditorialArticle = (typeof articles)[number];
