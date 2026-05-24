# Vídeo hero (opcional)

Coloque aqui um clip **10–15 s**, sem áudio, otimizado:

- `hero.webm` (preferencial, VP9)
- `hero.mp4` (H.264, fallback)
- `hero-poster.webp` (frame estático, LCP)

O site detecta `hero.mp4` via `HEAD` e usa na Home antes da rotação Pexels.

Compressão sugerida: `ffmpeg -i entrada.mp4 -an -t 12 -vf scale=1920:-2 -c:v libvpx-vp9 -b:v 1.2M hero.webm`
