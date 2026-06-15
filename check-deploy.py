#!/usr/bin/env python3
import urllib.request, json

with open('/opt/data/tokens/vercel-token') as f:
    TOKEN = f.read().strip()
DEPLOY_ID = 'dpl_5scDAHaJvSznhdn9MS89c41jZ5gP'
TEAM = 'team_X4bKucsxm1xNovRCzLleI3JC'

# Check deploy status
url = f'https://api.vercel.com/v13/deployments/{DEPLOY_ID}?teamId={TEAM}'
req = urllib.request.Request(url, headers={'Authorization': f'Bearer {TOKEN}'})
try:
    resp = urllib.request.urlopen(req)
    d = json.loads(resp.read())
    print(f'Estado: {d.get("readyState","?")}')
    print(f'URL: {d.get("url","?")}')
    err = d.get('error',{})
    if err:
        print(f'Erro: {json.dumps(err, indent=2)}')
except Exception as e:
    print(f'Error: {e}')

# Check events
url2 = f'https://api.vercel.com/v1/deployments/{DEPLOY_ID}/events?limit=10&teamId={TEAM}'
req2 = urllib.request.Request(url2, headers={'Authorization': f'Bearer {TOKEN}'})
try:
    resp2 = urllib.request.urlopen(req2)
    events = json.loads(resp2.read())
    for e in events.get('events',[]):
        print(f"  [{e.get('type','?')}] {str(e.get('text',''))[:200]}")
except Exception as e2:
    print(f'Events: {e2}')
