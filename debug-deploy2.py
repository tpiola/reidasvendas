#!/usr/bin/env python3
import urllib.request, json

with open('/opt/data/tokens/vercel-token') as f:
    TOKEN=f.read...Y_ID = 'dpl_GXRikFGCBTz8hgfeMJ98VX86jpn4'
TEAM = 'team_X4bKucsxm1xNovRCzLleI3JC'

url_events = 'https://api.vercel.com/v1/deployments/' + DEPLOY_ID + '/events?limit=50&teamId=' + TEAM
req = urllib.request.Request(url_events, headers={'Authorization': 'Bearer ' + TOKEN})
try:
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read())
    items = data if isinstance(data, list) else data.get('events', data.get('data', []))
    for i, e in enumerate(items):
        txt = e.get('text', '') or e.get('message', '') or ''
        if txt.strip():
            print(str(txt)[:300])
except Exception as ex:
    print('Error: ' + str(ex))
