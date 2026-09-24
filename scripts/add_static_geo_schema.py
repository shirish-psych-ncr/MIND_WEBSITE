"""Add crawlable clinic and answer-engine metadata to every indexable route."""
from pathlib import Path
import json, re

ROOT = Path(__file__).resolve().parents[1]
CLINIC = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  "@id": "https://mindgracencr.in/#clinic",
  "name": "Mind Grace Neuropsychiatric Clinic",
  "url": "https://mindgracencr.in/",
  "telephone": "+91-96678-63295",
  "priceRange": "₹₹",
  "image": "https://mindgracencr.in/assets/images/og-image.webp",
  "address": {"@type":"PostalAddress", "streetAddress":"J123, Gamma II", "addressLocality":"Greater Noida", "addressRegion":"Uttar Pradesh", "postalCode":"201310", "addressCountry":"IN"},
  "geo": {"@type":"GeoCoordinates", "latitude":28.4910152, "longitude":77.5132324},
  "areaServed": ["Greater Noida", "Noida", "Delhi NCR", "Uttar Pradesh", "India"],
  "openingHoursSpecification": [{"@type":"OpeningHoursSpecification", "dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens":"10:00", "closes":"16:00"}, {"@type":"OpeningHoursSpecification", "dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens":"17:30", "closes":"19:30"}],
  "sameAs": ["https://mindgracencr.in/"],
  "hasMap": "https://www.google.com/maps/search/?api=1&query=Mind+Grace+Neuropsychiatric+Clinic+Greater+Noida"
}

def clean_text(value):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", value)).strip()

def update(path):
    text = path.read_text(encoding="utf-8")
    if re.search(r'<meta\s+name=["\']robots["\'][^>]+content=["\'][^"\']*noindex', text, re.I): return False
    if 'id="mindgrace-static-clinic-schema"' in text: return False
    title = clean_text((re.search(r'<title[^>]*>(.*?)</title>', text, re.I|re.S) or [None, "Mind Grace Neuropsychiatric Clinic"])[1])
    desc_match = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)', text, re.I)
    desc = clean_text(desc_match.group(1) if desc_match else "Mental health and neuropsychiatric consultations at Mind Grace in Greater Noida.")
    canonical = (re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']*)', text, re.I) or [None, "https://mindgracencr.in/"])[1]
    page = {"@context":"https://schema.org", "@type":"WebPage", "@id":canonical.rstrip('/')+"#webpage", "url":canonical, "name":title, "description":desc, "isPartOf":{"@id":"https://mindgracencr.in/#website"}, "speakable":{"@type":"SpeakableSpecification", "cssSelector":["h1", ".seo-answer", ".blog-answer", ".lead"]}, "about":{"@id":"https://mindgracencr.in/#clinic"}}
    block = '<script id="mindgrace-static-clinic-schema" type="application/ld+json">'+json.dumps({"@context":"https://schema.org","@graph":[CLINIC,page]}, ensure_ascii=False, separators=(',',':'))+'</script>\n'
    text = text.replace('</head>', block+'</head>', 1)
    path.write_text(text, encoding='utf-8', newline='\n')
    return True

if __name__ == '__main__':
    count = 0
    for path in ROOT.rglob('*.html'):
        if any(x in path.parts for x in ('output','.git','node_modules')): continue
        count += int(update(path))
    print(f'Added static clinic/AEO schema to {count} routes')
