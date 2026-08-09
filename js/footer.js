/* hazardousareaguide.com — Footer component (injected on every page) */
(function () {
  var path = window.location.pathname;
  var lang = 'en';
  if (path.indexOf('/de/') === 0) lang = 'de';
  else if (path.indexOf('/nl/') === 0) lang = 'nl';
  else if (path.indexOf('/es/') === 0) lang = 'es';
  else if (path.indexOf('/pt-br/') === 0) lang = 'pt-br';

  var t = {
    en:      { network: 'Guide network', refs: 'References', disc: 'Independent engineering reference. Not a substitute for site-specific Ex inspection or DSEAR assessment. Not affiliated with any manufacturer.', independent: 'Independent &mdash; not affiliated with any manufacturer.' },
    de:      { network: 'Leitfaden-Netzwerk', refs: 'Referenzen', disc: 'Unabhängige technische Referenz. Kein Ersatz für eine standortspezifische Ex-Prüfung oder eine DSEAR-Bewertung. In keiner Verbindung zu einem Hersteller.', independent: 'Unabhängig &ndash; nicht an einen Hersteller gebunden.' },
    nl:      { network: 'Gidsennetwerk', refs: 'Referenties', disc: 'Onafhankelijke technische referentie. Geen vervanging voor locatiespecifieke Ex-inspectie of DSEAR-beoordeling. Niet gelieerd aan een fabrikant.', independent: 'Onafhankelijk &mdash; niet gelieerd aan een fabrikant.' },
    es:      { network: 'Red de guías', refs: 'Referencias', disc: 'Referencia técnica independiente. No sustituye la inspección Ex específica del sitio ni la evaluación DSEAR. Sin afiliación con ningún fabricante.', independent: 'Independiente &mdash; sin afiliación con ningún fabricante.' },
    'pt-br': { network: 'Rede de guias', refs: 'Referências', disc: 'Referência técnica independente. Não substitui inspeção Ex específica do local ou avaliação DSEAR. Sem afiliação com nenhum fabricante.', independent: 'Independente &mdash; sem afiliação com nenhum fabricante.' }
  }[lang] || {};
  if (!t.network) t = { network: 'Guide network', refs: 'References', disc: 'Independent engineering reference. Not a substitute for site-specific Ex inspection or DSEAR assessment. Not affiliated with any manufacturer.', independent: 'Independent &mdash; not affiliated with any manufacturer.' };

  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML =
    '<div class="footer-inner">' +
      '<div class="footer-grid">' +
        '<div>' +
          '<div class="footer-logo">' +
            '<svg width="16" height="16" viewBox="0 0 32 32" fill="none">' +
              '<path d="M16 2l14 8v12l-14 8L2 22V10L16 2Z" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>' +
              '<circle cx="16" cy="16" r="1.5" fill="#0070F3"/>' +
            '</svg>' +
            '<span>hazardousareaguide<span class="logo-tld">.com</span></span>' +
          '</div>' +
          '<p class="footer-desc">' + t.disc + '</p>' +
        '</div>' +
        '<div>' +
          '<div class="footer-heading">' + t.network + '</div>' +
          '<ul class="footer-links">' +
            '<li><a href="https://intrinsicallysafephones.com" target="_blank" rel="noopener">intrinsicallysafephones.com</a></li>' +
            '<li><a href="https://intrinsicallysafeheadsets.com" target="_blank" rel="noopener">intrinsicallysafeheadsets.com</a></li>' +
            '<li><a href="https://explosionproofradios.com" target="_blank" rel="noopener">explosionproofradios.com</a></li>' +
            '<li><a href="https://explosionprooftablets.com" target="_blank" rel="noopener">explosionprooftablets.com</a></li>' +
            '<li><a href="https://exknowledge.com" target="_blank" rel="noopener">exknowledge.com</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<div class="footer-heading">' + t.refs + '</div>' +
          '<ul class="footer-links">' +
            '<li><a href="https://www.iecex.com" target="_blank" rel="noopener">IECEx Online Certificate System</a></li>' +
            '<li><a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32014L0034" target="_blank" rel="noopener">ATEX Directive 2014/34/EU</a></li>' +
            '<li><a href="https://webstore.iec.ch/en/publication/622" target="_blank" rel="noopener">IEC 60079 series</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="divider" style="margin:32px 0;max-width:none"></div>' +
      '<div class="footer-bottom">' +
        '<span>&copy; 2026 &middot; hazardousareaguide.com</span>' +
        '<span>' + t.independent + '</span>' +
      '</div>' +
    '</div>';

  var target = document.getElementById('footer-placeholder');
  if (target) {
    target.parentNode.replaceChild(footer, target);
  } else {
    var main = document.querySelector('main');
    if (main) {
      main.parentNode.insertBefore(footer, main.nextSibling);
    } else {
      document.body.appendChild(footer);
    }
  }
})();
