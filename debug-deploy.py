#!/usr/bin/env python3
import urllib.request, json

with open('/opt/data/tokens/vercel-token') as f:
    TOKEN = f.read().strip()

DEPLOY_ID = 'dpl_GXRikFGCBTz8hgfeMJ98VX86jpn4'
TEAM = 'team_X4bKucsxm1xNovRCzLleI3JC'

# Check deploy events for build error
url_events = 'https://api.vercel.com/v1/deployments/' + DEPLOY_ID + '/events?limit=20&teamId=' + TEAM
req = urllib.request.Request(url_events, headers={'Authorization': 'Bearer ' + TOKEN})
try:
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read())
    if isinstance(data, list):
        for e in data:
            txt = e.get('text', '') or e.get('message', '') or str(e)
            print(str(txt)[:200])
    elif isinstance(data, dict):
        for e in data.get('events', data.get('data', [])):
            txt = e.get('text', '') or e.get('message', '') or str(e)
            print(str(txt)[:200])
except Exception as ex:
    print('Events error: ' + str(ex))
