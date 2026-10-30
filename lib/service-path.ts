/** One public URL per service intent; legacy URLs redirect in next.config.ts. */
export function servicePath(slug: string) {
  return slug === 'seo-local-franca'
    ? '/seo-local-franca'
    : '/servicos/' + slug;
}
