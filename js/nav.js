/* hazardousareaguide.com — Nav component (injected on every page) */
(function () {
  var path = window.location.pathname;
  var lang = 'en';
  if (path.indexOf('/de/') === 0) lang = 'de';
  else if (path.indexOf('/nl/') === 0) lang = 'nl';
  else if (path.indexOf('/es/') === 0) lang = 'es';
  else if (path.indexOf('/pt-br/') === 0) lang = 'pt-br';

  var base = lang === 'en' ? '' : '/' + lang;

  var labels = {
    en:    { guides: 'Guides', standards: 'Standards', about: 'About', contact: 'Contact', home: 'Home', menu: 'Menu' },
    de:    { guides: 'Leitfäden', standards: 'Normen', about: 'Über uns', contact: 'Kontakt', home: 'Home', menu: 'Menü' },
    nl:    { guides: 'Gidsen', standards: 'Normen', about: 'Over ons', contact: 'Contact', home: 'Home', menu: 'Menu' },
    es:    { guides: 'Guías', standards: 'Normas', about: 'Acerca de', contact: 'Contacto', home: 'Home', menu: 'Menú' },
    'pt-br': { guides: 'Guias', standards: 'Normas', about: 'Sobre', contact: 'Contato', home: 'Home', menu: 'Menu' }
  };
  var t = labels[lang] || labels.en;
  var prefix = base || '';

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML =
    '<div class="header-inner">' +
      '<a href="' + (prefix || '/') + '" class="site-logo">' +
        '<svg width="20" height="20" viewBox="0 0 32 32" fill="none">' +
          '<path d="M16 2l14 8v12l-14 8L2 22V10L16 2Z" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>' +
          '<circle cx="16" cy="16" r="4" stroke="#fff" stroke-width="1.5"/>' +
          '<circle cx="16" cy="16" r="1.5" fill="#0070F3"/>' +
        '</svg>' +
        '<span class="logo-name">hazardousareaguide</span>' +
        '<span class="logo-tld">.com</span>' +
      '</a>' +
      '<nav class="nav-desktop">' +
        '<a href="' + (prefix || '/') + '#guides">' + t.guides + '</a>' +
        '<a href="' + (prefix || '/') + '#standards">' + t.standards + '</a>' +
        '<a href="' + (prefix || '/') + '#about">' + t.about + '</a>' +
        '<a href="' + (prefix || '/') + '#contact">' + t.contact + '</a>' +
      '</nav>' +
      '<div class="nav-right">' +
        '<select class="lang-select" onchange="if(this.value)window.location=this.value" aria-label="Language">' +
          '<option value="/"' + (lang === 'en' ? ' selected' : '') + '>🇬🇧 EN</option>' +
          '<option value="/de/"' + (lang === 'de' ? ' selected' : '') + '>🇩🇪 DE</option>' +
          '<option value="/nl/"' + (lang === 'nl' ? ' selected' : '') + '>🇳🇱 NL</option>' +
          '<option value="/es/"' + (lang === 'es' ? ' selected' : '') + '>🇪🇸 ES</option>' +
          '<option value="/pt-br/"' + (lang === 'pt-br' ? ' selected' : '') + '>🇧🇷 PT</option>' +
        '</select>' +
        '<button class="burger" onclick="document.getElementById(\'mobileMenu\').classList.add(\'open\')" aria-label="Open menu">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>';

  var overlay = document.createElement('div');
  overlay.id = 'mobileMenu';
  overlay.className = 'mobile-overlay';
  overlay.innerHTML =
    '<div class="mobile-backdrop" onclick="document.getElementById(\'mobileMenu\').classList.remove(\'open\')"></div>' +
    '<div class="mobile-drawer">' +
      '<div class="mobile-drawer-header">' +
        '<span>' + t.menu + '</span>' +
        '<button class="mobile-close" onclick="document.getElementById(\'mobileMenu\').classList.remove(\'open\')" aria-label="Close">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
      '<nav class="mobile-nav">' +
        '<a href="' + (prefix || '/') + '" class="mobile-nav-link">' + t.home + '</a>' +
        '<a href="' + (prefix || '/') + '#guides" class="mobile-nav-link" onclick="document.getElementById(\'mobileMenu\').classList.remove(\'open\')">' + t.guides + '</a>' +
        '<a href="' + (prefix || '/') + '#standards" class="mobile-nav-link" onclick="document.getElementById(\'mobileMenu\').classList.remove(\'open\')">' + t.standards + '</a>' +
        '<a href="' + (prefix || '/') + '#about" class="mobile-nav-link" onclick="document.getElementById(\'mobileMenu\').classList.remove(\'open\')">' + t.about + '</a>' +
        '<a href="' + (prefix || '/') + '#contact" class="mobile-nav-link" onclick="document.getElementById(\'mobileMenu\').classList.remove(\'open\')">' + t.contact + '</a>' +
        '<div class="mobile-divider"></div>' +
        '<select class="lang-select" style="width:100%;padding:8px 12px" onchange="if(this.value)window.location=this.value" aria-label="Language">' +
          '<option value="/"' + (lang === 'en' ? ' selected' : '') + '>🇬🇧 EN</option>' +
          '<option value="/de/"' + (lang === 'de' ? ' selected' : '') + '>🇩🇪 DE</option>' +
          '<option value="/nl/"' + (lang === 'nl' ? ' selected' : '') + '>🇳🇱 NL</option>' +
          '<option value="/es/"' + (lang === 'es' ? ' selected' : '') + '>🇪🇸 ES</option>' +
          '<option value="/pt-br/"' + (lang === 'pt-br' ? ' selected' : '') + '>🇧🇷 PT</option>' +
        '</select>' +
      '</nav>' +
    '</div>';

  var target = document.getElementById('nav-placeholder');
  if (target) {
    target.parentNode.replaceChild(header, target);
    document.body.insertBefore(overlay, document.body.firstChild.nextSibling);
  } else {
    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(header, document.body.firstChild);
  }
})();
