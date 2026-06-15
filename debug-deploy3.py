#!/usr/bin/env python3
import urllib.request, json

f = open('/opt/data/tokens/vercel-token')
TOKEN = f.read().strip()
f.close()

DEPLOY_ID = 'dpl_GXRikFGCBTz8hgfeMJ98VX86jpn4'
TEAM = 'team_X4bKucsxm1xNovRCzLleI3JC'

url = 'https://api.vercel.com/v1/deployments/' + DEPLOY_ID + '/events?limit=50&teamId=' + TEAM
req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + TOKEN})
resp = urllib.request.urlopen(req)
data = json.loads(resp.read())
items = data if isinstance(data, list) else data.get('events', data.get('data', []))
for e in items:
    txt = e.get('text', '') or e.get('message', '') or ''
    if txt.strip():
        print(str(txt)[:300])
