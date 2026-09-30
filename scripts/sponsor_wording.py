#!/usr/bin/env python3
"""HAG sponsor wording (approved by Andreas 2026-09-30): replace independence/no-affiliation claims that contradict
the "main sponsor is Xshielder" line. Idempotent. Run from the repo root."""
import pathlib
import re

W = {
    "en": {"tag": "Certificate-verified · sponsor disclosed", "stat": "Disclosed sponsor",
           "h3": "Transparent sponsorship",
           "p": "Our main sponsor is Xshielder. Sponsored links are labelled; comparisons use published specifications and certification data.",
           "about": "Hazardous Area Guide's main sponsor is Xshielder, a maker of ATEX Zone 1 iPhone and iPad cases. Sponsored links are marked.",
           "chips": ["Sponsor disclosed", "No affiliate links", "Certificate-verified"],
           "foot": "Engineering reference, not a safety certificate.",
           "about_cut": r"Not affiliated with, endorsed by.*", "blurb_cut": r"\s*Not affiliated with any manufacturer\."},
    "de": {"tag": "Zertifikatsgeprüft · Sponsor offengelegt", "stat": "Offengelegter Sponsor",
           "h3": "Transparentes Sponsoring",
           "p": "Unser Hauptsponsor ist Xshielder. Gesponserte Links sind gekennzeichnet; Vergleiche beruhen auf veröffentlichten Spezifikationen und Zertifizierungsdaten.",
           "about": "Hauptsponsor von Hazardous Area Guide ist Xshielder, ein Hersteller von ATEX-Zone-1-Gehäusen für iPhone und iPad. Gesponserte Links sind gekennzeichnet.",
           "chips": ["Sponsor offengelegt", "Keine Affiliate-Links", "Zertifikatsgeprüft"],
           "foot": "Technische Referenz, kein Sicherheitszertifikat.",
           "about_cut": r"Es besteht keine Zugehörigkeit.*", "blurb_cut": r"\s*In keiner Verbindung zu einem Hersteller\."},
    "es": {"tag": "Verificado mediante certificado · patrocinador declarado", "stat": "Patrocinador declarado",
           "h3": "Patrocinio transparente",
           "p": "Nuestro patrocinador principal es Xshielder. Los enlaces patrocinados están señalados; las comparaciones usan especificaciones publicadas y datos de certificación.",
           "about": "El patrocinador principal de Hazardous Area Guide es Xshielder, fabricante de carcasas ATEX Zona 1 para iPhone e iPad. Los enlaces patrocinados están señalados.",
           "chips": ["Patrocinador declarado", "Sin enlaces de afiliados", "Verificado mediante certificado"],
           "foot": "Referencia técnica, no un certificado de seguridad.",
           "about_cut": r"No está afiliado, respaldado.*", "blurb_cut": r"\s*No está afiliada a ningún fabricante\."},
    "nl": {"tag": "Gecontroleerd op certificaten · sponsor vermeld", "stat": "Vermelde sponsor",
           "h3": "Transparante sponsoring",
           "p": "Onze hoofdsponsor is Xshielder. Gesponsorde links zijn gemarkeerd; vergelijkingen gebruiken gepubliceerde specificaties en certificeringsgegevens.",
           "about": "De hoofdsponsor van Hazardous Area Guide is Xshielder, maker van ATEX Zone 1-behuizingen voor iPhone en iPad. Gesponsorde links zijn gemarkeerd.",
           "chips": ["Sponsor vermeld", "Geen affiliate-links", "Gecontroleerd op certificaten"],
           "foot": "Technische referentie, geen veiligheidscertificaat.",
           "about_cut": r"Niet gelieerd aan, goedgekeurd.*", "blurb_cut": r"\s*Niet gelieerd aan enige fabrikant\."},
    "pt": {"tag": "Verificado por certificado · patrocinador declarado", "stat": "Patrocinador declarado",
           "h3": "Patrocínio transparente",
           "p": "Nosso principal patrocinador é a Xshielder. Links patrocinados são identificados; as comparações usam especificações publicadas e dados de certificação.",
           "about": "O principal patrocinador do Hazardous Area Guide é a Xshielder, fabricante de capas ATEX Zona 1 para iPhone e iPad. Links patrocinados são identificados.",
           "chips": ["Patrocinador declarado", "Sem links afiliados", "Verificado por certificado"],
           "foot": "Referência de engenharia, não um certificado de segurança.",
           "about_cut": r"Não é afiliado, endossado.*", "blurb_cut": r"\s*Não é afiliada a nenhum fabricante\."},
}
EN_HERO = ("an independent, vendor-neutral reference network", "a reference network")
EN_HERO_END = ("No affiliate links, no vendor partnerships.", "Main sponsor: Xshielder; sponsored links are labelled.")
FOOT_SPANS = [r"Independent (?:—|&mdash;) not affiliated with any manufacturer\.", r"Unabhängig – nicht an einen Hersteller gebunden\.",
              r"Independiente — no afiliado a ningún fabricante\.", r"Onafhankelijk — niet gelieerd aan enige fabrikant\.",
              r"Independente — não afiliado a nenhum fabricante\."]


def lang_of(rel):
    m = re.match(r"(de|es|nl|pt-br)/", rel)
    return {"pt-br": "pt"}.get(m.group(1), m.group(1)) if m else "en"


for f in sorted(pathlib.Path(".").rglob("*.html")):
    if ".git" in f.parts:
        continue
    rel = f.as_posix()
    w = W[lang_of(rel)]
    t = o = f.read_text(encoding="utf-8")
    t = re.sub(r'(<p class="section-label mb-6">)[^<]*(ertif|independ|Unabh|Onafh|Indep)[^<]*(</p>)', rf'\g<1>{w["tag"]}\g<3>', t, count=1)
    t = re.sub(r'(leading-none">)0(</div>\s*<div[^>]*>)[^<]*(</div>)', rf'\g<1>1\g<2>{w["stat"]}\g<3>', t, count=1)
    t = re.sub(r'(>01</div>\s*<h3[^>]*>)[^<]*(</h3>\s*<p[^>]*>)[^<]*(</p>)', rf'\g<1>{w["h3"]}\g<2>{w["p"]}\g<3>', t, count=1)
    t = re.sub(r'(<p class="text-\[14px\] text-gray-400 leading-\[1\.65\]">[^<]*?)' + w["about_cut"].replace(".*", r"[^<]*"),
               lambda m: m.group(1) + w["about"] + "\n    ", t, count=1)
    t = re.sub(r'(<div class="mt-6 flex flex-wrap gap-2">).*?(</div>)',
               lambda m: m.group(1) + "".join(f'\n      <span class="chip">{c}</span>' for c in w["chips"]) + "\n    " + m.group(2),
               t, count=1, flags=re.S)
    t = re.sub(w["blurb_cut"], "", t)
    for rx in FOOT_SPANS:
        t = re.sub(rx, w["foot"], t)
    t = t.replace(*EN_HERO).replace(*EN_HERO_END)
    if t != o:
        f.write_text(t, encoding="utf-8")
        print("updated", rel)
