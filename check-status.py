#!/usr/bin/env python3
import urllib.request, json

with open('/opt/data/tokens/vercel-token') as f:
    TOKEN = f.read().strip()
DEPLOY_ID = 'dpl_AJmUPTB5857SDnhffJ1cZx8XcuX4'
TEAM = 'team_X4bKucsxm1xNovRCzLleI3JC'

url = 'https://api.vercel.com/v13/deployments/' + DEPLOY_ID + '?teamId=' + TEAM
req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + TOKEN})
resp = urllib.request.urlopen(req)
d = json.loads(resp.read())
print('Estado:', d.get('readyState', '?'))
print('URL:', d.get('url', '?'))
aliases = d.get('alias', [])
if aliases:
    print('Aliases:', aliases)
err = d.get('error', {})
if err:
    print('Error:', err)
