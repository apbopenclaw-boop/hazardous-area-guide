/**
 * HAG Network — Google Consent Mode v2 + Cookie Banner
 * EU/EEA-only: uses timezone + navigator.language to detect EU visitors.
 * 
 * Drop this script BEFORE any gtag/GTM scripts on all HAG sites.
 * Usage: <script src="https://hazardousareaguide.com/consent-banner.js"></script>
 */
(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  var stored = localStorage.getItem('hag_consent');

  // If user already made a choice, apply it and exit
  if (stored === 'granted') {
    gtag('consent', 'default', {
      ad_storage: 'granted', ad_user_data: 'granted',
      ad_personalization: 'granted', analytics_storage: 'granted',
      functionality_storage: 'granted', personalization_storage: 'granted',
      security_storage: 'granted'
    });
    return;
  }
  if (stored === 'denied') {
    gtag('consent', 'default', {
      ad_storage: 'denied', ad_user_data: 'denied',
      ad_personalization: 'denied', analytics_storage: 'granted',
      functionality_storage: 'granted', personalization_storage: 'denied',
      security_storage: 'granted'
    });
    return;
  }

  // Detect if visitor is likely in EU/EEA using timezone
  var euTimezones = [
    'Europe/Amsterdam', 'Europe/Andorra', 'Europe/Athens', 'Europe/Belgrade',
    'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels', 'Europe/Bucharest',
    'Europe/Budapest', 'Europe/Busingen', 'Europe/Chisinau', 'Europe/Copenhagen',
    'Europe/Dublin', 'Europe/Gibraltar', 'Europe/Guernsey', 'Europe/Helsinki',
    'Europe/Isle_of_Man', 'Europe/Jersey', 'Europe/Kaliningrad', 'Europe/Kiev',
    'Europe/Kirov', 'Europe/Kyiv', 'Europe/Lisbon', 'Europe/Ljubljana',
    'Europe/London', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Malta',
    'Europe/Mariehamn', 'Europe/Minsk', 'Europe/Monaco', 'Europe/Moscow',
    'Europe/Nicosia', 'Europe/Oslo', 'Europe/Paris', 'Europe/Podgorica',
    'Europe/Prague', 'Europe/Riga', 'Europe/Rome', 'Europe/Samara',
    'Europe/San_Marino', 'Europe/Sarajevo', 'Europe/Skopje', 'Europe/Sofia',
    'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Tirane', 'Europe/Ulyanovsk',
    'Europe/Vaduz', 'Europe/Vatican', 'Europe/Vienna', 'Europe/Vilnius',
    'Europe/Volgograd', 'Europe/Warsaw', 'Europe/Zagreb', 'Europe/Zurich',
    'Atlantic/Azores', 'Atlantic/Canary', 'Atlantic/Faroe', 'Atlantic/Madeira',
    'Arctic/Longyearbyen'
  ];

  var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  var isEU = euTimezones.indexOf(tz) !== -1;

  if (!isEU) {
    // Non-EU: grant everything, no banner
    gtag('consent', 'default', {
      ad_storage: 'granted', ad_user_data: 'granted',
      ad_personalization: 'granted', analytics_storage: 'granted',
      functionality_storage: 'granted', personalization_storage: 'granted',
      security_storage: 'granted'
    });
    return;
  }

  // EU visitor — default to denied, show banner
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied',
    ad_personalization: 'denied', analytics_storage: 'granted',
    functionality_storage: 'granted', personalization_storage: 'denied',
    security_storage: 'granted', wait_for_update: 500
  });

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'hag-consent-banner';
    banner.innerHTML =
      '<div style="position:fixed;bottom:0;left:0;right:0;z-index:99999;' +
      'background:rgba(10,10,10,0.95);border-top:1px solid rgba(255,255,255,0.1);' +
      'padding:16px 20px;font-family:Inter,system-ui,sans-serif;font-size:14px;' +
      'color:#ccc;display:flex;align-items:center;justify-content:space-between;' +
      'flex-wrap:wrap;gap:12px;backdrop-filter:blur(8px)">' +
      '<p style="margin:0;flex:1;min-width:240px;line-height:1.5">' +
      'We use cookies for analytics and personalized advertising. ' +
      '<a href="https://hazardousareaguide.com/privacy" style="color:#6ea8fe;text-decoration:underline">Privacy Policy</a>' +
      '</p>' +
      '<div style="display:flex;gap:8px;flex-shrink:0">' +
      '<button id="hag-consent-reject" style="padding:8px 16px;border-radius:6px;' +
      'border:1px solid rgba(255,255,255,0.2);background:transparent;color:#ccc;' +
      'cursor:pointer;font-size:13px;font-family:inherit">Reject</button>' +
      '<button id="hag-consent-accept" style="padding:8px 16px;border-radius:6px;' +
      'border:none;background:#0070F3;color:#fff;cursor:pointer;font-size:13px;' +
      'font-family:inherit;font-weight:500">Accept All</button>' +
      '</div></div>';

    document.body.appendChild(banner);

    document.getElementById('hag-consent-accept').addEventListener('click', function () {
      gtag('consent', 'update', {
        ad_storage: 'granted', ad_user_data: 'granted',
        ad_personalization: 'granted', analytics_storage: 'granted',
        personalization_storage: 'granted'
      });
      localStorage.setItem('hag_consent', 'granted');
      banner.remove();
    });

    document.getElementById('hag-consent-reject').addEventListener('click', function () {
      gtag('consent', 'update', {
        ad_storage: 'denied', ad_user_data: 'denied',
        ad_personalization: 'denied', personalization_storage: 'denied'
      });
      localStorage.setItem('hag_consent', 'denied');
      banner.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
