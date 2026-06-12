#!/usr/bin/env python3
"""Generate ALL new AI images for reidasvendas.com.br to replace Unsplash references.

Generates images via OpenAI gpt-image-1, saves to public/imagens/.
"""

import os
import base64
import json
import urllib.request
import urllib.error
import time

API_KEY = os.environ.get("OPENAI_API_KEY")
if not API_KEY:
    raise SystemExit("OPENAI_API_KEY not set")

OUT = "/opt/data/projects/reidasvendas/apps/web/public/imagens"
os.makedirs(OUT, exist_ok=True)

def call_openai(prompt: str, idx: int, label: str) -> bytes:
    """Call OpenAI image generation API and return raw image bytes."""
    url = "https://api.openai.com/v1/images/generations"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}",
    }
    body = json.dumps({
        "model": "gpt-image-1",
        "prompt": prompt,
        "n": 1,
        "size": "1536x1024",
        "quality": "high",
    }).encode()

    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
            b64 = data["data"][0]["b64_json"]
            return base64.b64decode(b64)
    except urllib.error.HTTPError as e:
        err_body = e.read().decode()
        print(f"  ERROR [{label}]: HTTP {e.code} - {err_body[:200]}")
        raise
    except Exception as e:
        print(f"  ERROR [{label}]: {e}")
        raise

def save_image(data: bytes, filename: str):
    path = os.path.join(OUT, filename)
    with open(path, "wb") as f:
        f.write(data)
    print(f"  Saved: {filename} ({len(data)//1024} KB)")
    return path

# ─── ALL IMAGE DEFINITIONS ───────────────────────────────────────────────
# Each: (filename, prompt)
# Ultra-realistic 4K prompts evoking trust, success, professionalism, warmth.

IMAGES = [
    # ── 9 NICHO-SPECIFIC COVER IMAGES ──
    (
        "nicho-estetica-cover.png",
        "Ultra-realistic professional photograph of a modern aesthetics clinic reception area with clean white decor, soft ambient lighting, elegant reception desk with subtle gold accents, fresh flowers, calming beige tones, warm atmosphere, 4K photography, natural light from large windows, luxurious yet welcoming medical spa environment, highly detailed interior design, professional and trustworthy ambiance"
    ),
    (
        "nicho-odontologia-cover.png",
        "Ultra-realistic professional photograph of a modern dental clinic treatment room, sleek dental chair with advanced equipment, clean white and light blue color scheme, soft lighting, large window with natural light, modern minimalist design, dental monitor screen, sterilized instruments visible, professional atmosphere conveying trust and expertise, 4K photography, warm and calming environment"
    ),
    (
        "nicho-personal-cover.png",
        "Ultra-realistic action photograph of a personal trainer assisting a client in a bright modern gym, natural lighting from floor-to-ceiling windows, premium fitness equipment, motivational atmosphere, clean and organized workout space, trainer demonstrating proper form, warm earthy tones and natural colors, 4K photography, sense of energy and achievement"
    ),
    (
        "nicho-restaurante-cover.png",
        "Ultra-realistic professional photograph of an elegant restaurant interior, beautifully set tables with white linen, warm ambient lighting from pendant fixtures, exposed brick or wood elements, soft bokeh in background, culinary atmosphere, cozy yet refined dining experience, 4K photography, rich warm tones of amber and burgundy, inviting and memorable ambiance"
    ),
    (
        "nicho-varejo-cover.png",
        "Ultra-realistic professional photograph of a stylish boutique retail store interior, carefully curated product displays on wooden shelving, warm accent lighting highlighting merchandise, clean modern layout, inviting storefront window visible, premium shopping atmosphere, 4K photography, warm neutral tones with tasteful pops of color, organized and appealing merchandising"
    ),
    (
        "nicho-imobiliaria-cover.png",
        "Ultra-realistic architectural photograph of a luxury modern living room with floor-to-ceiling windows overlooking a city skyline, contemporary furniture, marble and wood finishes, elegant decor, spacious open layout, warm sunset light streaming in, premium real estate showcase, 4K photography, sophisticated and aspirational atmosphere"
    ),
    (
        "nicho-advocacia-cover.png",
        "Ultra-realistic professional photograph of a sophisticated law office with rich wood paneling, floor-to-ceiling bookshelves filled with legal volumes, a distinguished mahogany desk, leather chairs, soft warm lighting from classic desk lamp, large windows with city view, traditional yet modern legal atmosphere, 4K photography, conveys authority, trust, and expertise"
    ),
    (
        "nicho-educacao-cover.png",
        "Ultra-realistic photograph of a modern sunlit classroom or learning space, students engaged with digital tablets and notebooks, bright airy room with large windows, modern furniture in warm wood tones, plants and educational materials, collaborative learning atmosphere, 4K photography, warm and inspiring educational environment"
    ),
    (
        "nicho-servicos-cover.png",
        "Ultra-realistic professional photograph of a modern consulting firm meeting room, professionals shaking hands over a glass table, minimalist white and wood interior, large windows with city view, laptops and documents on table, confident business interaction, warm natural lighting, 4K photography, conveys trust, partnership and success in B2B environment"
    ),

    # ── 9 NICHO-SPECIFIC GALLERY/SECONDARY IMAGES ──
    (
        "nicho-estetica-gallery.png",
        "Ultra-realistic photograph of a skincare treatment room, aesthetician performing a facial treatment on a relaxed client, soft pastel decor, professional skincare equipment, calming blue LED lighting accents, serene spa atmosphere, white clean linens, 4K photography, warm and caring professional environment"
    ),
    (
        "nicho-odontologia-gallery.png",
        "Ultra-realistic photograph of a dentist and assistant performing a dental procedure, focused professional atmosphere, modern dental equipment, blue surgical masks and gloves, patient comfortable in chair, advanced dental technology visible, clean clinical environment, 4K photography, conveys expertise and gentle care"
    ),
    (
        "nicho-personal-gallery.png",
        "Ultra-realistic photograph of a fitness studio with clients doing functional training, kettlebells and resistance bands, energetic atmosphere, mirrored walls, rubber flooring, motivational posters, natural light, diverse group of people exercising, 4K photography, sense of community and healthy lifestyle"
    ),
    (
        "nicho-restaurante-gallery.png",
        "Ultra-realistic close-up food photography of a beautifully plated gourmet dish on a ceramic plate, herbs and sauce drizzle artfully arranged, warm ambient restaurant background with soft bokeh, candles and wine glasses visible, culinary artistry, 4K photography, mouthwatering and elegant presentation"
    ),
    (
        "nicho-varejo-gallery.png",
        "Ultra-realistic photograph of a customer being helped by a friendly sales associate in a modern clothing boutique, racks of curated fashion in background, warm retail lighting, smile and positive interaction, organized displays, 4K photography, excellent customer service atmosphere"
    ),
    (
        "nicho-imobiliaria-gallery.png",
        "Ultra-realistic photograph of a stunning modern kitchen with marble island, stainless steel appliances, pendant lighting, open shelving with curated items, large window overlooking garden, bright natural light, premium finishes, 4K photography, dream home atmosphere"
    ),
    (
        "nicho-advocacia-gallery.png",
        "Ultra-realistic photograph of a lawyer reviewing documents in a modern law library, floor-to-ceiling windows, warm wood shelves, focused professional atmosphere, legal documents and a tablet on a sleek table, soft natural lighting, 4K photography, conveys diligence and expertise"
    ),
    (
        "nicho-educacao-gallery.png",
        "Ultra-realistic photograph of a teacher helping a student at a modern desk, interactive digital whiteboard in background, bright colorful classroom, learning materials, engaged and supportive atmosphere, natural light from windows, 4K photography, inspiring educational moment"
    ),
    (
        "nicho-servicos-gallery.png",
        "Ultra-realistic photograph of a business team collaborating around a table with laptops and documents, whiteboard with strategic diagrams in background, modern office with plants and natural light, diverse professionals engaged in discussion, 4K photography, innovative and productive workplace"
    ),

    # ── 3 HERO IMAGES ──
    (
        "hero-home.png",
        "Ultra-realistic wide-angle photograph of a modern Brazilian professional workplace, diverse team of young professionals collaborating in a bright sunlit office, floor-to-ceiling windows with city view, laptop screens visible, plants and modern decor, warm golden hour light, 4K photography, aspirational and successful business atmosphere, warm color palette of gold and teal"
    ),
    (
        "hero-about.png",
        "Ultra-realistic photograph of a successful Brazilian entrepreneur working on a laptop in a modern coffee shop, warm ambient lighting, genuine smile, professional casual attire, plants and warm wood interior, creative and determined expression, 4K photography, authentic and inspiring startup culture vibe"
    ),
    (
        "hero-blog.png",
        "Ultra-realistic photograph of a stylish modern workspace with a laptop displaying analytics charts, notebook and coffee cup on wooden desk, warm desk lamp, plants in background, soft natural window light, creative and productive atmosphere, 4K photography, content creator and digital business vibe"
    ),

    # ── 2 ABOUT IMAGES ──
    (
        "about-mission.png",
        "Ultra-realistic photograph of a close-knit team huddle in a modern office, diverse professionals sharing a positive moment, genuine smiles and body language, warm natural light from windows, contemporary office design with plants, 4K photography, authentic company culture, team unity and shared purpose"
    ),
    (
        "about-story.png",
        "Ultra-realistic photograph of a Brazilian entrepreneur looking confidently at the camera, standing in front of a modern office building exterior, golden hour lighting, professional attire, warm genuine expression, urban professional setting, 4K photography, conveys leadership and vision"
    ),

    # ── 2 BLOG IMAGES ──
    (
        "blog-marketing.png",
        "Ultra-realistic photograph of a digital marketing workspace, laptop with colorful analytics dashboard, notebook with handwritten notes, desk accessories, warm ambient lighting, coffee cup, plants, creative clutter organized, 4K photography, productive content creation atmosphere"
    ),
    (
        "blog-technology.png",
        "Ultra-realistic photograph of a developer or tech professional working on a modern laptop in a bright contemporary space, dual monitors, code on screen, warm atmosphere, plants and clean desk, glasses and coffee, focused expression, 4K photography, modern technology workspace"
    ),
]

def main():
    total = len(IMAGES)
    print(f"Generating {total} images...\n")

    for i, (filename, prompt) in enumerate(IMAGES, 1):
        label = f"{i}/{total}"
        print(f"[{label}] {filename}")
        # Rate limit: small delay between calls
        if i > 1:
            time.sleep(2)
        try:
            img_data = call_openai(prompt, i, filename)
            save_image(img_data, filename)
        except Exception as e:
            print(f"  FAILED: {e}")
            # Continue with next image
            continue
        print()

    print(f"\nDone! Images saved to {OUT}")

if __name__ == "__main__":
    main()
