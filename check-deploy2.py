#!/usr/bin/env python3
import urllib.request, json

with open('/opt/data/tokens/vercel-token') as f:
    TOKEN = f.read().strip()

DEPLOY_ID = 'dpl_GXRikFGCBTz8hgfeMJ98VX86jpn4'
TEAM = 'team_X4bKucsxm1xNovRCzLleI3JC'

url = 'https://api.vercel.com/v13/deployments/' + DEPLOY_ID + '?teamId=' + TEAM
req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + TOKEN})
try:
    resp = urllib.request.urlopen(req)
    d = json.loads(resp.read())
    print('Estado: ' + d.get('readyState','?'))
    print('URL: ' + d.get('url','?'))
    alias = d.get('alias',[])
    if alias:
        print('Aliases: ' + str(alias))
    err = d.get('error',{})
    if err:
        print('Error detail: ' + str(err))
except Exception as e:
    print('Error: ' + str(e))
