import base64, json, os, sys, urllib.request, urllib.error

# Base directory
BASE = "/opt/data/projects/reidasvendas/apps/web"
os.chdir(BASE)

# Read token
with open("/opt/data/tokens/vercel-token", "r") as f:
    TOKEN = f.read().strip()

# Read vercel.json
with open("vercel.json", "r") as f:
    vercel_config = json.load(f)

files = []
total_bytes = 0

def add_file(filepath, content_bytes):
    global total_bytes
    total_bytes += len(content_bytes)
    files.append({
        "file": filepath,
        "data": base64.b64encode(content_bytes).decode("utf-8"),
        "encoding": "base64"
    })

# 1. Core config files
with open("vercel.json", "rb") as f:
    add_file("vercel.json", f.read())

with open("package.json", "rb") as f:
    add_file("package.json", f.read())

# 2. Static files from dist/
DIST = "dist"
for root, dirs, fnames in os.walk(DIST):
    for fname in fnames:
        full_path = os.path.join(root, fname)
        rel_path = os.path.relpath(full_path, ".")
        with open(full_path, "rb") as f:
            add_file(rel_path, f.read())

# 3. API functions (compiled JS)
API = "api"
for fname in os.listdir(API):
    if fname.endswith(".js"):
        full_path = os.path.join(API, fname)
        with open(full_path, "rb") as f:
            add_file(f"api/{fname}", f.read())

print(f"📦 {len(files)} files, {total_bytes/1024/1024:.1f} MB", file=sys.stderr)

# Build deployment payload
payload = {
    "name": "reidasvendas",
    "files": files,
    "projectSettings": {
        "framework": None,
        "outputDirectory": "dist",
        "nodeVersion": "22.x"
    },
    "target": "production"
}

# Send to Vercel API
import urllib.request

req = urllib.request.Request(
    "https://api.vercel.com/v13/deployments",
    data=json.dumps(payload).encode("utf-8"),
    headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    },
    method="POST"
)

try:
    with urllib.request.urlopen(req, timeout=300) as resp:
        result = json.loads(resp.read())
        url = result.get("url", "?")
        deploy_id = result.get("id", "?")
        print(f"✅ Deploy concluído!")
        print(f"  URL: https://{url}")
        print(f"  Inspect: https://vercel.com/thiagoso/reidasvendas/{deploy_id}")
except urllib.error.HTTPError as e:
    body = e.read().decode("utf-8")[:500]
    print(f"❌ HTTP {e.code}: {body}")
    sys.exit(1)
except Exception as e:
    print(f"❌ Erro: {e}")
    sys.exit(1)
