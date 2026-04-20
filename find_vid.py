import urllib.request
import urllib.parse
import re

url = 'https://www.youtube.com/results?search_query=How+to+write+a+book+20+step+proven+method+brian+tracy'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

ids = list(dict.fromkeys(re.findall(r'\"videoId\":\"(.*?)\"', html)))
for vid in ids[:3]:
    try:
        r = urllib.request.urlopen(urllib.request.Request(f'https://www.youtube.com/watch?v={vid}', headers={'User-Agent': 'Mozilla/5.0'}))
        page = r.read().decode('utf-8')
        title = re.search(r'<title>(.*?)</title>', page).group(1)
        print(f'{vid}: {title}')
    except Exception as e:
        print(f'{vid}: {e}')
