#!/usr/bin/env python3
"""Trigger Vercel deployment"""
import urllib.request, json

TOKEN = open('/opt/data/tokens/vercel-token').read().strip()

data = json.dumps({
    "name": "v0-rei-das-vendas",
    "project": "v0-rei-das-vendas",
    "target": "production",
    "gitSource": {
        "type": "github",
        "ref": "main",
        "repoId": 1225826736
    }
}).encode()

url = "https://api.vercel.com/v13/deployments?teamId=team_X4bKucsxm1xNovRCzLleI3JC"
req = urllib.request.Request(url, data=data, headers={
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
})

try:
    resp = urllib.request.urlopen(req)
    result = json.loads(resp.read())
    print(f"✅ Deploy: {result['id']} | {result.get('url','?')} | state: {result.get('readyState','?')}")
except urllib.error.HTTPError as e:
    err = json.loads(e.read())
    print(f"❌ {err.get('error',{}).get('message','?')} (code: {err.get('error',{}).get('code','?')})")
except Exception as e:
    print(f"❌ {e}")
