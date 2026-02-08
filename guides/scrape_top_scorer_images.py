import os
import urllib.parse
import urllib.request
from html.parser import HTMLParser


BASE_URL = "https://topscorer.qodeinteractive.com/"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "images-top-scorer")


class ImageSrcParser(HTMLParser):
    def __init__(self, base_url: str):
        super().__init__()
        self.base_url = base_url
        self.sources: set[str] = set()

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "img":
            return
        attrs_dict = dict(attrs)
        src = attrs_dict.get("src")
        if not src:
            return
        src = src.strip()
        if not src:
            return

        # Normalize URL
        if src.startswith("//"):
            full = "https:" + src
        else:
            full = urllib.parse.urljoin(self.base_url, src)

        self.sources.add(full)


def fetch_html(url: str) -> str:
    with urllib.request.urlopen(url) as resp:
        data = resp.read()
    # Try utf-8 with fallback
    try:
        return data.decode("utf-8")
    except UnicodeDecodeError:
        return data.decode("latin-1", errors="ignore")


def download_image(url: str, dest_dir: str, index: int) -> None:
    parsed = urllib.parse.urlparse(url)
    filename = os.path.basename(parsed.path)
    if not filename:
        filename = f"image-{index}.jpg"

    # Ensure no query string in filename
    if "?" in filename:
        filename = filename.split("?", 1)[0]

    dest_path = os.path.join(dest_dir, filename)
    # Avoid overwriting by prefixing index if needed
    if os.path.exists(dest_path):
        name, ext = os.path.splitext(filename)
        dest_path = os.path.join(dest_dir, f"{name}-{index}{ext}")

    print(f"Downloading {url} -> {dest_path}")
    try:
        with urllib.request.urlopen(url) as resp:
            data = resp.read()
        with open(dest_path, "wb") as f:
            f.write(data)
    except Exception as e:
        print(f"Failed to download {url}: {e}")


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Fetching HTML from {BASE_URL}")
    html = fetch_html(BASE_URL)

    parser = ImageSrcParser(BASE_URL)
    parser.feed(html)

    sources = sorted(parser.sources)
    print(f"Found {len(sources)} image URLs on homepage.")

    for idx, img_url in enumerate(sources, start=1):
        download_image(img_url, OUTPUT_DIR, idx)

    print("Done.")


if __name__ == "__main__":
    main()

