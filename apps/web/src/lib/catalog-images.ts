/** Imagens do catálogo — WebP em alta resolução para telas retina */

export function catalogCover(photoId: string, width = 1920, height = 1080): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=90&fm=webp`;
}

export function catalogThumb(photoId: string): string {
  return catalogCover(photoId, 960, 540);
}
