import subprocess,urllib.request,json
p=subprocess.run(['git','credential','fill'],input='protocol=https\nhost=github.com\n\n',text=True,capture_output=True)
c=dict(x.split('=',1) for x in p.stdout.splitlines() if '=' in x)
if not c.get('password'): print('No git credential available'); raise SystemExit
url='https://api.github.com/repos/shirish-psych-ncr/MIND_WEBSITE/pages'
r=urllib.request.Request(url,headers={'Authorization':'Bearer '+c['password'],'Accept':'application/vnd.github+json'})
try:
 d=json.load(urllib.request.urlopen(r)); print(json.dumps({k:d.get(k) for k in ['status','cname','build_type','source','html_url']}))
except Exception as e: print(e)
