#!/usr/bin/env python3
"""Patch site-wide AEO layer: seo-answer callouts + stylesheet links.

Idempotent: skips files that already contain class="seo-answer" or the
seo-pages.min.css link. Only touches /workspace HTML files.
"""
import pathlib
import sys

ROOT = pathlib.Path("/workspace")

CSS_LINK = '  <link rel="stylesheet" href="/assets/css/min/seo-pages.min.css">\n'

# file -> (unique anchor line substring to insert AFTER, callout html or None)
PAGES = {
    "index.html": ('<p>Mind Grace provides confidential consultations',
        '        <div class="seo-answer"><strong>Direct answer:</strong> Mind Grace Neuropsychiatric Clinic is a psychiatric and child-development clinic at J123, Gamma II, Greater Noida, serving adults, adolescents, children, and families. Consultations cover mental-health concerns, ADHD and autism guidance, counselling, and structured assessments; teleconsultations are available.</div>\n'),
    "about.html": ('identifying an appropriate next step.',
        '            <div class="seo-answer"><strong>Direct answer:</strong> Mind Grace Neuropsychiatric Clinic in Greater Noida is led by Dr Anita Sharma, consultant psychiatrist, and works with adults, adolescents, children, and families through psychiatric consultation, counselling, child-development support, and structured assessment.</div>\n'),
    "aasha.html": ('behaviour, attention, or developmental concerns in Greater Noida.',
        '      <div class="seo-answer"><strong>Direct answer:</strong> Aasha is Mind Grace&rsquo;s child-development pathway in Greater Noida for families noticing communication, learning, behaviour, attention, or developmental concerns. It begins with a parent-guided assessment and a practical plan agreed with the family.</div>\n'),
    "doctors.html": ('this page helps you understand which professional may fit your concern.',
        '                <div class="seo-answer"><strong>Direct answer:</strong> The Mind Grace care team in Greater Noida includes psychiatrists, psychologists, counsellors, and child-development specialists. Psychiatric medical care, psychological therapy, and child-development support are offered under one roof so the right professional can be matched to the concern.</div>\n'),
    "emergency.html": ('<strong>please act now.</strong>',
        '          <div class="seo-answer"><strong>Direct answer:</strong> Mind Grace is not an emergency service. If there is immediate danger, risk of self-harm, or an overdose, call 112 (India&rsquo;s national emergency number) or go to the nearest hospital emergency department now. This page lists crisis helplines and what to do next.</div>\n'),
    "resources.html": ('they do not replace assessment or treatment.',
        '        <div class="seo-answer"><strong>Direct answer:</strong> Mind Grace&rsquo;s free self-help tools include guided breathing, grounding, focus, and calming exercises for difficult moments. They may help you settle in the short term but do not replace assessment or treatment; if distress persists, request a consultation.</div>\n'),
    "testimonials.html": ('alongside the services and process information.',
        '            <div class="seo-answer"><strong>Direct answer:</strong> Patient feedback at Mind Grace Neuropsychiatric Clinic in Greater Noida commonly highlights unhurried consultations, clarity about next steps, and respectful handling of sensitive concerns. Individual experiences vary, so use these themes alongside the services and fees pages.</div>\n'),
    "gallery.html": ('process pages to plan your arrival.',
        '            <div class="seo-answer"><strong>Direct answer:</strong> The gallery shows Mind Grace&rsquo;s clinic spaces in Gamma II, Greater Noida, including consultation rooms and Aasha therapy areas, so first-time visitors know what to expect before arriving.</div>\n'),
    "dr-anita-sharma.html": ('then explore services and booking information',
        '            <div class="seo-answer"><strong>Direct answer:</strong> Dr Anita Sharma is consultant psychiatrist at Mind Grace Neuropsychiatric Clinic in Greater Noida, providing evidence-based psychiatric care for adults, adolescents, and children, including medication conversations, diagnosis clarification, and coordinated referral when needed.</div>\n'),
    "contact.html": ('connect you with Mind Grace in Gamma II, Greater Noida.',
        '        <div class="seo-answer"><strong>Direct answer:</strong> Contact Mind Grace Neuropsychiatric Clinic by phone or WhatsApp at +91-9667863295, or visit the clinic at J123, Gamma II, Greater Noida. For routine appointment questions use the contact options on this page; for emergencies call 112 instead.</div>\n'),
    "mind-grace.html": ('or looking for a clearer next step, Dr. Anita Sharma and the care team can help you find the right pathway.',
        '          <div class="seo-answer"><strong>Direct answer:</strong> Mind Grace Neuropsychiatric Clinic in Greater Noida provides confidential psychiatric and child-development consultations for adults, adolescents, children, and families, starting with a structured conversation about the concern and practical next steps.</div>\n'),
}

# Files needing the stylesheet link inserted after a unique head-line anchor:
CSS_PAGES = {
    "services.html": '<link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">',
    "index.html": '<link rel="stylesheet" href="/assets/css/min/site-foundation.min.css?v=quiet17">',
    "about.html": '<link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">',
    "aasha.html": '<link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">',
    "doctors.html": '<link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">',
    "emergency.html": '<link rel="stylesheet" href="/assets/css/min/animations.min.css">\n  <link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">\n  <link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">',
    "resources.html": '<link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">',
    "testimonials.html": '<link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">',
    "gallery.html": '<link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">',
    "dr-anita-sharma.html": '<link rel="stylesheet" href="/assets/css/min/breadcrumbs.min.css">',
    "contact.html": '<link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css">',
    "mind-grace.html": "<link rel=\"stylesheet\" href=\"/assets/css/min/animations.min.css\">",
}


def patch_callout(name, anchor, html):
    path = ROOT / name
    text = path.read_text(encoding="utf-8")
    if 'class="seo-answer"' in text:
        print(f"callout SKIP (exists): {name}")
        return True
    if text.count(anchor) != 1:
        print(f"callout FAIL (anchor count={text.count(anchor)}): {name}")
        return False
    idx = text.index(anchor)
    eol = text.index("\n", idx) + 1
    text = text[:eol] + html + text[eol:]
    path.write_text(text, encoding="utf-8")
    print(f"callout OK: {name}")
    return True


def patch_css(name, anchor):
    path = ROOT / name
    text = path.read_text(encoding="utf-8")
    if "css/min/seo-pages.min.css" in text:
        print(f"css SKIP (exists): {name}")
        return True
    if text.count(anchor) != 1:
        print(f"css FAIL (anchor count={text.count(anchor)}): {name}")
        return False
    text = text.replace(anchor, anchor + "\n" + CSS_LINK.rstrip("\n"), 1)
    path.write_text(text, encoding="utf-8")
    print(f"css OK: {name}")
    return True


def main():
    ok = True
    for name, (anchor, html) in PAGES.items():
        ok &= patch_callout(name, anchor, html)
    for name, anchor in CSS_PAGES.items():
        ok &= patch_css(name, anchor)
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
