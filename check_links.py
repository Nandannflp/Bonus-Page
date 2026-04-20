import re
import urllib.request
import urllib.error

def check_link(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            return response.status
    except urllib.error.HTTPError as e:
        return e.code
    except urllib.error.URLError as e:
        return str(e.reason)
    except Exception as e:
        return str(e)

def main():
    file_path = "d:/Download/bonuses/legacy/index.html"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    urls = re.findall(r'href="([^"#]+)"', content)
    unique_urls = list(set([u for u in urls if u.startswith('http')]))

    print(f"Checking {len(unique_urls)} URLs...")
    for url in unique_urls:
        status = check_link(url)
        if status != 200:
            print(f"Error {status}: {url}")

if __name__ == "__main__":
    main()
