"""Create content-addressed AVIF variants without changing the original WebP files.
Requires Pillow >= 11.3 with AVIF support: python -m pip install 'Pillow>=11.3'.
Run from any directory: python scripts/portfolio-media.py.
"""
from hashlib import sha256
from json import dumps
from pathlib import Path
from PIL import Image, features

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "apps/web/public/imagens/portfolio"
if not features.check("avif"):
    raise SystemExit("Pillow precisa de suporte AVIF. Os originais não foram alterados.")
manifest = {}
for source in sorted(MEDIA.glob("*.webp")):
    digest = sha256(source.read_bytes() + b"avif-quality60-speed6-v2").hexdigest()[:8]
    output = source.with_name(f"{source.stem}-{digest}.avif")
    if not output.exists():
        with Image.open(source) as image:
            image.convert("RGB").save(output, format="AVIF", quality=60, speed=6)
    manifest[f"/imagens/portfolio/{source.name}"] = f"/imagens/portfolio/{output.name}"
(ROOT / "apps/web/src/lib/portfolio-media.json").write_text(dumps(manifest, indent=2) + "\n")
print(dumps({"variants": len(manifest), "bytes": sum((ROOT / "apps/web/public" / path.lstrip("/")).stat().st_size for path in manifest.values())}))
